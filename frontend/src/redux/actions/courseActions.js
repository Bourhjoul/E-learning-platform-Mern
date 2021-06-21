import {
  LIST_COURSES_FAIL,
  LIST_COURSES_POBULAR_FAIL,
  LIST_COURSES_POBULAR_REQUEST,
  LIST_COURSES_POBULAR_SUCCESS,
  LIST_COURSES_REQUEST,
  LIST_COURSES_SUCCESS,
  LIST_COURSE_DETAILS_FAIL,
  LIST_COURSE_DETAILS_REQUEST,
  LIST_COURSE_DETAILS_SUCCESS,
  LIST_NEW_COURSES_FAIL,
  LIST_NEW_COURSES_REQUEST,
  LIST_NEW_COURSES_SUCCESS,
  MY_COURSES_FAIL,
  MY_COURSES_REQUEST,
  MY_COURSES_SUCCESS,
  COURSE_UPDATE_REQUEST,
  COURSE_UPDATE_SUCCESS,
  COURSE_UPDATE_FAIL,
  COURSE_DELETE_REQUEST,
  COURSE_DELETE_SUCCESS,
  COURSE_DELETE_FAIL,
  COURSE_CREATE_REQUEST,
  COURSE_CREATE_SUCCESS,
  COURSE_CREATE_FAIL,
  CHECK_STUDENT_REQUEST,
  CHECK_STUDENT_SUCCESS,
  CHECK_STUDENT_FAIL,
  LIST_COURSES_PURCHASED_REQUEST,
  LIST_COURSES_PURCHASED_SUCCESS,
  LIST_COURSES_PURCHASED_FAIL,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  LIST_COURSES_SEARCH_REQUEST,
  LIST_COURSES_SEARCH_SUCCESS,
  LIST_COURSES_SEARCH_FAIL,
  LIST_BYSUBCATEGORYS_REQUEST,
  LIST_BYSUBCATEGORYS_SUCCESS,
  LIST_BYSUBCATEGORYS_FAIL,
  GET_SUBCATEGORYS_REQUEST,
  GET_SUBCATEGORYS_SUCCESS,
  GET_SUBCATEGORYS_FAIL,
  GET_CRSRATING_SUCCESS,
  GET_CRSRATING_REQUEST,
  GET_CRSRATING_FAIL,
  GET_CRSPRICE_SUCCESS,
  GET_CRSPRICE_REQUEST,
  GET_CRSPRICE_FAIL,
  ALL_COURSES_REQUEST,
  ALL_COURSES_SUCCESS,
  ALL_COURSES_FAIL,
} from "../constants/courseconstants";
import axios from "axios";

