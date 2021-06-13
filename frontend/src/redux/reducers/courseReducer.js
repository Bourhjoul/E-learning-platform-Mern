import {
  COURSE_CREATE_SUCCESS,
  COURSE_CREATE_REQUEST,
  COURSE_CREATE_FAIL,
  COURSE_CREATE_RESET,
  COURSE_DELETE_SUCCESS,
  COURSE_DELETE_REQUEST,
  COURSE_DELETE_FAIL,
  COURSE_UPDATE_REQUEST,
  COURSE_UPDATE_SUCCESS,
  COURSE_UPDATE_FAIL,
  COURSE_UPDATE_RESET,
  LIST_COURSES_FAIL,
  LIST_COURSES_POBULAR_FAIL,
  LIST_COURSES_POBULAR_REQUEST,
  LIST_COURSES_POBULAR_RESET,
  LIST_COURSES_POBULAR_SUCCESS,
  LIST_COURSES_REQUEST,
  LIST_COURSES_RESET,
  LIST_COURSES_SUCCESS,
  LIST_COURSE_DETAILS_FAIL,
  LIST_COURSE_DETAILS_REQUEST,
  LIST_COURSE_DETAILS_RESET,
  LIST_COURSE_DETAILS_SUCCESS,
  MY_COURSES_FAIL,
  MY_COURSES_REQUEST,
  MY_COURSES_RESET,
  MY_COURSES_SUCCESS,
  LIST_NEW_COURSES_REQUEST,
  LIST_NEW_COURSES_SUCCESS,
  LIST_NEW_COURSES_RESET,
  LIST_NEW_COURSES_FAIL,
  CHECK_STUDENT_REQUEST,
  CHECK_STUDENT_SUCCESS,
  CHECK_STUDENT_FAIL,
  LIST_COURSES_PURCHASED_REQUEST,
  LIST_COURSES_PURCHASED_SUCCESS,
  LIST_COURSES_PURCHASED_FAIL,
  LIST_COURSES_PURCHASED_RESET,
} from "../constants/courseconstants";

export const ListMyCoursesReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case MY_COURSES_REQUEST:
      return {
        loading: true,
      };
    case MY_COURSES_SUCCESS:
      return {
        loading: false,
        courses: action.payload,
      };
    case MY_COURSES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case MY_COURSES_RESET:
      return { courses: [] };
    default:
      return state;
  }
};
export const listCoursespurshasedreducer = (
  state = { courses: [] },
  action
) => {
  switch (action.type) {
    case LIST_COURSES_PURCHASED_REQUEST:
      return {
        loading: true,
      };
    case LIST_COURSES_PURCHASED_SUCCESS:
      return {
        loading: false,
        courses: action.payload.coursespurshased,
        totalcourses: action.payload.totalcourses,
      };
    case LIST_COURSES_PURCHASED_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case LIST_COURSES_PURCHASED_RESET:
      return { courses: [] };
    default:
      return state;
  }
};
export const CheckStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_STUDENT_REQUEST:
      return {
        loading: true,
      };
    case CHECK_STUDENT_SUCCESS:
      return {
        loading: false,
        isStudent: action.payload,
      };
    case CHECK_STUDENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const ListCoursesReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case LIST_COURSES_REQUEST:
      return {
        loading: true,
      };
    case LIST_COURSES_SUCCESS:
      return {
        loading: false,
        courses: action.payload.courses,
        totalcourses: action.payload.totalcourses,
      };
    case LIST_COURSES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case LIST_COURSES_RESET:
      return { courses: [] };
    default:
      return state;
  }
};

export const ListCoursesbyPobularityReducer = (
  state = { courses: [] },
  action
) => {
  switch (action.type) {
    case LIST_COURSES_POBULAR_REQUEST:
      return {
        loading: true,
      };
    case LIST_COURSES_POBULAR_SUCCESS:
      return {
        loading: false,
        courses: action.payload,
      };
    case LIST_COURSES_POBULAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case LIST_COURSES_POBULAR_RESET:
      return { courses: [] };
    default:
      return state;
  }
};

export const ListNewCoursesReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case LIST_NEW_COURSES_REQUEST:
      return {
        loading: true,
      };
    case LIST_NEW_COURSES_SUCCESS:
      return {
        loading: false,
        courses: action.payload,
      };
    case LIST_NEW_COURSES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case LIST_NEW_COURSES_RESET:
      return { courses: [] };
    default:
      return state;
  }
};

export const GetCourseDetailsReducer = (
  state = {
    course: {
      subcategorys: [],
      reviews: [],
      audience: [],
      goals: [],
      students: [],
      content: [],
      Prerequisites: [],
      user: {},
    },
  },
  action
) => {
  switch (action.type) {
    case LIST_COURSE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LIST_COURSE_DETAILS_SUCCESS:
      return {
        loading: false,
        course: action.payload,
        success: true,
      };
    case LIST_COURSE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case LIST_COURSE_DETAILS_RESET:
      return { course: [] };
    default:
      return state;
  }
};
export const courseUpdateReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case COURSE_UPDATE_REQUEST:
      return { loading: true };
    case COURSE_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        course: action.payload,
      };
    case COURSE_UPDATE_FAIL:
      return { loading: false, err: action.payload };
    case COURSE_UPDATE_RESET:
      return { course: {}, success: false };
    default:
      return state;
  }
};
export const courseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_CREATE_REQUEST:
      return { loading: true };
    case COURSE_CREATE_SUCCESS:
      return { loading: false, success: true, course: action.payload };
    case COURSE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case COURSE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const courseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_DELETE_REQUEST:
      return { loading: true };
    case COURSE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COURSE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
