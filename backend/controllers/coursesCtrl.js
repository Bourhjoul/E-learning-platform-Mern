const Courses = require("../models/CourseModel");
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
  getallcoursesbycategory: async (req, res) => {
    try {
      const All = req.query.All;
      const Topic = req.query.Topic
        ? {
            category: {
              $regex: req.query.Topic,
              $options: "i",
            },
          }
        : {};
      const New = req.query.New;
      if (All && New) {
        const courses = await Courses.find({ ...Topic })
          .sort("createdAt")
          .populate("user", "id name")
          .exec();
        res.json(courses);
      } else if (!All && New) {
        const courses = await Courses.find({ ...Topic })
          .sort("createdAt")
          .populate("user", "id name")
          .limit(6)
          .exec();

        res.json(courses);
      } else if (All && !New) {
        const courses = await Courses.find({ ...Topic })
          .sort("-rating")
          .populate("user", "id name")
          .limit(6);
        res.json(courses);
      } else {
        const courses = await Courses.find({ ...Topic }).populate(
          "user",
          "id name"
        );
        res.json(courses);
      }
    } catch (error) {
      console.log("------------all course error---------");

      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  },
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
        lectures,
      } = req.body;

      console.log("--------------req booody-------------", req.body);
      const course = await Courses.findById(req.params.id);
      console.log("find the course", course);
      if (course) {
        course.name = name || course.name;
        course.category = category || course.category;
        course.price = price || course.price;
        course.goals = goals || course.goals;
        course.shortdescription;
        course.image = image || course.image;
        course.Prerequisites = Prerequisites || course.Prerequisites;
        course.description = description || course.description;
        course.audience = audience || course.audience;
        course.subcategorys = subcategorys || course.subcategorys;
        course.content = content || course.content;
        course.content.lectures = lectures || course.content.lectures;

        // course.user.name
        // course.user.headline
        // course.user.description
        const updatedCourse = await course.save();
        console.log("updatedCourse", updatedCourse);
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
