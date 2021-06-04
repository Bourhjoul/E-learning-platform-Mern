import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import {ListMyCoursesReducer,ListCoursesReducer,ListCoursesbyPobularityReducer,GetCourseDetailsreducer} from './courseReducer'
export default combineReducers({
    auth,
    token,
    ListMyCoursesReducer,
    ListCoursesReducer,
    ListCoursesbyPobularityReducer,
    GetCourseDetailsreducer
})