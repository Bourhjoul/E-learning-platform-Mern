import React, { useEffect } from "react";
import "../checkout/CheckoutScreen.css";
import { Helmet } from "react-helmet";

import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { CreateOrder } from "../../redux/actions/orderActions";

const PlaceOrder = ({ history }) => {
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const cartReducer = useSelector((state) => state.cartReducer);
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const nameCard = cartReducer.NameOnCard.nameCard.replace(/.(?=.{4})/g, "x");
  const cardNumber = cartReducer.NameOnCard.cardNumber.replace(
    /.(?=.{4})/g,
    "x"
  );
  const securityCode = cartReducer.NameOnCard.security.replace(
    /.(?=.{1})/g,
    "x"
  );
  const { cartItems } = cartReducer;

  cartReducer.itemsPrice = addDecimals(
    cartReducer.cartItems.reduce((acc, item) => acc + item.price, 0)
  );

  cartReducer.totalPrice = Number(cartReducer.itemsPrice).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  const Placeorderhanlder = () => {
    dispatch(
      CreateOrder({
        orderItems: cartReducer.cartItems,
        countryCustomer: cartReducer.countryCustomer,
        paymentMethod: cartReducer.MethodOfPayment,
        itemsPrice: cartReducer.itemsPrice,

        totalPrice: cartReducer.totalPrice,
      })
    );
  };
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    return () => {};
    //eslint-disable-next-line
  }, [history, success]);

  function showConfirm() {
    confirm({
      title: "Do you confirm this informations ?",

      content: "Please Verify The Total Price And Payment Method",
      onOk() {
        Placeorderhanlder();
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }
  return (
    <div>
      <Helmet>
        <title>Place Order</title>
      </Helmet>
      <div className="checkoutPage">
        <div className="checkout">
          <h1>Your Informations:</h1>

          <div className="countryPayment">
            <div>
              <span>Your Country: </span>
              <b>{cartReducer.countryCustomer.country}</b>
              <br></br>
            </div>
            <div>
              <span>Payment Method: </span>
              <b>{cartReducer.MethodOfPayment}</b>
              <br></br>
            </div>

            {cartReducer.MethodOfPayment === "Card" && (
              <span>
                <div>
                  <span>Name On Card: </span>
                  <b>{nameCard}</b>
                  <br></br>
                </div>
                <div>
                  <span>Card Number: </span>
                  <b>{cardNumber}</b>
                  <br></br>
                </div>
                <div>
                  <span>Expiration Date: </span>
                  <b>{cartReducer.NameOnCard.dateExp}</b>
                  <br></br>
                </div>
                <div>
                  <span>Security Code: </span>
                  <b>{securityCode}</b>
                  <br></br>
                </div>
                <div>
                  <span>Zip/Postal Code: </span>
                  <b>{cartReducer.NameOnCard.zip}</b>
                </div>
              </span>
            )}
          </div>
        </div>

        <div className="summary">
          <h1>Summary</h1>
          <div className="priceOfP">
            <b>Original price:</b>
            <h3>${cartReducer.totalPrice}</h3>
          </div>
          <div className="priceOfP">
            <b>Coupon discounts:</b>
            <h3>$189,33</h3>
          </div>
          <hr></hr>
          <div className="priceOfTotal">
            <b>Total:</b>
            <h3>${cartReducer.totalPrice}</h3>
          </div>
          <br></br>

          <Button className="validationBtn" onClick={showConfirm}>
            Next
          </Button>
          {error && error}
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
