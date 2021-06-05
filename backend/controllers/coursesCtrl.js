
const Courses = require('../models/CourseModel')
const coursesCtrl = {
    getMycourses: async (req, res) => {
        try {
            const courses = await Courses.find({ user: req.user.id })
            res.json(courses)
        } catch (err) {
            console.log('-----------mycourse error-------------')

            console.log(err)
            return res.status(500).json({msg: err.message})
        } 
    },
    getallcourses: async (req, res) => {
        try {
            const Topic = req.query.Topic
            const courses =  await Courses.find({category : {
                        $regex : Topic,
                        $options: 'i',
            }}).populate('user','id name').limit(6);
            res.json(courses)
        } catch (error) {
            console.log('------------all course error---------')

            console.log(error)
            return res.status(500).json({msg: error.message})
        }
        
    },
    getcoursesbypob: async (req,res) =>{
        try {
            const courses = await Courses.find({}).sort('-rating').limit(6).exec()
            res.json(courses)
        } catch (error) {
            console.log('-----------course pobular error---------')
            console.log(error)
            return res.status(500).json({msg: error.message})
        }
    },
    getcoursedetails: async (req, res) => {
        try {
            const courses = await Courses.findById(req.params.id).populate('user','id name description headline avatar')
            res.json(courses)
        } catch (error) {
            console.log('------------course details error----------')
            console.log(error)
            return res.status(500).json({msg: error.message})
        }
    }
}
module.exports = coursesCtrl