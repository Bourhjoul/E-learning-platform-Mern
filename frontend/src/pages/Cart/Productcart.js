
import React,{useRef,useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'

import { VscChromeClose } from "react-icons/all";
import './Cart.css'
import { removeFromCart } from '../../redux/actions/cartActions';

import { Link } from 'react-router-dom';
const Productcart = ({course}) => {
    
    const dispatch = useDispatch()
    const removeFromCartHandler = (id) =>{
        dispatch(removeFromCart(id))
    }
    return (
        <div className="productsoncart">
            <div className="productoncart">
                <div className="productImgCart">
                    <img className="imageCart" src={course.image}/>
                </div>
                
                <div className="productNameAFounder">
                     <Link to = {`/courses/${course.course}`}><b>{course.name}</b></Link>
                    <p>{course.shortdescription}</p>
                    <p>By {course.user.name}, {course.user.headline}</p>
                </div>
                <div className="priceOfCourse">
                    <h1 className = 'totalpriceCart'>
                    {course.price}$
                    </h1>
                    <b className="priceOfCourseb">300,00 $US</b>
                </div>
                <div>
                    <VscChromeClose className = 'deletecart' size = '26' onClick={() => removeFromCartHandler(course.course)} />

                </div>

            </div>
        </div>
    )
}

export default Productcart
