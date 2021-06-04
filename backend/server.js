const dotenv = require("dotenv");
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpoad = require('express-fileupload')
const res = dotenv.config();
const app = express()
app.use(express.json())
app.use(cors());
app.use(cookieParser())
app.use(fileUpoad({ useTempFiles: true }))

//Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/upload'))
app.use('/courses',require('./routes/courseRouter'))

const PORT = process.env.PORT || 5000;



const CONNECTION_URL = 'mongodb+srv://souhail:souhail2001@cluster0.bnzut.mongodb.net/myDataBase?retryWrites=true&w=majority';

mongoose.connect(CONNECTION_URL, { 
  useNewUrlParser: true, 
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server MongoDb Connected Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false); 