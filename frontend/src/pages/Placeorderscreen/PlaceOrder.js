
import React,{useState} from 'react'
import '../checkout/CheckoutScreen.css'
import {Image, Button  } from 'antd';
import { PayPalButton } from 'react-paypal-button-v2';
import {useDispatch,useSelector} from 'react-redux'
import Paypal from './Paypal'
import { removeAllFromCart } from '../../redux/actions/cartActions';

const PlaceOrder = ({history}) => {
    const dispatch = useDispatch()
    const cartReducer = useSelector(state => state.cartReducer)
    const nameCard = cartReducer.NameOnCard.nameCard.replace(/.(?=.{4})/g, 'x')
   const cardNumber =   cartReducer.NameOnCard.cardNumber.replace(/.(?=.{4})/g, 'x');
   const securityCode =   cartReducer.NameOnCard.security.replace(/.(?=.{1})/g, 'x');
   const {cartItems} = cartReducer

   const successPayment = () => {
       
       dispatch(removeAllFromCart())
       history.push('/cart')
      
   }
       return ( 
        <div>
            <div className="checkoutPage">
          
          <div className="checkout">
              <h1>Your Informations:</h1>
              
          <div className="countryPayment">
                
                <div>
                    <span>Your Country: </span><b>{cartReducer.countryCustomer.country}</b><br></br>
                </div>
                <div>
                    <span>Payment Method: </span><b>{cartReducer.MethodOfPayment}</b><br></br>
                </div>

                {cartReducer.MethodOfPayment === "Card" &&
                <span>
                <div>
                    <span>Name On Card: </span><b>{nameCard}</b><br></br>
                </div>
                <div>
                    <span>Card Number: </span><b>{cardNumber}</b><br></br>
                </div>
                <div>
                    <span>Expiration Date: </span><b>{cartReducer.NameOnCard.dateExp}</b><br></br>
                </div>
                <div>
                    <span>Security Code: </span><b>{securityCode}</b><br></br>
                </div>
                <div>
                    <span>Zip/Postal Code: </span><b>{cartReducer.NameOnCard.zip}</b>
                </div>
                </span>
                 } 
          </div>
          
             
      
         <div className="messageError"></div>
                  
                  
                  
                  <div className="orderDetails">
                  <h1>Order Details</h1>
                  
                      {cartItems.map((item, index) => (
                      <div className="orderDetailsInfo">
                          <div className="orderImage">
                              <Image preview={false} className="imageShippi" width={90} src={item.image} />
                          </div>
                          <div className="orderName">
                              <p>{item.name}</p>
                          </div>
                          <div className="orderPrice">
                              <h2>${item.price}</h2>
                          </div>
                      </div>
                      ))}

                  
                  </div>
                  
          </div>
     
          <div className="summary">
              <h1>Summary</h1>
              <div className="priceOfP">
                  <b>Original price:</b>
                  <h3>${cartItems.reduce((acc,item )=>
              acc + item.price,0
           ).toFixed(2)}</h3>
              </div>
              <div className="priceOfP">
                  <b>Coupon discounts:</b>
                  <h3>$189,33</h3>
              </div>
              <hr></hr>
              <div className="priceOfTotal">
                  <b>Total:</b>
                  <h3>${cartItems.reduce((acc,item )=> acc + item.price,0).toFixed(2)}</h3>
              </div>
              <br></br>
              <p>By completing your purchase you agree to <a href="/">Terms of Service.</a></p>
                    <p className="payParagraph">Now You Have Just To Pay To Have Access To The Course</p>
              <PayPalButton className = 'buttonsp' amount = {cartItems.reduce((acc,item )=> acc + item.price,0).toFixed(2)} onSuccess = {successPayment}/>
            

                        
          </div>
      </div>
        </div>
    )
}

export default PlaceOrder
