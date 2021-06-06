import { ADD_ITEM_CART,  REMOVE_ITEM_CART} from "../constants/cartconstants"

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const initalState = {
    cartItems: cartItemsFromStorage 
}
export const cartReducer = (state = initalState, action) => {
    switch(action.type) {
        case ADD_ITEM_CART : 
        const item = action.payload//the new course added
        // x.course it's the ID
        const existingItem = state.cartItems.find((x) => x.course === item.course)
        if (existingItem){
            return {
                ...state,
                cartItems : state.cartItems.map((x) =>
                 x.course === existingItem.course ? item : x)
             } 
            }
            else {
                return{
                    ...state,
                    cartItems: [...state.cartItems,item]
                }}
         case REMOVE_ITEM_CART : 
         return {
            ...state,
            cartItems : state.cartItems.filter((x) =>
             x.course !== action.payload)
         } 
        default : return state
    }
}