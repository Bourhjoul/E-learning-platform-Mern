import React, { useEffect } from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Productcart from "./Productcart";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";

import { Input } from "antd";
import "./Cart.css";
import { addToCart } from "../../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import Empty from "./Empty";

const Cart = ({ match, history }) => {
  const dispatch = useDispatch();
  const cartReducer = useSelector((state) => state.cartReducer);
  const { cartItems } = cartReducer;
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      console.log(id);
      dispatch(addToCart(id));
    }
  }, [id, dispatch]);

  const { Search } = Input;

  const checkoutHandler = () => {
    history.push("/checkout");
  };
  return (
    <>
      <Helmet>
        <title>CART</title>
      </Helmet>
      {cartItems.length === 0 ? (
        <Empty />
      ) : (
        <div className="cartfull">
          <div className="cart">
            <div className="productsoncart">
              {cartItems.map((course) => (
                <Productcart course={course} />
              ))}
            </div>
          </div>
          <div className="totalcart">
            <h3 className="totalName">Subtotal ({cartItems.length} items)</h3>
            <b className="totalprice">
              {cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}$
            </b>
            <br></br>
            <b className="pricebefore">600,00 $US</b>

            <button className="validationBtn" onClick={checkoutHandler}>
              VALIDATION
            </button>
            <br></br>
            <hr></hr>
            <br></br>
            <Search
              placeholder="Enter the coupon"
              className="buttonCoupon"
              enterButton="Apply"
              size="large"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
