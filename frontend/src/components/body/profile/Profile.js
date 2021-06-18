import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isMatch, isLength } from "../../utils/validation/Validation";
import Coursesblock from "../../../pages/CourseFilter/Coursesblock";
import { Helmet } from "react-helmet";
import { Radio } from "antd";
import { Popconfirm, message } from "antd";

import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notification/Notification";
import {
  fetchAllUsers,
  dispatchGetAllUsers,
  dispatchGetAllUsersRequest,
} from "../../../redux/actions/usersAction";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import {
  COURSE_CREATE_RESET,
  COURSE_UPDATE_RESET,
} from "../../../redux/constants/courseconstants";

import "./profile.css";
import { Table, Button, Input, Empty, Pagination, Skeleton } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  RetweetOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";

import {
  listMyCourses,
  DeleteCourse,
  CreateCourse,
  listCoursespurshased,
  listAllCourses,
} from "../../../redux/actions/courseActions";
import { Link } from "react-router-dom";
import Error from "../../utils/Error";
import { listOrders } from "../../../redux/actions/orderActions";
const { Column } = Table;
const Profile = ({ history }) => {
  let ordersarray = [];

  const [Radiogrp, setRadiogrp] = useState("Users");
  const [page, setpage] = useState(1);
  const [size, setSize] = useState("small");
  const initialState = {
    name: "",
    email: "",
    description: "",
    headline: "",
    password: "",
    cf_password: "",
  };
  const [avatar, setAvatar] = useState(false);
  const [data, setData] = useState(initialState);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const ListAllCoursesReducer = useSelector(
    (state) => state.ListAllCoursesReducer
  );
  const {
    loading: loadingAdmin,
    courses: coursesAdmin,
    error: errorAdmin,
  } = ListAllCoursesReducer;
  const orderList = useSelector((state) => state.orderList);
  const { loading: loadingOrders, orders, error: errorOrders } = orderList;
  const handleRadioChange = (e) => {
    setRadiogrp(e.target.value);
    switch (e.target.value) {
      case "Users":
        dispatch(dispatchGetAllUsersRequest());
        fetchAllUsers(token).then((res) => {
          dispatch(dispatchGetAllUsers(res));
        });
        break;
      case "Courses":
        dispatch(listAllCourses());
        break;
      case "Orders":
        dispatch(listOrders());

        break;
      default:
        break;
    }
  };
  if (!loadingOrders && !errorOrders) {
    ordersarray = orders.map((order) => ({
      _id: order._id,
      country: order.countryCustomer.country,
      isPaid: order.isPaid,
      totalPrice: order.totalPrice,
      user: order.user.name,
      paymentMethod: order.paymentMethod,
    }));
  }
  const {
    name,
    email,
    password,
    cf_password,
    err,
    success,
    description,
    headline,
  } = data;
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const usersInfo = useSelector((state) => state.usersInfo);
  const { loadingtab, users } = usersInfo;
  const [callback, setCallback] = useState(false);
  const ListMyCoursesReducer = useSelector(
    (state) => state.ListMyCoursesReducer
  );
  const { loading, courses, error } = ListMyCoursesReducer;
  const courseUpdateReducer = useSelector((state) => state.courseUpdateReducer);
  const {
    loading: lodingUpdate,
    error: errorUpdate,
    success: succUpdate,
  } = courseUpdateReducer;
  const courseDeleteReducer = useSelector((state) => state.courseDeleteReducer);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: succDelete,
  } = courseDeleteReducer;

  const courseCreateReducer = useSelector((state) => state.courseCreateReducer);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    course: createdcourse,
  } = courseCreateReducer;

  const listCoursespurshasedreducer = useSelector(
    (state) => state.listCoursespurshasedreducer
  );
  const {
    loading: loadingstudent,
    courses: coursesstudent,
    totalcourses,
    error: errorstudent,
  } = listCoursespurshasedreducer;
  const { isLogged, user, isAdmin } = auth;
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAdmin) {
      dispatch(dispatchGetAllUsersRequest());
      fetchAllUsers(token).then((res) => {
        dispatch(dispatchGetAllUsers(res));
      });
      dispatch(listAllCourses());
    }
    if (successCreate) {
      history.push(`/editcourse/${createdcourse._id}`);
    }
    if (user.Teacher) {
      dispatch(listMyCourses());
    }
    if (!user.Teacher && !isAdmin) {
      dispatch(listCoursespurshased(page));
    }
  }, [
    token,
    auth,
    history,
    dispatch,
    successCreate,
    callback,
    user.Teacher,
    succDelete,
    page,
  ]);

  /* user fun */
  const handleChange = async (e) => {
    setData({ ...data, [e.target.name]: e.target.value, err: "", success: "" });
  };
  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file)
        return setData({
          ...data,
          err: "No files were uploaded.",
          success: "",
        });

      if (file.size > 1024 * 1024)
        return setData({ ...data, err: "Size too large.", success: "" });

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return setData({
          ...data,
          err: "File format is incorrect.",
          success: "",
        });

      let formData = new FormData();
      formData.append("file", file);

      setLoadingUsers(true);
      const res = await axios.post("/api/upload_avatar", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      setLoadingUsers(false);
      setAvatar(res.data.url);
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const updateInfor = () => {
    try {
      axios.put(
        "/user/update",
        {
          name: name,
          avatar: avatar,
          description: description,
          headline: headline,
        },
        {
          headers: { Authorization: token },
        }
      );
      setData({ ...data, err: "", success: "Update success !" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };
  const updatePassword = () => {
    if (isLength(password))
      return setData({
        ...data,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setData({ ...data, err: "Password did not match", success: "" });

    try {
      axios.post(
        "/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );
      setData({ ...data, err: "", success: "Updated Success!" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };
  const handleUpdate = () => {
    updateInfor();
    if (password) updatePassword();
  };
  const handleDelete = async (id) => {
    try {
      if (user._id !== id) {
        setLoadingUsers(true);
        await axios.delete(`/user/delete/${id}`, {
          headers: { Authorization: token },
        });
        setLoadingUsers(false);
        setCallback(!callback);
        message.success("Account deleted");
      }
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  /* course fun */
  const handleDeleteCrs = (id) => {
    dispatch(DeleteCourse(id));
    message.success("Course Deleted");
  };

  const createCoursehandler = () => {
    dispatch(CreateCourse());
  };

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
      </div>
      <div className="profile-page">
        <div className="col-left">
          <h2>
            {isAdmin
              ? "Admin Profile"
              : !user.Teacher
              ? "User Profile"
              : user.Teacher && "Teacher Profile"}
          </h2>
          {loadingUsers && (
            <div className="loading">
              <HashLoader color={"#1e1e2c"} loading={loadingUsers} size={40} />
            </div>
          )}
          <div className={loadingUsers ? "disable-avatar" : "avatar"}>
            <img alt="profile_pic" src={avatar ? avatar : user.avatar} />
            <span>
              <i className="fas fa-camera"></i>
              <p>Change</p>
              <input
                type="file"
                name="file"
                id="file_up"
                onChange={changeAvatar}
              />
            </span>
          </div>
          <div>
            <em style={{ color: "crimson" }}>
              *Chose your picture then click update to apply the change
            </em>
          </div>

          <label>Name </label>
          <input
            type="text"
            name="name"
            defaultValue={user.name}
            placeholder="Your name"
            onChange={handleChange}
          />

          <label>Email </label>
          <Input
            type="text"
            name="email"
            value={user.email}
            placeholder="Your email address"
            disabled
          />
          {user.Teacher && (
            <div className="textarea">
              <label>Discription </label>
              <textarea
                name="description"
                placeholder="Your Desc"
                onChange={handleChange}
                required
              >
                {user.description}
              </textarea>
              <label>Headline </label>
              <input
                type="text"
                name="headline"
                defaultValue={user.headline}
                placeholder="Your headline"
                onChange={handleChange}
              />
            </div>
          )}
          <div className="form-group">
            <label>New Password </label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Your password"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password </label>
            <input
              type="password"
              name="cf_password"
              value={cf_password}
              placeholder="Confirm password"
              onChange={handleChange}
            />
          </div>
          <>
            <Button
              className="btn-update-profile"
              disabled={loadingUsers}
              shape="round"
              onClick={handleUpdate}
              size="middle"
              type="primary"
            >
              Update <RetweetOutlined />
            </Button>
          </>
        </div>
        <div className="col-right">
          <h2>
            {isAdmin ? (
              <Radio.Group value={Radiogrp} onChange={handleRadioChange}>
                <Radio.Button value="Users">Users</Radio.Button>
                <Radio.Button value="Courses">Courses</Radio.Button>
                <Radio.Button value="Orders">Orders</Radio.Button>
              </Radio.Group>
            ) : (
              "My Courses"
            )}
          </h2>
          {loadingtab || loadingAdmin || loadingOrders ? (
            <Skeleton active />
          ) : isAdmin ? (
            Radiogrp === "Users" ? (
              <Table dataSource={users}>
                <Column title="Id" dataIndex="_id" key="_id" />
                <Column title="Name" dataIndex="name" />
                <Column title="Email" dataIndex="email" />
                <Column
                  title="Admin"
                  dataIndex="role"
                  key="role"
                  render={(role) => (
                    <span>
                      {role === 1 ? (
                        <div className="admin">YES</div>
                      ) : (
                        <div className="notadmin">NO</div>
                      )}
                    </span>
                  )}
                />
                <Column
                  title="Action"
                  dataIndex="_id"
                  key="_id"
                  render={(_id) => (
                    <span>
                      <Link to={`/edit_user/${_id}`}>
                        <Button
                          className="btn-edit"
                          type="primary"
                          shape="round"
                          icon={<EditOutlined />}
                          size={size}
                        >
                          edit
                        </Button>
                      </Link>
                      <Button
                        className="btn-delete"
                        type="danger"
                        shape="round"
                        icon={<DeleteOutlined />}
                        size={size}
                      >
                        <Popconfirm
                          title="Are you sure to delete this Course?"
                          onConfirm={() => handleDelete(_id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          delete
                        </Popconfirm>
                      </Button>
                    </span>
                  )}
                />
              </Table>
            ) : Radiogrp === "Courses" ? (
              <Table dataSource={coursesAdmin}>
                <Column title="Name" dataIndex="name" key="_id" />
                <Column title="Price" dataIndex="price" key="price" />
                <Column title="Category" dataIndex="category" />
                <Column title="Number of students" dataIndex="numStudents" />
                <Column title="Rating" dataIndex="rating" key="rating" />
                <Column
                  title="Action"
                  dataIndex="_id"
                  key="_id"
                  render={(_id) => (
                    <span>
                      <Link to={`/editcourse/${_id}`}>
                        <Button
                          className="btn-edit"
                          type="primary"
                          shape="round"
                          icon={<EditOutlined />}
                          size="small"
                        >
                          EDIT
                        </Button>
                      </Link>
                      <Button
                        className="btn-delete"
                        type="danger"
                        shape="round"
                        icon={<DeleteOutlined />}
                        size={size}
                      >
                        <Popconfirm
                          title="Are you sure to delete this Course?"
                          onConfirm={() => handleDeleteCrs(_id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          delete
                        </Popconfirm>
                      </Button>
                    </span>
                  )}
                />
              </Table>
            ) : (
              Radiogrp === "Orders" && (
                <Table dataSource={ordersarray}>
                  <Column title="user" dataIndex="user" key="user" />
                  <Column title="_id" dataIndex="_id" key="_id" />
                  <Column
                    title="totalPrice"
                    dataIndex="totalPrice"
                    key="totalPrice"
                  />
                  <Column
                    title="isPaid"
                    dataIndex="isPaid"
                    key="isPaid"
                    render={(isPaid) => (
                      <span>
                        {isPaid ? (
                          <div className="admin">YES</div>
                        ) : (
                          <div className="notadmin">NO</div>
                        )}
                      </span>
                    )}
                  />
                  <Column title="paymentMethod" dataIndex="paymentMethod" />
                  <Column title="country" dataIndex="country" key="country" />
                </Table>
              )
            )
          ) : loading ? (
            <Skeleton active />
          ) : error ? (
            <Error error={error} />
          ) : user.Teacher ? (
            <>
              {loadingDelete || loadingCreate ? (
                <div className="loading">
                  <HashLoader
                    color={"#1e1e2c"}
                    loading={loadingDelete || loadingCreate}
                    size={40}
                  />
                </div>
              ) : error || errorDelete || errorCreate ? (
                <h1>{error || errorDelete || errorCreate}</h1>
              ) : (
                <>
                  <div className="btn-add">
                    <Button
                      className="btn-update-profile"
                      onClick={createCoursehandler}
                      type="primary"
                      shape="round"
                      icon={<FolderAddOutlined />}
                      size="large"
                    >
                      add
                    </Button>
                  </div>
                  <Table dataSource={courses}>
                    <Column title="Name" dataIndex="name" key="_id" />
                    <Column title="Price" dataIndex="price" key="price" />
                    <Column title="Category" dataIndex="category" />
                    <Column
                      title="Number of students"
                      dataIndex="numStudents"
                    />
                    <Column title="Rating" dataIndex="rating" key="rating" />
                    <Column
                      title="Action"
                      dataIndex="_id"
                      key="_id"
                      render={(_id) => (
                        <span>
                          <Link to={`/editcourse/${_id}`}>
                            <Button
                              className="btn-edit"
                              type="primary"
                              shape="round"
                              icon={<EditOutlined />}
                              size="small"
                            >
                              EDIT
                            </Button>
                          </Link>
                          <Button
                            className="btn-delete"
                            type="danger"
                            shape="round"
                            icon={<DeleteOutlined />}
                            size={size}
                          >
                            <Popconfirm
                              title="Are you sure to delete this Course?"
                              onConfirm={() => handleDeleteCrs(_id)}
                              okText="Yes"
                              cancelText="No"
                            >
                              delete
                            </Popconfirm>
                          </Button>
                        </span>
                      )}
                    />
                  </Table>
                </>
              )}
            </>
          ) : loadingstudent ? (
            <Skeleton />
          ) : errorstudent ? (
            <Error error={errorstudent} />
          ) : coursesstudent.length === 0 ? (
            <Empty />
          ) : (
            <>
              {coursesstudent.map((course, index) => (
                <Coursesblock
                  key={course._id}
                  data-index={index}
                  course={course}
                />
              ))}
              <Pagination
                pageSize="5"
                current={page}
                onChange={(current) => setpage(current)}
                total={totalcourses}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
