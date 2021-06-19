import React, { useState } from "react";
import { Image, Input } from "antd";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FiUser, AiFillLock, MdEmail } from "react-icons/all";

import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import { useDispatch } from "react-redux";
import {
  isEmpty,
  isEmail,
  isMatch,
  isLength,
} from "../../utils/validation/Validation";
import { Checkbox } from "antd";
import { useEffect } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
  cf_password: "",
  description: "",
  headline: "",
  err: "",
  success: "",
};

const Register = () => {
  const { TextArea } = Input;
  const [isTeacher, setisTeacher] = useState(false);
  const [formDataUser, setFormDataUser] = useState(initialState);
  const dispatch = useDispatch();

  const {
    name,
    email,
    password,
    cf_password,
    description,
    headline,
    err,
    success,
  } = formDataUser;
  const handleChange = (e) => {
    //place of do that onChange={(e) => setEmail(e.target.value) for each field (input) we do that
    setFormDataUser({
      ...formDataUser,
      [e.target.name]: e.target.value,
      err: "",
      success: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(name) | isEmpty(password))
      return setFormDataUser({
        ...formDataUser,
        err: "Please fill in all fields",
        success: "",
      });

    if (!isEmail(email))
      return setFormDataUser({
        ...formDataUser,
        err: "Invalid email",
        success: "",
      });

    if (isLength(password))
      return setFormDataUser({
        ...formDataUser,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setFormDataUser({
        ...formDataUser,
        err: "Password did not match",
        success: "",
      });
    try {
      if (isTeacher) {
        const res = await axios.post("/user/register", {
          name,
          email,
          password,
          isTeacher,
          description,
          headline,
        });
        setFormDataUser({ ...formDataUser, err: "", success: res.data.msg });
      } else {
        const res = await axios.post("/user/register", {
          name,
          email,
          password,
        });
        setFormDataUser({ ...formDataUser, err: "", success: res.data.msg });
      }
    } catch (err) {
      err.response.data.msg &&
        setFormDataUser({
          ...formDataUser,
          err: err.response.data.msg,
          success: "",
        });
    }
  };

  const inputs = document.querySelectorAll(".input");

  function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  }

  function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value === "") {
      parent.classList.remove("focus");
    }
  }

  inputs.forEach((inputa) => {
    inputa.addEventListener("focus", addcl);
    inputa.addEventListener("blur", remcl);
  });

  useEffect(() => {
    console.log(isTeacher);

    return () => {};
  }, [isTeacher]);

  return (
    <div className="container_login">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div>
        <img
          className="wave"
          alt="wave"
          src="https://i.imgur.com/FKKMfGt.png"
          preview={false}
        />
        <div className="container">
          <div className="img">
            <Image src="https://i.imgur.com/UtQtlTN.png" preview={false} />
          </div>
          <div className="login-content">
            <form onSubmit={handleSubmit}>
              <Image src="https://svgshare.com/i/XJn.svg " preview={false} />
              <h2 className="title">Register</h2>
              {err && showErrMsg(err)}
              {success && showSuccessMsg(success)}
              <div className="input-div one">
                <div className="i">
                  <FiUser color="#0f6ab9" />
                </div>
                <div className="div">
                  <input
                    name="name"
                    value={name}
                    type="text"
                    className="input"
                    placeholder="Enter Your Name"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="input-div one">
                <div className="i">
                  <MdEmail color="#0f6ab9" />
                </div>
                <div className="div">
                  <input
                    name="email"
                    value={email}
                    type="text"
                    className="input"
                    placeholder="Enter Your Email"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="input-div pass">
                <div className="i">
                  <AiFillLock color="#0f6ab9" />
                </div>
                <div className="div">
                  <input
                    name="password"
                    value={password}
                    type="password"
                    className="input"
                    placeholder="Enter Password"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="input-div pass">
                <div className="i">
                  <AiFillLock color="#0f6ab9" />
                </div>
                <div className="div">
                  <input
                    name="cf_password"
                    value={cf_password}
                    type="password"
                    className="input"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <Checkbox onChange={(e) => setisTeacher(e.target.checked)}>
                Sign me up as a teacher
              </Checkbox>
              {isTeacher && (
                <div className="teacherdetails">
                  Description :{" "}
                  <TextArea
                    rows={4}
                    name="description"
                    onChange={handleChange}
                    value={description}
                    placeholder="write about few lines"
                  />
                  Headline :{" "}
                  <TextArea
                    rows={2}
                    name="headline"
                    onChange={handleChange}
                    value={headline}
                    maxLength="30"
                    placeholder="give yourself a headline"
                  />
                </div>
              )}

              <button type="submit" className="btn">
                Register
              </button>
              <p>
                Already have an account?{" "}
                <Link className="register" to="/login">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