export const listMyCourses = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MY_COURSES_REQUEST,
    });
    console.log("before token");

    const { token } = getState();
    console.log("after token");

    console.log(token);
    const config = {
      headers: {
        Authorization: token,
      },
    };

    const { data } = await axios.get(`/courses/Mycourses`, config);
    console.log(data);
    dispatch({
      type: MY_COURSES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: MY_COURSES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const listAllCourses = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ALL_COURSES_REQUEST,
    });
    console.log("before token");

    const { token } = getState();
    console.log("after token");

    console.log(token);
    const config = {
      headers: {
        Authorization: token,
      },
    };

    const { data } = await axios.get(`/courses/ALLcourses`, config);
    console.log(data);
    dispatch({
      type: ALL_COURSES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ALL_COURSES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const Createcoursereview =
  (id, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_REVIEW_REQUEST });
      const { token } = getState();
      const config = {
        headers: {
          Authorization: token,
        },
      };
      console.log(review);
      const { data } = await axios.post(
        `/courses/createreview/${id}`,
        review,
        config
      );
      dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listCoursespurshased = (page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIST_COURSES_PURCHASED_REQUEST,
    });

    const { token } = getState();

    const config = {
      headers: {
        Authorization: token,
      },
    };

    const { data } = await axios.get(
      `/courses/Coursespurshased?page=${page}`,
      config
    );
    dispatch({
      type: LIST_COURSES_PURCHASED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_COURSES_PURCHASED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const CheckStudent = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHECK_STUDENT_REQUEST,
    });
    const { token } = getState();

    const config = {
      headers: {
        Authorization: token,
      },
    };

    const { data } = await axios.get(
      `/courses/checkmembership?id=${id}`,
      config
    );
    dispatch({
      type: CHECK_STUDENT_SUCCESS,
      payload: data.isStudent,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CHECK_STUDENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const ListcoursesbyTopic =
  (Topic, Allcourses = false, page) =>
  async (dispatch) => {
    try {
      dispatch({ type: LIST_COURSES_REQUEST });
      const { data } = await axios.get(
        `/courses/topic/?Topic=${Topic}&All=${
          Allcourses ? "All" : ""
        }&page=${page}`
      );
      dispatch({ type: LIST_COURSES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: LIST_COURSES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const ListnewCourses = (Topic, page) => async (dispatch) => {
  try {
    dispatch({ type: LIST_NEW_COURSES_REQUEST });
    const { data } = await axios.get(
      `/courses/topic/?Topic=${Topic}&New=${true}&page=${page}`
    );
    dispatch({ type: LIST_NEW_COURSES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIST_NEW_COURSES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const Listcoursesbypobularity =
  (Topic = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: LIST_COURSES_POBULAR_REQUEST });
      const { data } = await axios.get(`/courses/pobular?Topic=${Topic}`);
      dispatch({ type: LIST_COURSES_POBULAR_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: LIST_COURSES_POBULAR_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const ListcoursesSearched = (keyword, page) => async (dispatch) => {
  try {
    dispatch({ type: LIST_COURSES_SEARCH_REQUEST });
    const { data } = await axios.get(
      `/courses/searched?keyword=${keyword}&page=${page}`
    );
    dispatch({ type: LIST_COURSES_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIST_COURSES_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const Getcoursedetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: LIST_COURSE_DETAILS_REQUEST });
    const { data } = await axios.get(`/courses/details/${id}`);
    console.log(data);

    dispatch({ type: LIST_COURSE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIST_COURSE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const UpdateCourse = (course) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_UPDATE_REQUEST });

    const { data } = await axios.put(
      `/courses/updatecourse/${course._id}`,
      course
    );

    dispatch({ type: COURSE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COURSE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const DeleteCourse = (id) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_DELETE_REQUEST });

    const { data } = await axios.delete(`/courses/deletecourse/${id}`);

    dispatch({ type: COURSE_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COURSE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const CreateCourse = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSE_CREATE_REQUEST,
    });
    console.log("before token");

    const { token } = getState();
    console.log("after token");

    console.log(token);
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const { data } = await axios.post(`/courses/addcourse`, {}, config);
    dispatch({
      type: COURSE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const GetCoursesbysubcg = (Subcg, page) => async (dispatch) => {
  try {
    dispatch({ type: LIST_BYSUBCATEGORYS_REQUEST });
    const { data } = await axios.get(`/courses/subcg/${Subcg}?page=${page}`);
    dispatch({ type: LIST_BYSUBCATEGORYS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIST_BYSUBCATEGORYS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const GetSubCategorys = (Topic) => async (dispatch) => {
  try {
    dispatch({ type: GET_SUBCATEGORYS_REQUEST });
    const { data } = await axios.get(`/courses/subcategory/${Topic}`);
    dispatch({ type: GET_SUBCATEGORYS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SUBCATEGORYS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const LisCoursesbyrating = (Topic, rating) => async (dispatch) => {
  try {
    dispatch({ type: GET_CRSRATING_REQUEST });
    const { data } = await axios.post(`/courses/rate/${Topic}`, rating);
    console.log("Action", rating);
    dispatch({ type: GET_CRSRATING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_CRSRATING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const ListCoursesbyprice = (Topic, price) => async (dispatch) => {
  try {
    dispatch({ type: GET_CRSPRICE_REQUEST });
    const { data } = await axios.post(`/courses/price/${Topic}`, price);
    console.log("Action", price);
    dispatch({ type: GET_CRSPRICE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_CRSPRICE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
