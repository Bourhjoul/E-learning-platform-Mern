import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
export default combineReducers({
    auth,
    token
})