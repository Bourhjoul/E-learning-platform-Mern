import React,{useState} from 'react'
import Rating from './Rating'
import { Image } from 'antd';
import {Link } from 'react-router-dom'
import {IoMdClose, BiLike, BiDislike ,IoIosArrowForward, BsExclamationOctagon, BsCheck, IoIosArrowDown, AiFillPlayCircle, RiArrowUpSLine} from 'react-icons/all'
import Collapsible from './Collapsible'
import { ReactVideo, YoutubePlayer } from "reactjs-media";
import Comments from './Comments'
import './Coursepage.css'

const Coursepage = () => {
   
    const [show, setShow] = useState(0)

    const[add,setAdd]=useState(false)
    const [disable, setDisable] = useState(false)
    const onChangeBack= () =>{
        if(window.scrollY >= 290){
           setAdd(true)
        }
        else  setAdd(false)
    }
    window.addEventListener('scroll',onChangeBack)

    const Disable= () =>{
        if(window.scrollY >= 2800){
           setDisable(true)
        }
        else  setDisable(false)
    }

    window.addEventListener('scroll',Disable)
        return (
        <div className="coursePage">
           <div>
            <div className="descriptionPart">
                <div className="descriptionPartText">
                <div className="CategorieCourse">
                    <h4><Link to="/">Developpement</Link> <IoIosArrowForward color="white" size="10"/> <Link to="/">Développement Web</Link> <IoIosArrowForward color="white" size="10"/> Next.js </h4>
                </div>
                <div>
                    <h1 className="courseNaame">Next.js Dev to Deployment</h1>
                    <p className="courseAbout">Learn Next.js building a music event website</p>
                    <div className="ratingCourse">
                        <b>4.7</b>
                        <Rating value="1.5"/>
                    </div>
                    
                    <div className="informationCourse">
                        <p>Crée par <a href="#">Brad Traversy</a></p>
                        <div className="wish-share">
                                <button className="buttonsCourse"><Link className="Link" to="/cart">Add to Cart</Link></button>
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
                    <li><BsCheck className="checkIcon"/>
                    Build a music event application from start to finish</li>
                
                
                    <li><BsCheck className="checkIcon"/>
                    Create a backend using Strapi CMS</li>
                
            
                    <li><BsCheck className="checkIcon"/>
                    Pagination, search, image uploading with Cloudinary</li>
                
            
                    <li><BsCheck className="checkIcon"/>
                    Learn the fundamentals of NextJS</li>
                
            
                    <li><BsCheck className="checkIcon"/>
                    JWT Authentication / HttpOnly Cookie Storage</li>
                
            
                    <li><BsCheck className="checkIcon"/>
                    Static site generation</li>

                    
                    </ul>
                </div>
            </div>

            <div className="contenuCours">
                <h2>Course content</h2>
               
                    <b className="sectionsSessions">9 sections / 20 sessions / Durée totale: 6h 21min</b>
                <div className="allCourseContent">
                    <Collapsible title="Introduction" sessions="5" minutes="55" content="Welcome to the first course HI!"/>
                    <Collapsible  title="Seance 1" sessions="5" minutes="12" content="Welcome to the seance1 course HI!"/>
                    <Collapsible  title="Seance 2" sessions="7" minutes="50" content="Welcome to the seance2 course HI!"/>
                    <Collapsible  title="Seance 3" sessions="4" minutes="20" content="Welcome to the seance3 course HI!"/>
                    <Collapsible  title="Seance 4" sessions="8" minutes="69" content="Welcome to the seance4 course HI!"/>
                    <Collapsible  title="Seance 5" sessions="3" minutes="70" content="Welcome to the seance5 course HI!"/>
                    <div className="pre-requis">
                        <h2>Prerequisite</h2>
                        <ul>
                            <li>Modern Javascript</li>
                            <li>The basics of Rreact</li>
                        </ul>
                    </div>

                    <div className="descriptionCourse">
                        <h2>Description</h2>
                        <p>Next.js is a framework for building server-side rendered React websites as well as static websites. This is a project-based course for learning Next.js. We will build a music events application that will give you the foundational knowledge that you need to create your own applications. We will use Strapi (a headless CMS) as our backend but you could just as well use anything

                            We will learn the fundamentals of Next.js like...

                            Pages & Routing

                            Data Fetching Methods - getServerSideProps, getStaticProps, getStaticPaths

                            Custom API Routes

                            Static Generation

                            Image Optimization

                            In our main project, we will also be working with...

                            Strapi CMS

                            Authentication with JWT (JSON Web Tokens)

                            Authorization and access control

                            Storing HttpOnly Cookies on the server

                            Pagination, search filters, etc

                            Image uploading with Cloudinary integration

                            Deploying to Vercel and Heroku

                            Next.js can also be used as a static site generator. I will be adding a completely static blog project within a month of initial release and possibly a third project in the future



                            What should you know before taking this course?

                            You should know JavaScript basics and modern JavaScript features like arrow functions, restructuring, the spread operator

                            You should also know the basics of React. I will not be explaining things like components, props, JSX
                            Resources:

                            All of the final code will be provided in the project repos and all needed resources will be provided in the sections</p>   
                    
                        <h2>Who is this course for?</h2>
                        <ul>
                            <li>People that want to learn NextJS</li>
                            <li>Learn the foundations to build a full stack application with CRUD, pagination, authentication and more</li>
                        </ul>
                    </div>
                    
                </div>  
            </div>
            </div>
           
         </div>  
         <div className="afafa">
         <div className={`toAddCart ${disable ? 'disable' : add ? 'active'  : 'disable'}`}>
            {/* <div className="informationsToBuyCourse"> */}
            <img src="./images/react.jpg" width="400" alt ='' height="175" className="courseImage"/>
            <div className = 'bottom_card'>
                <div className = 'price'>
                    <p className = "new-price"> <span>$12,44</span></p>
                    <h4 className = "last-price">Old Price: <span>$94,99</span></h4> 
                </div>
         
                <div className="btnsShop">
                        <button className="btnaddToCart">Add to Cart</button>
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
                    <b>Brad Traversy</b>
                    <p className="instructorProfession">Full Stack Web Developer & Instructor at Traversy Media</p>
                </div>              
                </div>

                
            </div>
                    <p>Brad Traversy has been programming for around 12 years and teaching for almost 5 years. He is the owner of Traversy Media which is a successful web development YouTube channel and specializes in everything from HTML5 to front end frameworks like Angular as well as server side technologies like Node.js, PHP and Python. Brad has mastered explaining very complex topics in a simple manner that is very understandable. Invest in your knowledge by watching Brad's courses.</p>
                    
        </div>
            <div className="commentsUsers">
                <h2 className="commentOfParti">Comments of Students</h2>
                <Comments commentPerson="ZAAM Soufiane" commentMessage="As always, Brad over-delivered on another course. I've taken courses from plenty of other educators. Brad does such an amazing job at not just how to use the technologies presented, but why to use them. Looking forward to learning more from my favorite Udemy educator. Thanks Brad!" />
                <Comments commentPerson="ZAAM Soufiane" commentMessage="As always, Brad over-delivered on another course. I've taken courses from plenty of other educators. Brad does such an amazing job at not just how to use the technologies presented, but why to use them. Looking forward to learning more from my favorite Udemy educator. Thanks Brad!" />
            </div>
    </div>        
        
           
        
    </div>
   
</div>

            
</div>
    )
}

export default Coursepage
