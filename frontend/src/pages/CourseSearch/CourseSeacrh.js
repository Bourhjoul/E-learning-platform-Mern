import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Pagination, Skeleton, Empty } from "antd";
import Error from "../../components/utils/Error";
import Coursesblock from "../CourseFilter/Coursesblock";
import { ListcoursesSearched } from "../../redux/actions/courseActions";
import { ArrowLeftOutlined } from "@ant-design/icons";
const CourseSeacrh = ({ history }) => {
  const [page, setpage] = useState(1);
  let { keyword } = useParams();
  const dispatch = useDispatch();
  const listCourseSearchedreducer = useSelector(
    (state) => state.listCourseSearchedreducer
  );
  const { loading, courses, totalcourses, error } = listCourseSearchedreducer;
  useEffect(() => {
    dispatch(ListcoursesSearched(keyword, page));
    return () => {};
  }, [dispatch, keyword, page]);
  return (
    <div className="subcg_container">
      <Helmet>
        <title>{keyword} Results</title>
      </Helmet>
      <Button
        className="btn-back"
        onClick={() => history.goBack()}
        size="middle"
        type="primary"
        shape="round"
        icon={<ArrowLeftOutlined />}
      >
        Go Back
      </Button>
      <h2>Find "{keyword}" Courses</h2>
      {loading ? (
        <Skeleton />
      ) : error ? (
        <Error error={error} />
      ) : courses.length === 0 ? (
        <Empty />
      ) : (
        courses.map((course, index) => (
          <Coursesblock key={course._id} data-index={index} course={course} />
        ))
      )}
      <Pagination
        pageSize="8"
        current={page}
        onChange={(current) => setpage(current)}
        total={totalcourses}
      />
    </div>
  );
};

export default CourseSeacrh;
