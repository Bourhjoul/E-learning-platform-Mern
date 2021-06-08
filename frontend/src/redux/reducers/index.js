import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import {ListMyCoursesReducer,ListCoursesReducer,ListCoursesbyPobularityReducer,GetCourseDetailsreducer,ListNewCoursesReducer} from './courseReducer'
import {cartReducer} from './cartReducer'
import usersInfo from './usersInfoReducer'
export default combineReducers({
    auth,
    token,
    ListMyCoursesReducer,
    ListCoursesReducer,
    ListCoursesbyPobularityReducer,
    GetCourseDetailsreducer,
    cartReducer,
    usersInfo,
    ListNewCoursesReducer
})