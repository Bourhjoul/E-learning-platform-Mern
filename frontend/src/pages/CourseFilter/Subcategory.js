import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetCoursesbysubcg } from "../../redux/actions/courseActions";
import Coursesblock from "./Coursesblock";
import { Helmet } from "react-helmet";

import { Button, Skeleton, Pagination } from "antd";
import { Empty } from "antd";
import Error from "../../components/utils/Error";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Subcategory = ({ history }) => {
  const [page, setpage] = useState(1);
  const dispatch = useDispatch();
  const Coursesbysubcg = useSelector((state) => state.GetCoursesbysubcg);
  const { loading, courses, totalcourses, error } = Coursesbysubcg;
  let { subcategory } = useParams();
  useEffect(() => {
    dispatch(GetCoursesbysubcg(subcategory, page));
    return () => {};
  }, [dispatch, subcategory, page]);
  return (
    <div className="subcg_container">
      <Helmet>
        <title>{subcategory}</title>
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
      <h2>{subcategory} Courses</h2>
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

export default Subcategory;
