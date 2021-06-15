import React,{useEffect} from 'react'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Pagination,Skeleton,Empty } from "antd";
import Error from "../../components/utils/Error";
import Slider from "react-slick";
import {ListcoursesSearched} from "../../redux/actions/courseActions";
  import CourseCard from "../../components/CourseCard/CourseCard";
const CourseSeacrh = () => {
    const { TabPane } = Tabs;
    var settings = {
      dots: false,
      infinite: true,
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
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
            arrows: false,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    };
    let { keyword } = useParams();
    const dispatch = useDispatch();
    const listCourseSearchedreducer = useSelector((state) => state.listCourseSearchedreducer);
    const { loading, courses,  error } = listCourseSearchedreducer;
    const changeTab = (key) => {
        switch (key) {
          case "1":
            dispatch(ListcoursesSearched(keyword))
            break;
          case "2":
            
            break;
          default:
            break;
        }
    }
    useEffect(() => {
        dispatch(ListcoursesSearched(keyword))
        return () => { };
    }, [dispatch,keyword]);
    return (
            <div className="cartPage">
      <div className="courseSurSujet">
             <h1>Find "{keyword}" Courses</h1>
             <Tabs size="large" defaultActiveKey="1" onTabClick={changeTab}>
          <TabPane tab="Most popular" key="1">
            <div className="TabContent">
              <div className="coursecards">
                {loading ? (
                  <Skeleton />
                ) : error ? (
                  <Error error={error} />
                ) : courses.length === 0 ? (
                  <Empty />
                ) : (
                  <Slider {...settings}>
                    {courses.map((course, index) => (
                      <>
                        <CourseCard
                          key={course._id}
                          data-index={index}
                          course={course}
                        />
                      </>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
          </TabPane>
          </Tabs>

        </div>
        </div>
    )
}

export default CourseSeacrh
