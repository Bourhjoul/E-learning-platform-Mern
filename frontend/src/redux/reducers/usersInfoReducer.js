import ACTIONS from '../actions'

const users = []
const usersInfoReducer = (state = users, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_USERS_REQUEST :
            return {...state, loadingtab : true }
        case ACTIONS.GET_ALL_USERS:
            return { users: action.payload ,loadingtab : false}   
        default:
            return state
    }
}

export default usersInfoReducer