const router = require('express').Router()
const coursesCtrl = require('../controllers/coursesCtrl')
const auth = require('../middleware/auth')
const isTeacher = require('../middleware/isTeacher')
//visit ->  list 6  courses by cg
router.get('/topic', coursesCtrl.getallcourses)
//visit ->  list 6 courses sorted by rating
router.get('/pobular', coursesCtrl.getcoursesbypob)
//login as a teacher -> refresh_token -> getallmycourses
router.get('/Mycourses', auth, isTeacher, coursesCtrl.getMycourses)
//visit ->  Get course details
router.get('/:id',coursesCtrl.getcoursedetails)


module.exports = router