import { LIST_COURSES_FAIL, LIST_COURSES_POBULAR_FAIL, LIST_COURSES_POBULAR_REQUEST, LIST_COURSES_POBULAR_RESET, LIST_COURSES_POBULAR_SUCCESS, LIST_COURSES_REQUEST, LIST_COURSES_RESET, LIST_COURSES_SUCCESS, LIST_COURSE_DETAILS_FAIL, LIST_COURSE_DETAILS_REQUEST, LIST_COURSE_DETAILS_RESET, LIST_COURSE_DETAILS_SUCCESS, MY_COURSES_FAIL, MY_COURSES_REQUEST, MY_COURSES_RESET, MY_COURSES_SUCCESS } from "../constants/courseconstants"

export const ListMyCoursesReducer = (state = {courses : []} , action) => {
    switch (action.type) {
        case MY_COURSES_REQUEST:
            return {
                loading: true,
            }
        case MY_COURSES_SUCCESS:
            return {
                loading : false,
                courses : action.payload
            }
        case MY_COURSES_FAIL:
            return{
                loading : false,
                error : action.payload,

            }
        case MY_COURSES_RESET:
            return{courses : []}    
        default:
            return state
    }
}

export const ListCoursesReducer = (state = {courses : []} , action) => {
    switch (action.type) {
        case LIST_COURSES_REQUEST:
            return {
                loading: true,
            }
        case LIST_COURSES_SUCCESS:
            return {
                loading : false,
                courses : action.payload
            }
        case LIST_COURSES_FAIL:
            return{
                loading : false,
                error : action.payload,

            }
        case LIST_COURSES_RESET:
            return{courses : []}    
        default:
            return state
    }
}

export const ListCoursesbyPobularityReducer = (state = {courses : []} , action) => {
    switch (action.type) {
        case LIST_COURSES_POBULAR_REQUEST:
            return {
                loading: true,
            }
        case LIST_COURSES_POBULAR_SUCCESS:
            return {
                loading : false,
                courses : action.payload
            }
        case LIST_COURSES_POBULAR_FAIL:
            return{
                loading : false,
                error : action.payload,

            }
        case LIST_COURSES_POBULAR_RESET:
            return{courses : []}    
        default:
            return state
    }
}

export const GetCourseDetailsreducer = (state = {course : {subcategorys : [] ,reviews : [],audience : [],goals: [],students : [],content : [],Prerequisites : [],user : {}}} , action) => {
    switch (action.type) {
        case LIST_COURSE_DETAILS_REQUEST:
            return {
                loading: true,
            }
        case LIST_COURSE_DETAILS_SUCCESS:
            return {
                loading : false,
                course : action.payload
            }
        case LIST_COURSE_DETAILS_FAIL:
            return{
                loading : false,
                error : action.payload,

            }
        case LIST_COURSE_DETAILS_RESET:
            return{course : []}    
        default:
            return state
    }
}