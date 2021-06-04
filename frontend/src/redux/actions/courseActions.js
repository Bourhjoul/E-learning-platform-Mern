import { LIST_COURSES_FAIL, LIST_COURSES_POBULAR_FAIL, LIST_COURSES_POBULAR_REQUEST, LIST_COURSES_POBULAR_SUCCESS, LIST_COURSES_REQUEST, LIST_COURSES_SUCCESS, LIST_COURSE_DETAILS_FAIL, LIST_COURSE_DETAILS_REQUEST, LIST_COURSE_DETAILS_SUCCESS, MY_COURSES_FAIL, MY_COURSES_REQUEST, MY_COURSES_SUCCESS } from "../constants/courseconstants"
import axios from 'axios'


export const listMyCourses = () => async (dispatch,getState ) => {
    try {
        dispatch({
            type: MY_COURSES_REQUEST
        })
                console.log('before token')

        const { token } = getState()
                        console.log('after token')

        console.log(token)
        const config = {
            headers:{
                Authorization: token
            }
        }

        const { data } = await axios.get(`/courses/Mycourses`, config)
        console.log(data)
        dispatch({
            type: MY_COURSES_SUCCESS,
            payload: data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: MY_COURSES_FAIL,
            payload: 
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
        
    }
}


export const ListcoursesbyTopic = (Topic) => async (dispatch) =>{
    try {
        dispatch({type : LIST_COURSES_REQUEST })
        const {data} = await axios.get(`/courses/topic/?Topic=${Topic}`)
        dispatch({type : LIST_COURSES_SUCCESS , payload : data})
        console.log(data)
        } catch (error) {
            dispatch({type : LIST_COURSES_FAIL , 
                      payload : error.response && error.response.data.message 
                      ? error.response.data.message : error.message, })
        
    }

}


export const Listcoursesbypobularity = () => async (dispatch) =>{
    try {
        dispatch({type : LIST_COURSES_POBULAR_REQUEST })
        const {data} = await axios.get(`/courses/pobular`)
        dispatch({type : LIST_COURSES_POBULAR_SUCCESS , payload : data})
        } catch (error) {
            dispatch({type : LIST_COURSES_POBULAR_FAIL , 
                      payload : error.response && error.response.data.message 
                      ? error.response.data.message : error.message, })
    }
}
export const Getcoursedetails = (id) => async (dispatch) =>{
    try {
        dispatch({type : LIST_COURSE_DETAILS_REQUEST })
        const { data } = await axios.get(`/courses/${id}`)
                        console.log(data)

        dispatch({ type: LIST_COURSE_DETAILS_SUCCESS, payload: data })

        } catch (error) {
            dispatch({type : LIST_COURSE_DETAILS_FAIL , 
                      payload : error.response && error.response.data.message 
                      ? error.response.data.message : error.message, })
    }
}