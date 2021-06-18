import React, { useState, useEffect } from "react";
import "../checkout/CheckoutScreen.css";
import { Helmet } from "react-helmet";

import { Image, Alert } from "antd";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "antd";
import Error from "../../components/utils/Error";
import { removeAllFromCart } from "../../redux/actions/cartActions";

import axios from "axios";

import { getOrderDetails, payOrder } from "../../redux/actions/orderActions";

import { ORDER_PAY_RESET } from "../../redux/constants/orderconstants";

const OrderScreen = ({ history, match }) => {
  const [sdkReady, setsdkReady] = useState(false);
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingpay, success: successPay } = orderPay;

  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  useEffect(() => {
    if (!isLogged) {
      history.push("/login");
    }
    const addPaypalscript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal ");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onload = () => {
        setsdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay) {
      dispatch({
        type: ORDER_PAY_RESET,
      });

      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalscript();
      } else {
        setsdkReady(true);
      }
    }

    console.log(order);
  }, [dispatch, orderId, successPay, orderPay, isLogged]);
  const successpaymenthandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult, user._id));
    dispatch(removeAllFromCart());
    //    history.push('/')
  };
  return (
    <div>
      <Helmet>
        <title>Order </title>
      </Helmet>
      {loading ? (
        <Skeleton active />
      ) : error ? (
        <Error error={error} />
      ) : (
        <div className="checkoutPage">
          <div className="checkout">
            {order.isPaid ? (
              <Alert
                message="This Order is Paid"
                type="success"
                showIcon
                closable
              />
            ) : (
              <Alert
                message="This Order is Not Paid Yet"
                type="error"
                showIcon
                closable
              />
            )}
            <h1>Your Informations:</h1>

            <div className="countryPayment">
              <div>
                <span>Name: </span>
                <b>{order.user.name.toUpperCase()}</b>
              </div>
              <div>
                <span>E-mail: </span>
                <b>{order.user.email}</b>
              </div>
              <div>
                <span>Country: </span>
                <b>{order.countryCustomer.country}</b>
              </div>
              <div>
                <span>Payment Method: </span>
                <b>{order.paymentMethod}</b>
              </div>
              {order.isPaid && (
                <div>
                  <span>Paid At: </span>
                  <b>{order.paidAt}</b>
                </div>
              )}
            </div>

            <div className="messageError"></div>

            <div className="orderDetails">
              <h1>Order Details</h1>

              {order.orderItems.map((item, index) => (
                <div className="orderDetailsInfo">
                  <div className="orderImage">
                    <Image
                      preview={false}
                      className="imageShippi"
                      width={90}
                      src={item.image}
                    />
                  </div>
                  <div className="orderName">
                    <p>{item.name}</p>
                  </div>
                  <div className="orderPrice">
                    <h2>${item.price}</h2>
                  </div>
                </div>
              ))}
              <hr></hr>
              <div className="totalPriceOrder">
                <h2>Total = </h2>
                <b className="totalPriceNumberOrder">${order.totalPrice}</b>
              </div>
            </div>
          </div>

          <div className="summary">
            {!order.isPaid && (
              <div className="paypalbuttons">
                <h1 className="lastStepPurchase">Last Step</h1>
                <p>
                  By completing your purchase you agree to{" "}
                  <a href="/">Terms of Service.</a>
                </p>
                <p className="payParagraph">
                  Now You Have Just To Pay To Have Access To The Course
                </p>
                <PayPalButton
                  className="buttonsp"
                  amount={order.totalPrice}
                  onSuccess={successpaymenthandler}
                />
              </div>
            )}
            <div className="keepOrderId">
              <h2>Warning !</h2>
              <p>
                For Security And Purchase Success, You Should Keep The Order ID
                Saved And If You Faced Any Problem Just Send Us Short
                Description With The Order ID
              </p>
              <h3>Order ID: {order._id}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderScreen;
