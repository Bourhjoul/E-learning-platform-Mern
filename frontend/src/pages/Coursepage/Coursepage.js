import React,{useEffect, useState} from 'react'
import Rating from './Rating'
import { Image } from 'antd';
import {Link } from 'react-router-dom'
import {IoMdClose, BiLike, BiDislike ,IoIosArrowForward, BsExclamationOctagon, BsCheck, IoIosArrowDown, AiFillPlayCircle, RiArrowUpSLine} from 'react-icons/all'
import Collapsible from './Collapsible'
import { ReactVideo, YoutubePlayer } from "reactjs-media";
import Comments from './Comments'
import { Skeleton, Input, Button } from 'antd';
import './Coursepage.css'
import { useDispatch, useSelector } from 'react-redux';
import { Getcoursedetails } from '../../redux/actions/courseActions';
import Error from '../../components/utils/Error';

const Coursepage = ({ match, history }) => {

    
const { TextArea } = Input;
    const dispatch = useDispatch();
    const [show, setShow] = useState(0)
    const GetCourseDetailsReducer = useSelector(state => state.GetCourseDetailsReducer)
    const {loading,course,error} = GetCourseDetailsReducer
    const[add,setAdd]=useState(false)
    const [disable, setDisable] = useState(false)
    const onChangeBack= () =>{
        if(window.scrollY >= 200){
           setAdd(true)
        }
        else  setAdd(false)
    }
    window.addEventListener('scroll',onChangeBack)

    const Disable= () =>{
        if(window.scrollY >= 2600){
           setDisable(true)
        }
        else  setDisable(false)
    }
    useEffect(() => {
        dispatch(Getcoursedetails(match.params.id))

        return () => {
        }
    }, [dispatch,match.params.id])
    window.addEventListener('scroll', Disable)
    const addToCartHandler = () =>{
        history.push(`/cart/${match.params.id}`)
      }
    return (
    <>
        {
                loading ? <Skeleton active /> : error ? <Error error = {error} /> :
                    
        <div className="coursePage">
                
            <div>
            <div className="descriptionPart">
                <div className="descriptionPartText">
                <div className="CategorieCourse">
                <h4><Link to="/">{course.category}</Link>
                                            {/* <IoIosArrowForward color="white" size="10" /> <Link to="/">Développement Web</Link> <IoIosArrowForward color="white" size="10" /> Next.js  */}
                </h4>
                </div>
                <div>
                    <h1 className="courseNaame">{course.name}</h1>
                    <p className="courseAbout">{course.shortdescription}</p>
                    <div className="ratingCourse">
                        <b>{course.rating}</b>
                        <Rating value={course.rating}/>
                    </div>
                    
                    <div className="informationCourse">
                    {!loading && !error && <p>Created by <a href="#"> {course.user.name}</a></p>}        
                        <div className="wish-share">
                                <button className="buttonsCourse" onClick={addToCartHandler}>Add to Cart</button>
                                <button className="buttonsCourse"><Link className="Link" to="/">Shop Now</Link></button>
                                <button className="buttonsCourse Video"><Link className="Link" to="/">Watch Video</Link></button>
                        </div>
                    </div>
                </div>
                </div>
                <div className="windowToBuy">
                <YoutubePlayer
                src="https://www.youtube.com/watch?v=zueyEdRZQlk" // Reqiured
                width={480}
                height={250}/>
                </div>
            </div>
            <div>
                <div className="allAboutCourse">
                    <div className="otherInformations">
            <div>
            <div className="learnAbout">
                <h3>What you gonna learn</h3>
                <div className="whatlearn">
                    <ul>
                    {course.goals.map((goal,index) => (
                        <li key={index}><BsCheck className="checkIcon" />{goal}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="contenuCours">
                <h2>Course content</h2>
               
                <b className="sectionsSessions">9 sections / 20 sessions / Durée totale: 6h 21min</b>
                <div className="allCourseContent">
                    {course.content.map((section,index) => (
                            <Collapsible section = {section} sessions="5" minutes="55"/>
                        ))}
                    <div className="pre-requis">
                        <h2>Prerequisite</h2>
                        <ul>
                        {course.Prerequisites.map((Prerequisite,index) => (
                            <li key={index}>{Prerequisite}</li>
                        ))}
                        </ul>
                    </div>

                    <div className="descriptionCourse">
                        <h2>Description</h2>
                        <p>{course.description}</p>   
                    
                        <h2>Who is this course for?</h2>
                        <ul>
                        {course.audience.map((audi,index) => (
                            <li key={index}>{audi}</li>
                        ))}
                        </ul>
                    </div>
                    
                </div>  
            </div>
            </div>
           
         </div>  
         <div className="afafa">
         <div className={`toAddCart ${disable ? 'disable' : add ? 'active'  : 'disable'}`}>
            {/* <div className="informationsToBuyCourse"> */}
            <img src={course.image} width="400" alt ='' height="175" className="courseImage"/>
            <div className = 'bottom_card'>
                <div className = 'price'>
                    <p className = "new-price"> <span>{course.price}</span></p>
                    <h4 className = "last-price">Old Price: <span>$94,99</span></h4> 
                </div>
         
                <div className="btnsShop">
                        <button className="btnaddToCart"  onClick={addToCartHandler}>Add to Cart</button>
                        <button className="btnShopNow">Shop Now</button>
                        <p className="garantie">Money-Back Guarantee</p>

                </div>
                                    
                                        

                        
            </div>

        </div>
        </div>

        
    </div> 
    <div className = 'bottom-infos'>
        <div className="formateur">
            <div className="formateurName">
                <h2>Insrtuctor</h2>
                <div style = {{display : 'flex'}}>
                <img src='https://i.imgur.com/tJOSejv.png' id='avatar_insrtuctor' alt='avatar' />
                <div className = 'name_job'>
                    <b>{course.user.name}</b>
                    <p className="instructorProfession">{course.user.headline}</p>
                </div>              
                </div>

                
            </div>
                <p>{course.user.description}</p>
                    
        </div>
            <div className="commentsUsers">
                <h2 className="commentOfParti">Comments of Students</h2>
                <Comments commentPerson="ZAAM Soufiane" commentMessage="As always, Brad over-delivered on another course. I've taken courses from plenty of other educators. Brad does such an amazing job at not just how to use the technologies presented, but why to use them. Looking forward to learning more from my favorite Udemy educator. Thanks Brad!" />
                <Comments commentPerson="ZAAM Soufiane" commentMessage="As always, Brad over-delivered on another course. I've taken courses from plenty of other educators. Brad does such an amazing job at not just how to use the technologies presented, but why to use them. Looking forward to learning more from my favorite Udemy educator. Thanks Brad!" />
                
            </div>
            <div className="commentField">
            <TextArea  />
            <Button className="sendComment">Send</Button>


            </div>
    </div>        
        
           
        
    </div>
   
</div>

            
            </div>
            }
</>
    )
}

export default Coursepage
