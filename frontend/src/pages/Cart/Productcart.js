
import React,{useRef,useState,useEffect} from 'react'

import { VscChromeClose } from "react-icons/all";
import './Cart.css'

import { Link } from 'react-router-dom';

const Productcart = () => {
    return (
        <div className="productsoncart">
            <div className="productoncart">
                <div className="productImgCart">
                    <img className="imageCart" src="./images/react.jpg"/>
                </div>
                
                <div className="productNameAFounder">
                    <b>Next.js Dev to Deployement</b>
                    <p>By Brad Traversy, Full Stack Web Developer</p>
                </div>
                <div className="priceOfCourse">
                    <h1 className = 'totalpriceCart'>
                    224,98 $US
                    </h1>
                    <b className="priceOfCourseb">300,00 $US</b>
                </div>
                <div>
                    <VscChromeClose className = 'deletecart' size = '26' />

                </div>

            </div>
        </div>
    )
}

export default Productcart
