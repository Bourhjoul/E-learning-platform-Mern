const router = require("express").Router();
const coursesCtrl = require("../controllers/coursesCtrl");
const auth = require("../middleware/auth");
const admin = require("../middleware/authAdmin");
const isTeacher = require("../middleware/isTeacher");
//visit ->  list 6  courses by cg
router.get("/topic", coursesCtrl.getallcoursesbycategory);
//visit ->  list 6 courses sorted by rating
router.get("/pobular", coursesCtrl.getcoursesbypob);
router.get("/searched", coursesCtrl.getcoursesSearched);
//login as a teacher -> refresh_token -> getallmycourses
router.get("/Mycourses", auth, isTeacher, coursesCtrl.getMycourses);
//login as an admin -> refresh_token -> getallcourses
router.get("/Allcourses", auth, admin, coursesCtrl.getAllcourses);
//visit ->  check the membership of student in a course
router.get("/checkmembership", auth, coursesCtrl.studentMembership);
//login as a student -> refresh_token -> getallCoursespurshased
router.get("/Coursespurshased", auth, coursesCtrl.getcoursespurshased);

router.get("/subcategory/:Topic", coursesCtrl.getsubcategorys);
router.post("/rate/:Topic", coursesCtrl.getcoursesbyrate);
router.post("/price/:Topic", coursesCtrl.getcoursesbyprice);

router.get("/subcg/:subcg", coursesCtrl.getcoursesbysubcg);
//login as a student -> refresh_token -> getallCoursespurshased
router.post("/createreview/:id", auth, coursesCtrl.createcoursereview);
//visit ->  Get course details
router.get("/details/:id", coursesCtrl.getcoursedetails);
router.put("/updatecourse/:id", coursesCtrl.updateCourse);
router.delete("/deletecourse/:id", coursesCtrl.deleteCourse);
router.post("/addcourse", auth, isTeacher, coursesCtrl.addCourse);

module.exports = router;
