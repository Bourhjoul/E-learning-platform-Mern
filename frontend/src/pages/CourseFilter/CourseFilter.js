import React, { useState, useEffect } from "react";
import { BsFillPeopleFill, MdFilterList } from "react-icons/all";
import { Tabs, Pagination } from "antd";
import { Helmet } from "react-helmet";

import Slider from "react-slick";
import "./CourseFilter.css";
import { Link, useParams } from "react-router-dom";
import CourseCard from "../../components/CourseCard/CourseCard";

import CollapsibleFilter from "./CollapsibleFilter";
import { Empty, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  GetSubCategorys,
  Listcoursesbypobularity,
  ListcoursesbyTopic,
  ListnewCourses,
} from "../../redux/actions/courseActions";
import {
  GET_CRSRATING_RESET,
  GET_CRSPRICE_RESET,
} from "../../redux/constants/courseconstants";
import Coursesblock from "./Coursesblock";
import Error from "../../components/utils/Error";
const CourseFilter = ({ history }) => {
  const [page, setpage] = useState(1);
  const [isFilter, setIsFilter] = useState(false);
  const dispatch = useDispatch();
  const [optionValue, setOptionValue] = useState("");
  const ListCoursesReducer = useSelector((state) => state.ListCoursesReducer);
  const { loading, courses, totalcourses, error } = ListCoursesReducer;

  const GetSubCategorysReducer = useSelector(
    (state) => state.GetSubCategorysReducer
  );
  const {
    loading: loadingsubcg,
    Subcategorys,
    error: errorcg,
  } = GetSubCategorysReducer;

  const ListCoursesbyPobularityReducer = useSelector(
    (state) => state.ListCoursesbyPobularityReducer
  );
  const {
    loading: loadingpobular,
    courses: coursespobular,
    error: errorpobular,
  } = ListCoursesbyPobularityReducer;

  const ListCoursesbyrating = useSelector((state) => state.ListCoursesbyrating);
  const {
    loading: loadingRate,
    courses: coursesRate,
    error: errorRate,
  } = ListCoursesbyrating;

  const ListCoursesbyprice = useSelector((state) => state.ListCoursesbyprice);
  const {
    loading: loadingPrice,
    courses: coursesPrice,
    error: errorPrice,
  } = ListCoursesbyprice;

  const ListNewCoursesReducer = useSelector(
    (state) => state.ListNewCoursesReducer
  );
  const {
    loading: loadingNew,
    courses: coursesNew,
    error: errorNew,
  } = ListNewCoursesReducer;

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

  let { topic } = useParams();
  const changeTab = (key) => {
    switch (key) {
      case "1":
        dispatch(Listcoursesbypobularity(topic));
        break;
      case "2":
        dispatch(ListnewCourses(topic));
        break;
      default:
        break;
    }
  };
  const handleClear = () => {
    dispatch({ type: GET_CRSRATING_RESET });
    dispatch({ type: GET_CRSPRICE_RESET });
  };
  useEffect(() => {
    dispatch(GetSubCategorys(topic));
    dispatch({ type: GET_CRSRATING_RESET });
    dispatch({ type: GET_CRSPRICE_RESET });
    dispatch(Listcoursesbypobularity(topic));
    dispatch(ListcoursesbyTopic(topic, true, page));
    return () => {};
  }, [dispatch, topic, page, history]);
  if (!loading && totalcourses === 0) {
    history.push("/notfound");
  }

  return (
    <div className="cartPage">
      <Helmet>
        <title>{topic} Courses</title>
      </Helmet>
      <div className="courseSurSujet">
        <h1>{topic.charAt(0).toUpperCase() + topic.slice(1)} Courses</h1>
        <h3>
          {topic} relates to <Link to="/">{topic}, </Link>
          <Link to="/">IT & Software</Link>
        </h3>
        <p>
          <BsFillPeopleFill className="iconPeople" color="#848482" size="18" />{" "}
          9 000 002 learners
        </p>
      </div>
      <div className="coursePourCommencer">
        <h2>Courses to get you started</h2>
        <Tabs size="large" defaultActiveKey="1" onTabClick={changeTab}>
          <TabPane tab="Most popular" key="1">
            <div className="TabContent">
              <div className="coursecards">
                {loadingpobular ? (
                  <Skeleton />
                ) : errorpobular ? (
                  <Error error={errorpobular} />
                ) : coursespobular.length === 0 ? (
                  <Empty />
                ) : (
                  <Slider {...settings}>
                    {coursespobular.map((course, index) => (
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
          <TabPane tab="New" key="2">
            <div className="TabContent">
              <div className="coursecards">
                {loadingNew ? (
                  <Skeleton />
                ) : errorNew ? (
                  <Error error={errorNew} />
                ) : coursesNew.length === 0 ? (
                  <Empty />
                ) : (
                  <Slider {...settings}>
                    {coursesNew.map((course, index) => (
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

      <div className="courseOfSite">
        <h2>{topic.charAt(0).toUpperCase() + topic.slice(1)} students also learn</h2>
        <div className="courseOfSiteSlider">
          {loadingsubcg ? (
            <Skeleton />
          ) : errorcg ? (
            <Error error={errorcg} />
          ) : Subcategorys.length === 0 ? (
            <Empty />
          ) : (
            Subcategorys.map((sub) => (
              <div data-index="0">
                <Link to={`/subcategory/${sub}`}>{sub}</Link>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="filterCourses">
        <br></br>
        <div>
          <h2>All {topic.charAt(0).toUpperCase() + topic.slice(1)} courses</h2>
          <div className="fl-btn">
            <button
              className="filterButton"
              onClick={() => setIsFilter(!isFilter)}
            >
              <MdFilterList size="22" className="filterIcon" />
              Filter
            </button>
            <button className="clearFiltersBtn" onClick={() => handleClear()}>
              Most Popular
            </button>
          </div>
        </div>

        <div className="filterHere">
          <div>
            <div className={`filterBy ${isFilter ? "filterr" : "filterroff"}`}>
              <CollapsibleFilter title="Ratings" value="1" />
              <CollapsibleFilter title="Price" value="2" />
            </div>

            <div className="teacherUdemy">
              <h2>Teach the world online</h2>
              <p>
                Create an online video course, reach students across the globe,
                and earn money
              </p>
              <button className="teachOnUdemy">Teach on Udemy</button>
            </div>
          </div>
          <div className="coursesVideos">
            {loading || loadingRate || loadingPrice ? (
              <Skeleton />
            ) : error || errorRate || errorPrice ? (
              <Error error={error} />
            ) : courses.length === 0 ? (
              <Empty />
            ) : coursesRate ? (
              coursesRate.map((course, index) => (
                <Coursesblock
                  key={course._id}
                  data-index={index}
                  course={course}
                />
              ))
            ) : coursesPrice ? (
              coursesPrice.map((course, index) => (
                <Coursesblock
                  key={course._id}
                  data-index={index}
                  course={course}
                />
              ))
            ) : (
              courses.map((course, index) => (
                <Coursesblock
                  key={course._id}
                  data-index={index}
                  course={course}
                />
              ))
            )}
            <Pagination
              pageSize="8"
              current={page}
              onChange={(current) => setpage(current)}
              total={totalcourses}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseFilter;
