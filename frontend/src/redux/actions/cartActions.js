import { ADD_ITEM_CART,  REMOVE_ITEM_CART} from "../constants/cartconstants"
import axios from 'axios'

export const addToCart = (id) => async (dispatch,getState)=> {
    const { data } = await axios.get(`/courses/${id}`)
    console.log('add to cart : ', data);
    dispatch({
        type: ADD_ITEM_CART,
        payload : {
            course : data._id,
            name : data.name,
            user :  data.user,
            shortdescription : data.shortdescription,
            image : data.image,
            price : data.price
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems))
}

export const removeFromCart = (id) =>  (dispatch,getState)=>{ 
    dispatch({
    type: REMOVE_ITEM_CART,
    payload : id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems))
}