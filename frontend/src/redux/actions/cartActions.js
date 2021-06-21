import {
  ADD_ITEM_CART,
  CART_NAME_PAYMENT,
  CART_SAVE_COUNTRY_CUSTOMER,
  CART_SAVE_PAYMENT,
  REMOVE_ALL_FROM_CART,
  REMOVE_ITEM_CART,
} from "../constants/cartconstants";
import axios from "axios";

export const addToCart = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/courses/details/${id}`);
  console.log("add to cart : ", data);
  dispatch({
    type: ADD_ITEM_CART,
    payload: {
      course: data._id,
      name: data.name,
      user: data.user,
      shortdescription: data.shortdescription,
      image: data.image,
      price: data.price,
      rating: data.rating,
      numStudents: data.numStudents,
      category: data.category,
    },
  });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_CART,
    payload: id,
  });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
};

export const removeAllFromCart = () => (dispatch, getState) => {
  dispatch({
    type: REMOVE_ALL_FROM_CART,
  });
  localStorage.removeItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
};

export const saveCountryCustomer = (data) => (dispatch, getState) => {
  dispatch({
    type: CART_SAVE_COUNTRY_CUSTOMER,
    payload: data,
  });
  localStorage.setItem("countryCustomer", JSON.stringify(data));
};

export const saveCartPayment = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT,
    payload: data,
  });
  localStorage.setItem("MethodOfPayment", JSON.stringify(data));
};

export const saveNamePayment = (data) => (dispatch) => {
  dispatch({
    type: CART_NAME_PAYMENT,
    payload: data,
  });
  localStorage.setItem("NameOnCard", JSON.stringify(data));
};
