const Courses = require("../models/CourseModel");
const User = require("../models/userModel");

const coursesCtrl = {
  getMycourses: async (req, res) => {
    try {
      const courses = await Courses.find({ user: req.user.id });
      res.json(courses);
    } catch (err) {
      console.log("-----------mycourse error-------------");

      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },
  getcoursespurshased: async (req, res) => {
    try {
      const numcourses = 5;
      const page = Number(req.query.page) || 1;
      const coursespurshased = await Courses.find({ students: req.user.id })
        .limit(numcourses)
        .skip(numcourses * (page - 1));
      const totalcourses = await Courses.countDocuments({
        students: req.user.id,
      });
      res.json({ coursespurshased, totalcourses });
    } catch (err) {
      console.log("-----------getcoursespurshased error-------------");
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },
  studentMembership: async (req, res) => {
    try {
      console.log(req.query.id);
      const coursespurshased = await Courses.find({
        $and: [{ students: req.user.id }, { _id: req.query.id }],
      });
      console.log(coursespurshased);
      if (coursespurshased.length === 0) {
        console.log("notstudent");
        res.json({ isStudent: false });
      } else {
        console.log("student");
        res.json({ isStudent: true });
      }
    } catch (err) {
      console.log("-----------studentMembership error-------------");
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },
  createcoursereview: async (req, res) => {
    try {
      const { rating, comment } = req.body;
      console.log(rating, comment, req.user);
      const course = await Courses.findById(req.params.id);
      const user = await User.findById(req.user.id);
      if (course) {
        const alreadyreviewed = course.reviews.find(
          (r) => r.user.toString() === user._id.toString()
        );
        if (alreadyreviewed) {
          return res.json({
            msg: "You already reviewed this course.",
            success: false,
          });
        }
        const review = {
          name: user.name,
          rating: Number(rating),
          comment,
          user: req.user.id,
        };
        course.reviews.push(review);
        course.rating =
          course.reviews.reduce((acc, item) => item.rating + acc, 0) /
          course.reviews.length;
        await course.save();
        return res.status(201).json({ msg: "Review added", success: true });
      }
    } catch (err) {
      console.log("-----------review error-------------");
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },
 
  getallcoursesbycategory: async (req, res) => {
    try {
      let courses;
      const numcourses = 8;
      const page = Number(req.query.page) || 1;
      const All = req.query.All ? true : false;

   
      const Topic = req.query.Topic
        ? {
            category: {
              $regex: req.query.Topic,
              $options: "i",
            },
          }
        : {};
      const New = req.query.New ? true : false;
     if (All && New) {
        courses = await Courses.find({ ...Topic })
          .limit(numcourses)
          .skip(numcourses * (page - 1))
          .sort("createdAt")
          .populate("user", "id name")
          .exec();
      } else if (!All && New) {
        courses = await Courses.find({ ...Topic })
          .sort("createdAt")
          .populate("user", "id name")
          .limit(6)
          .exec();
      } else if (All && !New) {
        courses = await Courses.find({ ...Topic })
          .sort("-rating")
          .populate("user", "id name")
          .limit(numcourses)
          .skip(numcourses * (page - 1));
      } else if (Topic){
        /* In Home*/
        courses = await Courses.find({ ...Topic })
          .populate("user", "id name")
          .limit(6);
      }
      const totalcourses = await Courses.countDocuments({ ...Topic });
      res.json({ courses, totalcourses });
    } catch (error) {
      console.log("------------all course error---------");

      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  },
  /*Course Filter Most Pobular + Home*/
  getcoursesbypob: async (req, res) => {
    try {
      const Topic = req.query.Topic
        ? {
            category: {
              $regex: req.query.Topic,
              $options: "i",
            },
          }
        : {};
      const courses = await Courses.find({ ...Topic })
        .sort("-rating")
        .limit(6)
        .exec();
      res.json(courses);
    } catch (error) {
      console.log("-----------course pobular error---------");
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  },
  getcoursesSearched: async (req,res) => {
    try {
          const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
      console.log("Keywooooooord query",req.query.keyword)
      const courses = await Courses.find({ ...keyword })
      .populate("user", "id name")
      .limit(6)
      res.json({ courses});
    } catch (error) {
      console.log("-----------course Search error---------");
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }

   
  },
  getcoursedetails: async (req, res) => {
    try {
      const courses = await Courses.findById(req.params.id).populate(
        "user",
        "id name description headline avatar"
      );
      res.json(courses);
    } catch (error) {
      console.log("------------course details error----------");
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  },
  updateCourse: async (req, res) => {
    try {
      const {
        name,
        category,
        price,
        goals,
        image,
        Prerequisites,
        description,
        audience,
        subcategorys,
        content,
        shortdescription,
      } = req.body;

      console.log(
        "--------------req booody-------------",
        req.body.content[0].lectures
      );
      const course = await Courses.findById(req.params.id);
      if (course) {
        course.name = name || course.name;
        course.category = category || course.category;
        course.price = price || course.price;
        course.goals = goals || course.goals;
        course.shortdescription = shortdescription || course.shortdescription;
        course.image = image || course.image;
        course.Prerequisites = Prerequisites || course.Prerequisites;
        course.description = description || course.description;
        course.audience = audience || course.audience;
        course.subcategorys = subcategorys || course.subcategorys;
        course.content = content || course.content;
        console.log(course.content[0].lectures);
        // course.user.name
        // course.user.headline
        // course.user.description
        const updatedCourse = await course.save();
        // console.log("updatedCourse", updatedCourse);
        res.json({ msg: "Update Course Success!" });
      }
    } catch (err) {
      console.log("-----------Update crs error-------------", err);
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCourse: async (req, res) => {
    try {
      await Courses.findByIdAndDelete(req.params.id);

      res.json({ msg: "Deleted Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addCourse: async (req, res) => {
    try {
      const course = new Courses({
        category: "Change Category here",
        name: "Sample",
        shortdescription: "Short Description here",
        goals: ["goals"],
        content: [],
        user: req.user.id,
        Prerequisites: [],
        description: "Sample Description",
        audience: [],
        image: "https://i.imgur.com/wCdx6Zs.png",
        students: [],
        subcategorys: [],
        rating: 0,
        numReviews: 0,
        price: 0,
        numStudents: 0,
        reviews: [],
      });
      const addCourse = await course.save();
      res.json(addCourse);
    } catch (err) {
      console.log("-----------Add crs error-------------", err);
      return res.status(500).json({
        message:
          "Probably you don't change the (Sample Name) of the last course that you added",
      });
    }
  },
};
module.exports = coursesCtrl;
