const dotenv = require("dotenv");
const mongoose = require('mongoose')
const Users = require('./models/userModel')
const Courses = require('./models/CourseModel')
const samplecourses = require ('./Data/Courses')
dotenv.config()
const CONNECTION_URL = 'mongodb+srv://souhail:souhail2001@cluster0.bnzut.mongodb.net/myDataBase?retryWrites=true&w=majority';

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(CONNECTION_URL,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
      console.error(`Error: ${error.message}`)
            process.exit(1)
    }
}

const importdata = async () => {
    connectDB()
    try {
        const Teacher = await Users.findById('60b420cc9462a83244b17db1')
        const sampletcourses = samplecourses.map(course => {
            return{...course, user: Teacher}
        })
        console.log(sampletcourses)
        await Courses.insertMany(sampletcourses)
        console.log('Data Imported')

    } catch (error) {
        console.log(`${error}`)
        process.exit(1)
    }
}


const destroyData = async () => {
        connectDB()

    try {
        // empty all models 
       await Courses.deleteMany()
    
        console.log(`Data Destroyed !`)
    } catch (error) {
        console.log(`${error}`)
        process.exit(1)
    }
}



if (process.argv[2] === '-i') {
    importdata()

}else if(process.argv[2] === '-d'){
    destroyData()
} else {
    console.log('nothing to run')
}