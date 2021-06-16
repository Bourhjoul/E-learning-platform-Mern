const router = require("express").Router();
const coursesCtrl = require("../controllers/coursesCtrl");
const auth = require("../middleware/auth");
const isTeacher = require("../middleware/isTeacher");
//visit ->  list 6  courses by cg
router.get("/topic", coursesCtrl.getallcoursesbycategory);
//visit ->  list 6 courses sorted by rating
router.get("/pobular", coursesCtrl.getcoursesbypob);
router.get("/searched", coursesCtrl.getcoursesSearched);
//login as a teacher -> refresh_token -> getallmycourses
router.get("/Mycourses", auth, isTeacher, coursesCtrl.getMycourses);
//visit ->  check the membership of student in a course
router.get("/checkmembership", auth, coursesCtrl.studentMembership);
//login as a student -> refresh_token -> getallCoursespurshased
router.get("/Coursespurshased", auth, coursesCtrl.getcoursespurshased);
//visit ->  check the membership of student in a course
router.get("/subcategory/:Topic", coursesCtrl.getsubcategorys);
//visit ->  check the membership of student in a course
router.get("/subcg/:subcg", coursesCtrl.getcoursesbysubcg);
//login as a student -> refresh_token -> getallCoursespurshased
router.post("/createreview/:id", auth, coursesCtrl.createcoursereview);
//visit ->  Get course details
router.get("/:id", coursesCtrl.getcoursedetails);
router.put("/updatecourse/:id", coursesCtrl.updateCourse);
router.delete("/deletecourse/:id", coursesCtrl.deleteCourse);
router.post("/addcourse", auth, isTeacher, coursesCtrl.addCourse);

module.exports = router;
