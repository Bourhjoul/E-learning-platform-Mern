import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import { Card, Table, Skeleton, Button, message, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  Getcoursedetails,
  UpdateCourse,
  listMyCourses,
} from "../../../redux/actions/courseActions";
import { useParams } from "react-router";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notification/Notification";
import {
  COURSE_CREATE_RESET,
  COURSE_UPDATE_RESET,
  MY_COURSES_RESET,
} from "../../../redux/constants/courseconstants";
import {
  EditOutlined,
  DeleteOutlined,
  RetweetOutlined,
  ArrowLeftOutlined,
  UserOutlined,
} from "@ant-design/icons";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";

import "./editcourse.css";
import { produce } from "immer";
import { Tabs } from "antd";
import update from "immutability-helper";
const { TabPane } = Tabs;
const initialState = {
  name: "",
  category: "",
  price: "",
  shortdescription: "",
  user_name: "",
  description: "",
  image: "",
  user_headline: "",
};
const initialStateContent = {
  name: "",
  lectures: [{ link: "", name: " " }],
};
const EditCourse = ({ history }) => {
  const [image, setImage] = useState(false);
  const [display, setDisplay] = useState(false);
  const [goals, setGoals] = useState([""]);
  const [audience, setAudience] = useState([""]);
  const [Prerequisites, setPrerequisites] = useState([""]);
  const [subcategorys, setSubcategorys] = useState([""]);
  const [content, setContent] = useState([initialStateContent]);

  const [lecture, setLectu] = useState({
    link: " ",
    name: " ",
  });

  const [data, setData] = useState(initialState);
  const { name, price, category, description, shortdescription } = data;
  const [err, setError] = useState("");

  const [editCourse, setEditCourse] = useState([]);

  const [loading, setLoading] = useState(false);
  const handleChange = async (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [size, setSize] = useState("middle");

  const dispatch = useDispatch();
  const { id } = useParams();

  const courseUpdateReducer = useSelector((state) => state.courseUpdateReducer);
  const {
    loading: lodingUpdate,
    error: errorUpdate,
    success: succUpdate,
  } = courseUpdateReducer;
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const token = useSelector((state) => state.token);

  const [loadingImage, setLoadingImage] = useState(false);
  const [LoadingAddLect, setLoadingAddLect] = useState(false);

  const ListMyCoursesReducer = useSelector(
    (state) => state.ListMyCoursesReducer
  );
  const { courses, loading: loadingMycrss } = useSelector(
    (state) => state.ListMyCoursesReducer
  );
  const GetCourseDetailsReducer = useSelector(
    (state) => state.GetCourseDetailsReducer
  );
  const { course, loading: loadingcrs } = useSelector(
    (state) => state.GetCourseDetailsReducer
  );

  const handleUpdate = () => {
    if (content.length === 0) {
      message.error("You must add some content to the course.");
    } else {
      dispatch(
        UpdateCourse({
          _id: editCourse._id,
          name,
          price,
          goals,
          category,
          image,
          Prerequisites,
          description,
          audience,
          subcategorys,
          content,
          shortdescription,
        })
      );
    }
  };
  useEffect(() => {
    if (succUpdate) {
      dispatch({ type: COURSE_CREATE_RESET });
      dispatch({ type: COURSE_UPDATE_RESET });
      history.push(`/courses/${id}`);
    } else {
      if (!course.name || course._id !== id) {
        dispatch(Getcoursedetails(id));
      } else {
        setLoading(true);
        setEditCourse(course);
        setLoading(false);
        setAudience(course.audience);
        setGoals(course.goals);
        setPrerequisites(course.Prerequisites);
        setSubcategorys(course.subcategorys);

        setContent(course.content);
        console.log(course.content);
      }
    }
  }, [id, history, succUpdate, course, dispatch]);
  const handleaddlect = (cont, index) => {
    let newlect = [{ link: "", name: " " }];
    const newlects = update(content[index].lectures, { $push: newlect });
    const newcontent = update(content[index], { lectures: { $set: newlects } });

    let newcontents = update(content, { $splice: [[index, 1, newcontent]] });
    setContent(newcontents);
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

      setLoadingImage(true);
      const res = await axios.post("/api/upload_crsimage", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      setLoadingImage(false);
      setImage(res.data.url);
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };
  const goback = () => {
    dispatch({ type: COURSE_CREATE_RESET });
    dispatch({ type: COURSE_UPDATE_RESET });
    history.push("/profile");
  };
  return (
    <>
      <Helmet>
        <title>EDIT COURSE</title>
      </Helmet>
      {succUpdate && showSuccessMsg(succUpdate)}
      {errorUpdate && showSuccessMsg(errorUpdate)}
      {loadingcrs ? (
        <div className="loading">
          <HashLoader color={"#1e1e2c"} loading={loadingcrs} size={40} />
        </div>
      ) : (
        <div className="edit-course-page">
          <div className="wrapper">
            <div>
              <div className="inner-wrapper">
                <div className="inner-wrapper-image">
                  <div className="btn-crs">
                    <Button
                      className="btn-back"
                      onClick={goback}
                      size={size}
                      type="primary"
                      shape="round"
                      icon={<ArrowLeftOutlined />}
                    >
                      Go Back
                    </Button>
                    <Popconfirm
                      title="Are you sure fiiled all fields?"
                      onConfirm={handleUpdate}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button shape="round" size="middle" type="primary">
                        Update <RetweetOutlined />
                      </Button>
                    </Popconfirm>
                  </div>
                  {loadingImage && (
                    <div className="loading">
                      <HashLoader
                        color={"#1e1e2c"}
                        loading={loadingImage}
                        size={40}
                      />
                    </div>
                  )}

                  <h2>Edit Course</h2>
                  <div className={loadingImage ? "disable-avatar" : "avatar"}>
                    <img src={image ? image : editCourse.image} />
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
                  <a>
                    {" "}
                    <p>
                      {" "}
                      *Please Chose your picture with width: 1920, height: 1280
                      for better experience ,click update to apply the change{" "}
                    </p>{" "}
                  </a>
                </div>
                <div className="inner-wrapper-form">
                  <div className="form-group-left">
                    <label>Name </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={editCourse.name}
                      placeholder="Title"
                      onChange={handleChange}
                      required
                    />

                    <label>Price </label>
                    <input
                      type="number"
                      name="price"
                      defaultValue={editCourse.price}
                      placeholder="Price"
                      onChange={handleChange}
                      required
                    />

                    <label>Category </label>
                    <input
                      type="text"
                      name="category"
                      defaultValue={editCourse.category}
                      placeholder="Category"
                      onChange={handleChange}
                      required
                    />
                    <label>Description </label>
                    <textarea
                      name="description"
                      defaultValue={editCourse.description}
                      placeholder="Description"
                      onChange={handleChange}
                      required
                    >
                      {editCourse.description}
                    </textarea>
                    <label>shortdescription </label>
                    <input
                      type="text"
                      name="shortdescription"
                      defaultValue={editCourse.shortdescription}
                      placeholder="Your Category"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group-center">
                    <Tabs defaultActiveKey="1" centered>
                      <TabPane tab="Audience" key="1">
                        <h2>Edit Audience</h2>
                        <Button
                          className="btn-add-item"
                          type="primary"
                          onClick={() => {
                            setAudience((currentAudience) => [
                              ...currentAudience,
                              "Audience",
                            ]);
                          }}
                        >
                          Add New
                        </Button>
                        {audience.map((audi, index) => (
                          <div key={index}>
                            <input
                              placeholder="audience"
                              defaultValue={Object.values(audi).join("")}
                              onChange={(e) => {
                                setAudience((currentAudience) =>
                                  produce(currentAudience, (v) => {
                                    v[index] = e.target.value;
                                  })
                                );
                              }}
                            />
                            <Button
                              icon={<DeleteOutlined />}
                              type="danger"
                              onClick={() => {
                                setAudience((currentAudience) =>
                                  currentAudience.filter((x) => x !== audi)
                                );
                              }}
                            ></Button>
                          </div>
                        ))}
                      </TabPane>
                      <TabPane tab="Goals" key="2">
                        <h2>Edit Goals</h2>
                        <Button
                          className="btn-add-item"
                          type="primary"
                          onClick={() => {
                            setGoals((currentGoals) => [
                              ...currentGoals,
                              "GOAL",
                            ]);
                          }}
                        >
                          Add Goal
                        </Button>
                        {goals.map((goal, index) => (
                          <div key={index}>
                            <input
                              placeholder="goal"
                              defaultValue={Object.values(goal).join("")}
                              onChange={(e) => {
                                setGoals((currentGoals) =>
                                  produce(currentGoals, (v) => {
                                    v[index] = e.target.value;
                                  })
                                );
                              }}
                            />
                            <Button
                              icon={<DeleteOutlined />}
                              type="danger"
                              onClick={() => {
                                setGoals((currentGoals) =>
                                  currentGoals.filter((x) => x !== goal)
                                );
                              }}
                            ></Button>
                          </div>
                        ))}
                      </TabPane>
                      <TabPane tab="Prerequisites" key="3">
                        <h2>Edit Prerequisites</h2>
                        <Button
                          className="btn-add-item"
                          type="primary"
                          onClick={() => {
                            setPrerequisites((currentPrerequisites) => [
                              ...currentPrerequisites,
                              "Prerequisites",
                            ]);
                          }}
                        >
                          Add Prerequisite
                        </Button>
                        {Prerequisites.map((Prerequisite, index) => (
                          <div key={index}>
                            <input
                              placeholder="Prerequisite"
                              defaultValue={Object.values(Prerequisite).join(
                                ""
                              )}
                              onChange={(e) => {
                                setPrerequisites((currentPrerequisites) =>
                                  produce(currentPrerequisites, (v) => {
                                    v[index] = e.target.value;
                                  })
                                );
                              }}
                            />
                            <Button
                              icon={<DeleteOutlined />}
                              type="danger"
                              onClick={() => {
                                setPrerequisites((currentPrerequisites) =>
                                  currentPrerequisites.filter(
                                    (x) => x !== Prerequisite
                                  )
                                );
                              }}
                            ></Button>
                          </div>
                        ))}
                      </TabPane>
                      <TabPane tab="subcategorys" key="4">
                        <h2>Edit SubCategorys</h2>
                        <Button
                          className="btn-add-item"
                          type="primary"
                          onClick={() => {
                            setSubcategorys((currentSubcategorys) => [
                              ...currentSubcategorys,
                              "subcategory",
                            ]);
                          }}
                        >
                          Add SubCategory
                        </Button>
                        {subcategorys.map((subcategory, index) => (
                          <div key={index}>
                            <input
                              placeholder="subcategory"
                              defaultValue={Object.values(subcategory).join("")}
                              onChange={(e) => {
                                setSubcategorys((currentSubcategorys) =>
                                  produce(currentSubcategorys, (v) => {
                                    v[index] = e.target.value;
                                  })
                                );
                              }}
                            />
                            <Button
                              icon={<DeleteOutlined />}
                              type="danger"
                              onClick={() => {
                                setSubcategorys((currentSubcategorys) =>
                                  currentSubcategorys.filter(
                                    (x) => x !== subcategory
                                  )
                                );
                              }}
                            ></Button>
                          </div>
                        ))}
                      </TabPane>
                      <TabPane tab="content" key="5">
                        <div className="form-group-right">
                          <Button
                            className="btn-add-item"
                            type="primary"
                            onClick={() => {
                              setContent((currentContent) => [
                                ...currentContent,
                                {
                                  name: "Section",
                                  lectures: [
                                    { link: "Link", name: "Lecture" },
                                    { link: "Link", name: "Lecture" },
                                    { link: "Link", name: "Lecture" },
                                  ],
                                },
                              ]);
                            }}
                          >
                            Add New Content
                          </Button>

                          <Tabs defaultActiveKey="1">
                            {content &&
                              content.map((cont, index) => (
                                <TabPane
                                  tab={`Content :${index + 1}`}
                                  key={index + 1}
                                >
                                  <div key={cont._id}>
                                    <h1>Content {index + 1} </h1>
                                    <Button
                                      className="btn-add-item"
                                      icon={<DeleteOutlined />}
                                      type="danger"
                                      onClick={() => {
                                        setContent((currentContent) =>
                                          currentContent.filter(
                                            (x) => x._id !== cont._id
                                          )
                                        );
                                      }}
                                    >
                                      Delete the Content
                                    </Button>
                                    <input
                                      placeholder="Name"
                                      defaultValue={cont.name}
                                      required
                                      onChange={(e) => {
                                        setContent((currentContent) =>
                                          produce(currentContent, (v) => {
                                            v[index].name = e.target.value;
                                          })
                                        );
                                      }}
                                    />

                                    <Button
                                      className="btn-add-item"
                                      type="primary"
                                      onClick={() => {
                                        handleaddlect(cont, index);
                                        // cont.lectures = newlects;
                                        setLoadingAddLect(!LoadingAddLect);
                                      }}
                                    >
                                      add Lect
                                    </Button>
                                    {cont.lectures.map((lect, indexlec) => (
                                      <div key={lect._id}>
                                        <h1>Lecture {indexlec + 1} </h1>
                                        <input
                                          required
                                          placeholder="Name"
                                          defaultValue={lect.name}
                                          onChange={(e) => {
                                            setContent((currentContent) =>
                                              produce(currentContent, (v) => {
                                                v[index].lectures[
                                                  indexlec
                                                ].name = e.target.value;
                                              })
                                            );
                                          }}
                                        />
                                        <input
                                          required
                                          placeholder="Link"
                                          defaultValue={lect.link}
                                          onChange={(e) => {
                                            setContent((currentContent) =>
                                              produce(currentContent, (v) => {
                                                v[index].lectures[
                                                  indexlec
                                                ].link = e.target.value;
                                              })
                                            );
                                          }}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </TabPane>
                              ))}
                          </Tabs>
                        </div>
                      </TabPane>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditCourse;
