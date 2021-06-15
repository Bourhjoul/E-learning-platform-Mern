import React from 'react'
import Rating from '../Coursepage/Rating'
import {Link } from 'react-router-dom'
const Coursesblock = ({course}) => {
    return (
     
        <Link to = {`/courses/${course._id}`}><div className="coursesToBuy" >
                              <div className="coursesPhoto">
                              <img alt="course" src={course.image} className="coursesPhoto1"/>
                              </div>
                              <div className="coursesInformation">

                             
                    
                    <b className="courseTitle">{course.name}</b><br></br>
                                  <b className="courseOwner">{course.user.name}</b>
                                    <div className="ratingCourse">
                                      <b>{course.rating}</b>
                                       <Rating value={course.rating}/>
                                    </div>
                                  
                                  <p>63 total hours . All levels</p>
                                  
                              </div>

                              <div className="coursesPrice">
                                    <b className="nouveauPrice">${course.price}</b>                            
                                    <b className="ancienPrice">$94.99</b>
                              </div>
                          </div></Link>
       
    )
}

export default Coursesblock
