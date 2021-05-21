import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React ,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Home from './pages/Home/Home';
import "antd/dist/antd.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from './components/Navbar/Navbar';

import Footer from './components/Footer/Footer';
import Coursepage from './components/Coursepage/Coursepage';

import Login from './components/body/auth/Login'
import Register from './components/body/auth/Register'
import ActivationEmail from './components/body/auth/ActivationEmail'
import axios from "axios"
import {dispatchLogin, dispatchGetUser, fetchUser} from './redux/actions/authAction'

import NotFound from './components/utils/NotFound/NotFound'
import ForgotPass from './components/body/auth/ForgotPassword';
import ResetPass from './components/body/auth/ResetPassword';


function App() {
  //Get Acces token
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const {isLogged} = auth

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){
      const getToken = async () => {
        // make post request : hey db get me some data and return it to me 
        const res = await axios.post('/user/refresh_token', null)
        dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
      }
      getToken()
    }
  },[auth.isLogged, dispatch])
  // when refresh the token exsit but the logged change to false that's we do that

  useEffect(() => {
    if(token){
      const getUser = () => {
        dispatch(dispatchLogin())
//Get user infor
        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
  },[token, dispatch])
  return (
    <>
    <div className='main'>
        <Router>
          <>
            <Navbar />
          <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/Course"  component={Coursepage} />

             <Route exact path='/login' component={ isLogged ? NotFound : Login}/>     
             <Route exact path='/register' component={isLogged ? NotFound : Register}/>  
             <Route exact path='/user/activate/:activation_token' component={ActivationEmail}/> 
             <Route exact path='/forgot_password' component={isLogged ? NotFound : ForgotPass}/>     
             <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPass} exact />

          </Switch>
        </>
        </Router>
        <Footer />

      </div>

</>
  );
}

export default App;
