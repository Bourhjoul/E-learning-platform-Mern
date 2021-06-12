import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import {ListMyCoursesReducer,
    ListCoursesReducer,
    ListCoursesbyPobularityReducer,
    GetCourseDetailsReducer,
    ListNewCoursesReducer,
    courseUpdateReducer,
    courseCreateReducer,
    courseDeleteReducer} from './courseReducer'
import {cartReducer} from './cartReducer'
import usersInfo from './usersInfoReducer'
export default combineReducers({
    auth,
    token,
    ListMyCoursesReducer,
    ListCoursesReducer,
    ListCoursesbyPobularityReducer,
    GetCourseDetailsReducer,
    cartReducer,
    usersInfo,
    ListNewCoursesReducer,
    courseUpdateReducer,
    courseCreateReducer,
    courseDeleteReducer
})