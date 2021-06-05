import React,{useState, useEffect} from 'react'
import {BsFillPeopleFill,BiLeftArrowCircle, MdFilterList} from 'react-icons/all'
import { Tabs } from 'antd';
import Slider from "react-slick";
import './CourseFilter.css'
import {Link, useParams} from 'react-router-dom'
import CourseCard from '../../components/CourseCard/CourseCard'

import CollapsibleFilter from './CollapsibleFilter'
import { Skeleton } from 'antd';
import { Empty } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Listcoursesbypobularity, ListcoursesbyTopic } from '../../redux/actions/courseActions';
import Coursesblock from './Coursesblock'
const CourseFilter = () => {
    



      const [isFilter, setIsFilter] = useState(false)
  
      

      const dispatch = useDispatch()
      const ListCoursesReducer = useSelector(state => state.ListCoursesReducer)
      const { loading, courses, error } = ListCoursesReducer
    
      const ListCoursesbyPobularityReducer = useSelector(state => state.ListCoursesbyPobularityReducer)
      const { loading : loadingpobular, courses : coursespobular, error : errorpobular } = ListCoursesbyPobularityReducer



    const { TabPane } = Tabs;
    var settings = {
      dots: false,
      infinite: true,
      // speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      
      responsive: [
{
breakpoint: 1024,
settings: {
  slidesToShow: 3,
  slidesToScroll: 3,
  infinite: true,
  arrows: false,
}
},
{
breakpoint: 600,
settings: {
  slidesToShow: 2,
  slidesToScroll: 2,
        initialSlide: 2,
  arrows: false,
}
},
{
breakpoint: 480,
settings: {
  slidesToShow: 1,
        slidesToScroll: 1,
  arrows: false,
}
}
]
};


let {topic} = useParams()

useEffect(() => {
 
    switch (topic) {
    case 'development':
            
            dispatch(ListcoursesbyTopic('Devlopement'))
            console.log('1')
            break;
    case 'marketing':
            dispatch(ListcoursesbyTopic('marketing'))
            
            console.log('case 2')
            break;
    case 'selfdev':
            dispatch(ListcoursesbyTopic('Self dev'))
            console.log('case 3')
            break;

    case 'design':
      dispatch(ListcoursesbyTopic('design'))
      console.log('case 3')
      break;

      case 'music':
    dispatch(ListcoursesbyTopic('music'))
    console.log('case 3')
    break;

    case 'photography':
    dispatch(ListcoursesbyTopic('photography'))
    console.log('case 3')
    break;


    case 'education':
    dispatch(ListcoursesbyTopic('education'))
    console.log('case 3')
    break;
    
   default: break;
    
    }
  return () => {
          
  }
}, [dispatch, topic])






    return (
        <div className="cartPage">
          
            <div className="courseSurSujet">
                <h1>Web Development Courses</h1>
                <h3>Web Development relates to <Link to="/">{topic}, </Link>
                <Link to="/">IT & Software</Link></h3>
                <p><BsFillPeopleFill className="iconPeople" color="#848482" size="18"/> 9 000 002 learners</p>
            </div>
            <div className="coursePourCommencer">
                <h2>Courses to get you started</h2>
                <Tabs size="large" defaultActiveKey="1">
                    <TabPane tab="Most popular" key="1">
                    <div className='TabContent'>
                        <div className='coursecards'>
                        {loadingpobular ? <Skeleton /> : errorpobular ? 
                                <div> Error </div> :
                                coursespobular.length === 0 ?
                                <Empty /> :
                                <Slider {...settings}>
                                        {coursespobular.map((course, index) => (
                                                <>
                                                <CourseCard key={course._id} data-index={index} course={course}/>
                                                </>
                                        ))}                   
                                </Slider>
                                }   
                                
                        </div>
                    </div>
                    </TabPane>
                    <TabPane tab="New" key="2">
                    <div className='TabContent'>
                        <div className='coursecards'>
                        {loading ? <Skeleton /> :  error ? <div>Error</div> :courses.length === 0 ? <Empty />
                                          :
                                   <Slider {...settings}>
                                    {courses.map((course, index) => (
                                      <>
                                    <CourseCard key={course._id} data-index={index} course={course}/>
                                  
                                    </>
                                    ))}
                                    </Slider>
                                    }
                        </div>
                    </div>
                    </TabPane>
                   
                </Tabs>
            </div>

            <div className="courseOfSite">
             
                <h2>Web Development students also learn</h2>
                <div className="courseOfSiteSlider">
                    
                      <div data-index='0'>
                          <Link to="/">Javascript</Link>
                      </div>
                      <div data-index='1'>
                          <Link to="/">HTML</Link>
                      </div>
                      <div data-index='2'>
                          <Link to="/">CSS</Link>
                      </div>
                      <div data-index='3'>
                          <Link to="/">React JS</Link>
                      </div>
                      <div data-index='4'>
                          <Link to="/">Mongo DB</Link>
                      </div>
                      <div data-index='5'>
                          <Link to="/">Kotlin</Link>
                      </div>
                      <div data-index='6'>
                          <Link to="/">Flutter</Link>
                      </div>
                      <div data-index='7'>
                          <Link to="/">Angular</Link>
                      </div>
                      <div data-index='8'>
                          <Link to="/">Mysql</Link>
                      </div>
                      <div data-index='9'>
                          <Link to="/">ASP.net</Link>
                      </div>
                      <div data-index='10'>
                          <Link to="/">Oracle</Link>
                      </div>
                      <div data-index='11'>
                          <Link to="/">C++</Link>
                      </div>
                      <div data-index='12'>
                          <Link to="/">Django</Link>
                      </div>
                      
                     

                      
                    
                  </div>
            </div>

            <div className="filterCourses">
              <br></br>
              <div>
                <h2>All Web Development courses</h2>
                <button className="filterButton" onClick={() => setIsFilter(!isFilter)}><MdFilterList size="22" className="filterIcon"/>Filter</button>
                <select className="filterButton">
                    <option>Most Popular</option>
                    <option>Highest Rated</option>
                    <option>Newest</option>

                </select>
                <button className="clearFiltersBtn">Clear</button>
                </div>
                
               
                  <div className="filterHere">
                    <div>
                      <div className={`filterBy ${isFilter ? 'filterr' : 'filterroff'}`}>
                      <CollapsibleFilter  title="Ratings"  value="1"/>
                      <CollapsibleFilter  title="Topic" value ="2"/>
                      <CollapsibleFilter  title="Subcategory" value="3"/>
                      
                      <CollapsibleFilter  title="Price"  value="4"/>

                      </div> 

                      <div className="teacherUdemy">
                          <h2>Teach the world online</h2>
                          <p>Create an online video course, reach students across the globe, and earn money</p>
                          <button className="teachOnUdemy">Teach on Udemy</button>
                      </div>
                    </div>  
                      <div className="coursesVideos">


                      
                      {loading ? <Skeleton /> :  error ? <div>Error</div> :courses.length === 0 ? <Empty />
                              :
                              
                              courses.map((course, index) => (
                                    <Coursesblock  key={course._id} data-index={index} course={course}/>
                              ))}

                         

                                   
                                          
                                   
                      </div>
                  </div>
            </div>
        </div>
    )
}

export default CourseFilter
