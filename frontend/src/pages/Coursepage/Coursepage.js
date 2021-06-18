import React, { useEffect, useState } from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { BsCheck } from "react-icons/all";
import Collapsible from "./Collapsible";
import { YoutubePlayer } from "reactjs-media";
import Comments from "./Comments";
import { Helmet } from "react-helmet";

import { Empty } from "antd";
import { Skeleton, Input, Button, Rate } from "antd";
import "./Coursepage.css";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckStudent,
  Createcoursereview,
  Getcoursedetails,
} from "../../redux/actions/courseActions";
import Error from "../../components/utils/Error";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../components/utils/notification/Notification";
import { CREATE_REVIEW_RESET } from "../../redux/constants/courseconstants";

const Coursepage = ({ match, history }) => {
  const [comment, setcomment] = useState("");
  const [rating, setrating] = useState(3);
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const [show, setShow] = useState(0);
  const GetCourseDetailsReducer = useSelector(
    (state) => state.GetCourseDetailsReducer
  );
  const { loading, course, error } = GetCourseDetailsReducer;
  const [add, setAdd] = useState(false);
  const [disable, setDisable] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;
  const CheckStudentReducer = useSelector((state) => state.CheckStudentReducer);

  const {
    loading: loadingstudent,
    isStudent,
    error: errorstudent,
  } = CheckStudentReducer;

  const Createcoursereviewreducer = useSelector(
    (state) => state.Createcoursereviewreducer
  );

  const {
    loading: loadingrev,
    success,
    message,
    error: errorrev,
  } = Createcoursereviewreducer;

  const onChangeBack = () => {
    if (window.scrollY >= 200) {
      setAdd(true);
    } else setAdd(false);
  };
  window.addEventListener("scroll", onChangeBack);

  const Disable = () => {
    if (window.scrollY >= 2600) {
      setDisable(true);
    } else setDisable(false);
  };
  useEffect(() => {
    dispatch(Getcoursedetails(match.params.id));
    if (isLogged) {
      dispatch(CheckStudent(match.params.id));
    }
    if (success) {
      setrating(0);
      setcomment("");
      dispatch({ type: CREATE_REVIEW_RESET });
    }
    return () => {};
  }, [dispatch, match.params.id, isLogged, success]);
  window.addEventListener("scroll", Disable);
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}`);
  };

  const sentreview = () => {
    dispatch(
      Createcoursereview(match.params.id, {
        rating,
        comment,
      })
    );
  };
  return (
    <>
      {loadingstudent || loading ? (
        <Skeleton active />
      ) : error || errorstudent ? (
        <Error error={error || errorstudent} />
      ) : (
        <div className="coursePage">
          <div>
            <div className="descriptionPart">
              <div className="descriptionPartText">
                <div className="CategorieCourse">
                  <h4>
                    <Link to="/">{course.category}</Link>
                    {/* <IoIosArrowForward color="white" size="10" /> <Link to="/">Développement Web</Link> <IoIosArrowForward color="white" size="10" /> Next.js  */}
                  </h4>
                </div>
                <div>
                  <Helmet>
                    <title>{course.name}</title>
                  </Helmet>
                  <h1 className="courseNaame">{course.name}</h1>
                  <p className="courseAbout">{course.shortdescription}</p>
                  <div className="ratingCourse">
                    <b>{course.rating}</b>
                    <Rating value={course.rating} />
                  </div>

                  <div className="informationCourse">
                    {!loading && !error && (
                      <p>
                        Created by <a href="#"> {course.user.name}</a>
                      </p>
                    )}
                    <div className="wish-share">
                      <button
                        className="buttonsCourse"
                        onClick={addToCartHandler}
                      >
                        Add to Cart
                      </button>
                      <button className="buttonsCourse">
                        <Link className="Link" to="/">
                          Shop Now
                        </Link>
                      </button>
                      <button className="buttonsCourse Video">
                        <Link className="Link" to="/">
                          Watch Video
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="windowToBuy">
                <YoutubePlayer
                  src="https://www.youtube.com/watch?v=zueyEdRZQlk" // Reqiured
                  width={480}
                  height={250}
                />
              </div>
            </div>
            <div>
              <div className="allAboutCourse">
                <div className="otherInformations">
                  <div>
                    <div className="learnAbout">
                      <h3>What you gonna learn</h3>
                      <div className="whatlearn">
                        <ul>
                          {course.goals.map((goal, index) => (
                            <li key={index}>
                              <BsCheck className="checkIcon" />
                              {goal}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="contenuCours">
                      <h2>Course content</h2>

                      <b className="sectionsSessions">
                        9 sections / 20 sessions / Durée totale: 6h 21min
                      </b>
                      <div className="allCourseContent">
                        {course.content.map((section, index) => (
                          <Collapsible
                            isaccessable={isStudent}
                            section={section}
                            sessions="5"
                            minutes="55"
                          />
                        ))}
                        <div className="pre-requis">
                          <h2>Prerequisite</h2>
                          <ul>
                            {course.Prerequisites.map((Prerequisite, index) => (
                              <li key={index}>{Prerequisite}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="descriptionCourse">
                          <h2>Description</h2>
                          <p>{course.description}</p>

                          <h2>Who is this course for?</h2>
                          <ul>
                            {course.audience.map((audi, index) => (
                              <li key={index}>{audi}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="afafa">
                  <div
                    className={`toAddCart ${
                      disable ? "disable" : add ? "active" : "disable"
                    }`}
                  >
                    {/* <div className="informationsToBuyCourse"> */}
                    <img
                      src={course.image}
                      width="400"
                      alt=""
                      height="175"
                      className="courseImage"
                    />
                    <div className="bottom_card">
                      <div className="price">
                        <p className="new-price">
                          {" "}
                          <span>${course.price}</span>
                        </p>
                        <h4 className="last-price">
                          Old Price: <span>$94,99</span>
                        </h4>
                      </div>

                      <div className="btnsShop">
                        {!isStudent && (
                          <button
                            className="btnaddToCart"
                            onClick={addToCartHandler}
                          >
                            Add to Cart
                          </button>
                        )}
                        <button
                          className={`btnShopNow ${
                            isStudent && "shopnow_disable"
                          }`}
                        >
                          {!isStudent ? "Shop Now" : "Already Purchased"}
                        </button>
                        <p className="garantie">Money-Back Guarantee</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom-infos">
                <div className="formateur">
                  <div className="formateurName">
                    <h2>Insrtuctor</h2>
                    <div style={{ display: "flex" }}>
                      <img
                        src={course.user.avatar}
                        id="avatar_insrtuctor"
                        alt="avatar"
                      />
                      <div className="name_job">
                        <b>{course.user.name}</b>
                        <p className="instructorProfession">
                          {course.user.headline}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p>{course.user.description}</p>
                </div>
                <div className="commentsUsers">
                  <h2 className="commentOfParti">Comments of Students</h2>
                  {course.reviews.length === 0 ? (
                    <Empty
                      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                      imageStyle={{
                        height: 60,
                      }}
                      description={<span>No Review yet</span>}
                    />
                  ) : (
                    <>
                      {course.reviews.map((review) => (
                        <Comments
                          commentPerson={review.name}
                          date={review.createdAt.substring(0, 10)}
                          commentMessage={review.comment}
                          rating={review.rating}
                        />
                      ))}
                    </>
                  )}
                </div>
                {isStudent && (
                  <div className="commentField">
                    {loadingrev ? (
                      <Skeleton />
                    ) : errorrev ? (
                      showErrMsg(errorrev)
                    ) : success === false ? (
                      showErrMsg(message)
                    ) : (
                      success === true && showSuccessMsg(message)
                    )}
                    <TextArea
                      rows={4}
                      placeholder="Let us know what do you think about this course."
                      onChange={(e) => setcomment(e.target.value)}
                    />
                    <Rate
                      allowHalf
                      value={rating}
                      onChange={(value) => setrating(value)}
                    />
                    <Button className="sendComment" onClick={sentreview}>
                      Send
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Coursepage;
