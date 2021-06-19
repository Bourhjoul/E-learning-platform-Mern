//jwt : store users in browser for some period to stay loged in
//get email and the password from the frontend
//whenever have a post request u get all the data through the req.body
const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");

const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const { CLIENT_URL } = process.env;

const userCtrl = {
  register: async (req, res) => {
    let newUser;
    //console.log(req.body);
    //get email and the password from the frontend
    //whenever have a post request u get all the data through the req.body
    //create the user but first hash the pwd

    try {
      // http://localhost:5000/user/register
      const { name, email, password, isTeacher, description, headline } =
        req.body;
      console.log(isTeacher);
      if (!name || !email || !password)
        return res.status(400).json({ msg: "Please fill in all fields." });

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid email" });

      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "This email already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters." });

      const passwordHash = await bcrypt.hash(password, 12);
      if (isTeacher) {
        newUser = {
          name,
          email,
          password: passwordHash,
          Teacher: isTeacher,
          description,
          headline,
        };
      } else {
        newUser = {
          name,
          email,
          password: passwordHash,
        };
      }
      const activation_token = createActivationToken(newUser);

      const url = `${CLIENT_URL}user/activate/${activation_token}`;
      sendMail(email, url, name, "Verify your email address");

      res.json({
        msg: "Register Success! Please activate your email to start.",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
      //http://localhost:5000/user/activation
      /*register : after the user set the fields we send a request to check 
            if evryething fine and the email not already in DB and set the token with user 
            */
      /* activateEmail: if click to the lien of email that we send it  -  send a req with the token_code(user)
       */
      const { activation_token } = req.body;
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );
      /*console.log(user);
            //that user contain all fields {
            name: 'User 01',
             email: 'adam7hisoka@gmail.com',
             password: '$2b$12$6fOX2Q6gm4Fc9yX.HxmX6e0//dlsO2LbYG6m6rmzecOvfv4BAr3a.',
             iat: 1620786747,
             exp: 1620787347
            }*/
      const { name, email, password, Teacher, description, headline } = user;
      //check if the user already registred
      const check = await Users.findOne({ email });
      if (check)
        return res.status(400).json({ msg: "This email already exist" });
      //if not create one and save it to DB
      if (Teacher) {
        const newUser = new Users({
          name,
          email,
          password,
          Teacher,
          description,
          headline,
        });
        await newUser.save();
        res.json({ msg: "Account has been activated!" });
      } else {
        const newUser = new Users({ name, email, password });
        await newUser.save();
        res.json({ msg: "Account has been activated!" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      //http://localhost:5000/user/login
      const { email, password } = req.body;
      const existingUser = await Users.findOne({
        email: { $regex: email, $options: "i" },
      });
      if (!existingUser)
        return res.status(400).json({ msg: "That Email doesn't exist." });
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordCorrect)
        return res.status(400).json({ msg: "Invalid credentials" });

      // http://localhost:5000/user/refresh_token
      const refresh_token = createRefreshToken({ id: existingUser._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 365 * 24 * 60 * 60 * 1000, // 7 days
      });
      res.status(200).json({ /*result : existingUser,*/ msg: "Login success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAccessToken: async (req, res) => {
    try {
      //http://localhost:5000/user/refresh_token
      //get theCookie value
      const rf_token = req.cookies.refreshtoken;
      //console.log(rf_token)
      if (!rf_token) return res.status(500).json({ msg: "Please login now!" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(500).json({ msg: "Please login now!" });
        // console.log(user);
        // if user login in create a token to stay loged in
        const access_token = createAccessToken({ id: user.id });
        res.json({ access_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      /* forgotPassword: if click to forgotPwd btn  - we  send a email  and a req with the token_code(user)
       */
      console.log("forgot pass");
      const { email } = req.body;
      const existingUser = await Users.findOne({ email });
      if (!existingUser)
        return res.status(400).json({ msg: "That Email doesn't exist." });

      const access_token = createAccessToken({ id: existingUser._id });
      const url = `${CLIENT_URL}user/reset/${access_token}`;

      sendMail(email, url, existingUser.name, "Reset your password");
      res.json({
        msg: "Re-send the password, please check your email inbox or spam.",
      }); //seccess
    } catch (err) {
      return res.status(500).json({ msg: err.message }); //err
    }
  },
  resetPassword: async (req, res) => {
    //after pass through middleware and verfey that the token in header value
    //we modify the pwd
    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);
      //{ id: '609b416cbed92c4798c17f49', iat: 1620867631, exp: 1620868531 }
      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          password: passwordHash,
        }
      );
      res.json({ msg: "Password successfully changed!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserInfor: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      console.log(user);
      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUsersAllInfor: async (req, res) => {
    try {
      const user = await Users.find().select("-password");
      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged out." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { name, avatar, description, headline } = req.body;
      console.log("req body user", req.body);
      const user = await Users.findById(req.user.id);
      console.log("find the user", user);
      if (user) {
        user.name = name || user.name;
        user.avatar = avatar || user.avatar;
        user.description = description || user.description;
        user.headline = headline || user.headline;
      }
      const updatedUser = await user.save();
      res.json({ msg: "Update User Success!" });
      console.log("Update of user info success");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUsersRole: async (req, res) => {
    try {
      const { role } = req.body;
      await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          role,
        }
      );

      res.json({ msg: "Update Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      await Users.findByIdAndDelete(req.params.id);

      res.json({ msg: "Deleted Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
const createActivationToken = (payload) => {
  return jwt.sign(payload, `${process.env.ACTIVATION_TOKEN_SECRET}`, {
    expiresIn: "5m",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, {
    expiresIn: "365d",
  });
};
module.exports = userCtrl;
