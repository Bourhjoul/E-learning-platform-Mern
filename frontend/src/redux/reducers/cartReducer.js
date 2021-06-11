import { ADD_ITEM_CART,  CART_NAME_PAYMENT,  CART_SAVE_COUNTRY_CUSTOMER,  CART_SAVE_PAYMENT,  REMOVE_ALL_FROM_CART,  REMOVE_ITEM_CART} from "../constants/cartconstants"

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const countryCustomerFromStorage = localStorage.getItem('countryCustomer') ? JSON.parse(localStorage.getItem('countryCustomer')) : {}

const paymentShippingFromStorage = localStorage.getItem('MethodOfPayment') ? JSON.parse(localStorage.getItem('MethodOfPayment')) : {}

const nameOnCardFromStorage = localStorage.getItem('NameOnCard') ? JSON.parse(localStorage.getItem('NameOnCard')) : {}

const initalState = {
    cartItems: cartItemsFromStorage,
    countryCustomer: countryCustomerFromStorage,
    MethodOfPayment: paymentShippingFromStorage,
    NameOnCard: nameOnCardFromStorage 
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
         
         case REMOVE_ALL_FROM_CART: 
         
         return {
            ...state
            
         }
         
         case CART_SAVE_COUNTRY_CUSTOMER:
            return {
                ...state,
                countryCustomer: action.payload,
            }


            case CART_SAVE_PAYMENT:
                return {
                    ...state,
                    MethodOfPayment: action.payload
                }

                case CART_NAME_PAYMENT:
                return {
                    ...state,
                    NameOnCard: action.payload
                }
        default : return state
    }
}