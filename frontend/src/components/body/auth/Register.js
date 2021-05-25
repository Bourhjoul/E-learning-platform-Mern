import React, {useState} from 'react'
import {Image,Input} from 'antd';
import {Link } from 'react-router-dom';
import axios from "axios"
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {useDispatch} from 'react-redux'
import {isEmpty,isEmail,isMatch,isLength} from '../../utils/validation/Validation'

const initialState = {
     name: '',
     email: '',  
     password: '',
     cf_password: '',
     err:'',
     success: ''}
     
     const Register = () => {
         const[formDataUser,setFormDataUser] = useState(initialState)
         const dispatch = useDispatch()
      
         const {name,email,password,cf_password,err,success} = formDataUser
         const handleChange = e => {
            //place of do that onChange={(e) => setEmail(e.target.value) for each field (input) we do that
            setFormDataUser({ ...formDataUser, [e.target.name]: e.target.value , err : '',success: ''})
        }
        const handleSubmit = async e => {
            e.preventDefault();
            if(isEmpty(name) | isEmpty(password))
            return  setFormDataUser({ ...formDataUser,  err: 'Please fill in all fields' , success: ''})
            
            if(!isEmail(email))
              return  setFormDataUser({ ...formDataUser,  err: 'Invalid email' , success: ''})
              
              if(isLength(password))
              return  setFormDataUser({ ...formDataUser,  err: 'Password must be at least 6 characters.' , success: ''})
              
              if(!isMatch(password, cf_password))
              return  setFormDataUser({ ...formDataUser,  err: 'Password did not match' , success: ''})
              try {
             
             
                const res = await axios.post('/user/register', { name, email, password })
                console.log(res)
              setFormDataUser({ ...formDataUser,  err: '' , success: res.data.msg})
      
            } catch (err) {
              err.response.data.msg &&
               setFormDataUser({ ...formDataUser,  err: err.response.data.msg ,success: ''})

            }
        }

        const inputs = document.querySelectorAll(".input");


        function addcl(){
          let parent = this.parentNode.parentNode;
          parent.classList.add("focus");
        }
        
        function remcl(){
          let parent = this.parentNode.parentNode;
          if(this.value === ""){
            parent.classList.remove("focus");
          }
        }
        
        
        inputs.forEach(inputa => {
          inputa.addEventListener("focus", addcl);
          inputa.addEventListener("blur", remcl);
        });
        
        

    return (
       <div>
  <img className="wave" alt ='wave' src="https://i.imgur.com/FKKMfGt.png" preview={false} />
  <div className="container">
    <div className="img">
      <Image src="https://i.imgur.com/UtQtlTN.png" preview={false} />
    </div>
    <div className="login-content">
      <form onSubmit={handleSubmit}>
      <Image  src="https://svgshare.com/i/XJn.svg " preview={false}
    />
        <h2 className="title">Register</h2>
    {err && showErrMsg(err)}
    {success &&  showSuccessMsg(success)}
        <div className="input-div one">
          <div className="i">
            <i className="fas fa-user" />
          </div>
          <div className="div">
                 <input name="name"  value={name} type="text" className="input"  placeholder='Enter Your Name' onChange={handleChange} />
          </div>
        </div>
        <div className="input-div one">
          <div className="i">
            <i className="fas fa-envelope" />
          </div>
          <div className="div">
                 <input name="email"  value={email} type="text" className="input"  placeholder='Enter Your Email' onChange={handleChange} />
          </div>
        </div>
        <div className="input-div pass">
          <div className="i"> 
            <i className="fas fa-lock" />
          </div>
          <div className="div"> 
                 <input  name="password" value={password} type="password" className="input" placeholder='Enter Password' onChange={handleChange} />
          </div>
        </div>
        <div className="input-div pass">
          <div className="i"> 
            <i className="fas fa-lock" />
          </div>
          <div className="div"> 
                 <input  name="cf_password" value={cf_password} type="password" className="input" placeholder='Confirm Password' onChange={handleChange} />
          </div>
        </div>
        <button type='submit' className="btn" >Register</button>
      <p>Already an account? <Link className="register" to="/login">Login</Link></p>
      </form>
    </div>
  </div>
</div>

    )
}

export default Register
