import ACTIONS from './index'
import axios from 'axios'

/*Get All Users*/

export const dispatchGetAllUsersRequest = () => {
    return {
        type: ACTIONS.GET_ALL_USERS_REQUEST
    }
}
export const fetchAllUsers = async (token) => {
    const res = await axios.get('/user/all_infor', {
        headers: {Authorization: token}
    })
    return res
}
export const dispatchGetAllUsers = (res) => {
    return {
        type: ACTIONS.GET_ALL_USERS,
        payload: res.data
        
    }
}
