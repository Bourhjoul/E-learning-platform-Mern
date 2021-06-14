import { combineReducers } from "redux";
import auth from "./authReducer";
import token from "./tokenReducer";
import {
  ListMyCoursesReducer,
  ListCoursesReducer,
  ListCoursesbyPobularityReducer,
  GetCourseDetailsReducer,
  ListNewCoursesReducer,
  courseUpdateReducer,
  courseCreateReducer,
  courseDeleteReducer,
  CheckStudentReducer,
  Createcoursereviewreducer,
  listCoursespurshasedreducer,
} from "./courseReducer";
import { cartReducer } from "./cartReducer";
import {
  CreateOrderReducers,
  OrderDetailsreducer,
  OrderListreducer,
  OrderListMyreducer,
  OrderPayreducer,
} from "./orderReducers";
import usersInfo from "./usersInfoReducer";
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
  courseDeleteReducer,
  CheckStudentReducer,
  listCoursespurshasedreducer,
  Createcoursereviewreducer,
  orderCreate: CreateOrderReducers,
  orderDetails: OrderDetailsreducer,
  orderPay: OrderPayreducer,
  orderMylist: OrderListMyreducer,
  orderList: OrderListreducer,
});
