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
  GetSubCategorysReducer,
  GetCoursesbysubcg,
  courseCreateReducer,
  courseDeleteReducer,
  CheckStudentReducer,
  Createcoursereviewreducer,
  listCoursespurshasedreducer,
  listCourseSearchedreducer,
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
  GetSubCategorysReducer,
  GetCoursesbysubcg,
  cartReducer,
  usersInfo,
  ListNewCoursesReducer,
  courseUpdateReducer,
  courseCreateReducer,
  courseDeleteReducer,
  CheckStudentReducer,
  listCoursespurshasedreducer,
  Createcoursereviewreducer,
  listCourseSearchedreducer,
  orderCreate: CreateOrderReducers,
  orderDetails: OrderDetailsreducer,
  orderPay: OrderPayreducer,
  orderMylist: OrderListMyreducer,
  orderList: OrderListreducer,
});
