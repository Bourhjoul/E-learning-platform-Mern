const Users = require('../models/userModel')

const isTeacher = async (req, res, next) => {
    try {
        const user = await Users.findOne({_id: req.user.id})
        if(!user.Teacher) 
            return res.status(500).json({msg: "Teacher resources access denied."})

        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = isTeacher