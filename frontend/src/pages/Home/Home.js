import { Card, } from 'antd'
import React, { useEffect, useRef } from 'react'
import { Empty } from 'antd';
import {Link} from 'react-router-dom'
import Slider from "react-slick";
import { Tabs } from 'antd';
import { Skeleton } from 'antd';
import './Home.css'
import CourseCard from '../../components/CourseCard/CourseCard';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import Footer from '../../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { Listcoursesbypobularity, ListcoursesbyTopic } from '../../redux/actions/courseActions';
import Error from '../../components/utils/Error';

const Home = () => {
        const dispatch = useDispatch()
        const ListCoursesReducer = useSelector(state => state.ListCoursesReducer)
        const { loading, courses, error } = ListCoursesReducer
        const ListCoursesbyPobularityReducer = useSelector(state => state.ListCoursesbyPobularityReducer)
        const { loading : loadingpobular, courses : coursespobular, error : errorpobular } = ListCoursesbyPobularityReducer
        const menuref = useRef(null)
        const pobularref = useRef(null)
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
        const executeScroll = () => menuref.current.scrollIntoView()
        const executeScrolltwo = () => pobularref.current.scrollIntoView({behavior: 'smooth'})
        
        const { TabPane } = Tabs;

        useEffect(() => {
                dispatch(ListcoursesbyTopic('Development'))
                dispatch(Listcoursesbypobularity())
                console.log(coursespobular)

                return () => {
                        
                }
        }, [])
        const changetopic = (key) => {
                switch (key) {
                        case '1':
                                dispatch(ListcoursesbyTopic('Development'))
                                break;
                        case '2':
                                dispatch(ListcoursesbyTopic('marketing'))
                                console.log('case 2')
                                break;
                        case '3':
                                dispatch(ListcoursesbyTopic('Self-dev'))
                                console.log('case 3')
                                break;
                        case '4':
                                dispatch(ListcoursesbyTopic('photography'))
                                console.log('case 4')
                                break;
                        case '5':
                                dispatch(ListcoursesbyTopic('music'))
                                console.log('case 5')
                                break;
                        case '6':
                                dispatch(ListcoursesbyTopic('design'))
                                console.log('case 6')
                                break;
                        default:
                                break;
                }
        }

    return (
            <div>
                <div>
                <div className = 'Banner_Card'>
                    <Card >
                        <h1>I want to learn</h1><hr/>
                        <p>Ambition accepted. Learn the latest skills to reach your professional goals.</p>
                        <button className='Btn' id = 'discover_btn' onClick = {executeScroll}>DISCOVER</button>
                    </Card>
                </div>
                <img className='Home_image' alt='' src='https://i.imgur.com/I8XiMP1.jpg' />
            </div>
                <section className='Menu1' id = 'Menu1' ref = {menuref}>
                <h2>For Newbies :</h2>
                <h3>We Recommend this for you to start.</h3>

            <Tabs defaultActiveKey="1" onTabClick = {changetopic} >
                    <TabPane tab="Devlopement" key='1' >
                        <div className='Tab_Content'>
                        <h2>Become a Devloper</h2>

                        <div id = 'paragraphbtn'>
                                <p>As Steve Jobs once said, “I think everybody in this country should learn how to program a computer, because it teaches you how to think. I view computer science as a liberal art.”<br/>
                                        In other words, learning to code won’t just give you technical knowledge—it’ll also give you a new way to approach your work.</p>
                                <button className='Btn' id = 'ReadMorebtn'>Discover More</button>
                        </div>
                        <div className='coursecards'>
                        {loading ? <Skeleton /> : error ? 
                        <Error error = {error} /> :
                                                                    courses.length === 0 ?
                                <Empty /> :
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
                <TabPane tab="Marekting" key = '2'>
                        <div className='Tab_Content'>
                        <h2>Become a Markter</h2>

                            <div id = 'paragraphbtn'>
                                    <p>Marketing is more than a concentration within a business major. More accurately, it describes a collection of skills that are useful in any career. As a professional discipline, marketing is a vital function of any business’ operation. It explores customer perceptions and journeys as primary sources of profit. It also utilizes various data to make smart and insightful business decisions.</p>
                                    <button className='Btn' id = 'ReadMorebtn'>Discover More</button>
                            </div>
                        <div className='coursecards'>
                        {loading ? <Skeleton /> : error ? 
                        <Error error = {error} /> :
                                                                    courses.length === 0 ?
                                <Empty /> :
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
                <TabPane tab="Self Dev" key='3'>
                        <div className='Tab_Content'>
                        <h2>Become a Markter</h2>
                            <div id = 'paragraphbtn'>
                                    <p>Marketing is more than a concentration within a business major. More accurately, it describes a collection of skills that are useful in any career. As a professional discipline, marketing is a vital function of any business’ operation. It explores customer perceptions and journeys as primary sources of profit. It also utilizes various data to make smart and insightful business decisions.</p>
                                    <button className='Btn' id = 'ReadMorebtn'>Discover More</button>
                            </div>
                        <div className = 'coursecards'>
                        {loading ? <Skeleton /> : error ? 
                        <Error error = {error}/> :
                                                                    courses.length === 0 ?
                                <Empty /> :
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
                <TabPane tab="Photography" key = '4'>
                        <div className='Tab_Content'>
                        <h2>Become a Photographer</h2>
                            <div id = 'paragraphbtn'>
                                    <p>Marketing is more than a concentration within a business major. More accurately, it describes a collection of skills that are useful in any career. As a professional discipline, marketing is a vital function of any business’ operation. It explores customer perceptions and journeys as primary sources of profit. It also utilizes various data to make smart and insightful business decisions.</p>
                                    <button className='Btn' id = 'ReadMorebtn'>Discover More</button>
                            </div>
                        <div className = 'coursecards'>
                        {loading ? <Skeleton /> : error ? 
                        <Error error = {error} /> :
                                                                    courses.length === 0 ?
                                <Empty /> :
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
                <TabPane tab="Music" key = '5'>
                        <div className='Tab_Content'>
                        <h2>Become a Musician</h2>

                            <div id = 'paragraphbtn'>
                                    <p>Marketing is more than a concentration within a business major. More accurately, it describes a collection of skills that are useful in any career. As a professional discipline, marketing is a vital function of any business’ operation. It explores customer perceptions and journeys as primary sources of profit. It also utilizes various data to make smart and insightful business decisions.</p>
                                    <button className='Btn' id = 'ReadMorebtn'>Discover More</button>
                            </div>
                        <div className = 'coursecards'>
                        </div>
                        {loading ? <Skeleton /> : error ? 
                        <Error error = {error} /> :
                                                                    courses.length === 0 ?
                                <Empty /> :
                                <Slider {...settings}>
                                        {courses.map((course, index) => (
                                                <>
                                                <CourseCard key={course._id} data-index={index} course={course}/>
                                                </>
                                        ))}                   
                                </Slider>
                                }
                        </div>
                </TabPane>
                <TabPane tab="Design" key = '6'>
                        <div className='Tab_Content'>
                        <h2>Become a Designer</h2>
                            <div id = 'paragraphbtn'>
                                    <p>Marketing is more than a concentration within a business major. More accurately, it describes a collection of skills that are useful in any career. As a professional discipline, marketing is a vital function of any business’ operation. It explores customer perceptions and journeys as primary sources of profit. It also utilizes various data to make smart and insightful business decisions.</p>
                                    <button className='Btn' id = 'ReadMorebtn'>Discover More</button>
                            </div>
                        <div className = 'coursecards'>
                        {loading ? <Skeleton /> : error ? 
                        <Error error = {error} /> :
                                                                    courses.length === 0 ?
                                <Empty /> :
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
                </section>
                <section className='Courses_Popular' ref={pobularref}>
                            <h2>Pobular Courses </h2>
                            <div className='coursecards'>
                                {loadingpobular ? <Skeleton /> : errorpobular ? 
                                <Error error = {errorpobular} /> :
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
                </section>
                <section className = 'Categorys_Popular'>
                            <h2>Pobular Categories</h2>
                            <div className='Categorycards'>
                                <CategoryCard title='Devlopement' image='https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80' />
                                <CategoryCard title='Design' image='https://images.unsplash.com/photo-1561070791-2526d30994b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80' />
                                <CategoryCard title='Marketing' image='https://images.unsplash.com/flagged/photo-1556514767-5c270b96a005?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=751&q=80' />
                                <CategoryCard title='Music' image='https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80' />
                                <CategoryCard title='Photography' image='https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80' />
                                <CategoryCard title='Self Dev' image='https://images.unsplash.com/photo-1571425046056-cfc17c664e57?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80' />
                                <CategoryCard title='Business' image='https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=755&q=80' />
                                <CategoryCard title = 'Education' image = 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80' />

                            </div>
                    </section>
                    <section className = 'Become_Teacher'>
                            <div className='background'>
                                    <img src='https://images.unsplash.com/photo-1544717305-2782549b5136?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80' alt='Teacher' />
                                    <div className = 'paragraph'>
                                    <h2>Become a Teacher with us</h2>
                                        <p>Do you have the skills and you want to share it with profit?</p>
                                        <button className = 'Btn' id = 'Joinusbtn'>Join Us</button>
                                    </div>
                            </div>
                    </section>


        </div>
    )
}

export default Home
