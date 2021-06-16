import React, { useState, useEffect } from "react";
import { BsFillPeopleFill, MdFilterList } from "react-icons/all";
import { Tabs, Pagination } from "antd";
import Slider from "react-slick";
import "./CourseFilter.css";
import { Link, useParams } from "react-router-dom";
import CourseCard from "../../components/CourseCard/CourseCard";

import CollapsibleFilter from "./CollapsibleFilter";
import { Skeleton } from "antd";
import { Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  GetSubCategorys,
  Listcoursesbypobularity,
  ListcoursesbyTopic,
  ListnewCourses,
} from "../../redux/actions/courseActions";
import Coursesblock from "./Coursesblock";
import Error from "../../components/utils/Error";
const CourseFilter = ({ history }) => {
  const [page, setpage] = useState(1);
  const [isFilter, setIsFilter] = useState(false);
  const dispatch = useDispatch();
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
  useEffect(() => {
    dispatch(GetSubCategorys(topic));
    dispatch(Listcoursesbypobularity(topic));
    dispatch(ListcoursesbyTopic(topic, true, page));
    return () => {};
  }, [dispatch, topic, page, history]);
  if (!loading && totalcourses === 0) {
    history.push("/notfound");
  }
  return (
    <div className="cartPage">
      <div className="courseSurSujet">
        <h1>{topic} Courses</h1>
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
        <h2>{topic} students also learn</h2>
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
          <h2>All Web Development courses</h2>
          <button
            className="filterButton"
            onClick={() => setIsFilter(!isFilter)}
          >
            <MdFilterList size="22" className="filterIcon" />
            Filter
          </button>
          <select className="filterButton">
            <option>Most Popular</option>
            <option>Highest Rated</option>
            <option>Newest</option>
          </select>
          <button className="clearFiltersBtn">Clear</button>
        </div>

        <div className="filterHere">
          <div>
            <div className={`filterBy ${isFilter ? "filterr" : "filterroff"}`}>
              <CollapsibleFilter title="Ratings" value="1" />
              <CollapsibleFilter title="Topic" value="2" />
              <CollapsibleFilter title="Subcategory" value="3" />

              <CollapsibleFilter title="Price" value="4" />
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
            {loading ? (
              <Skeleton />
            ) : error ? (
              <Error error={error} />
            ) : courses.length === 0 ? (
              <Empty />
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
