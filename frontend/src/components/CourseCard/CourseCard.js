import React from 'react'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Productcart from './Productcart'
import { Input, Space } from 'antd';
import './CourseCard.css'


const CourseCard = () => {
   

    const { Search } = Input;

    return (
        <>
        
        
        <div className ='cartfull'>
        <div className = 'cart'>
            <h1>3 courses in your cart</h1>
            <div className ='productsoncart'>
                <Productcart />
            
            
                <Productcart />
           
            
                <Productcart />
            
                </div>
        </div>
        
        <div className = 'totalcart'>
            <h3 className="totalName">
            Total :

            </h3>
            <b className = 'totalprice'>
            224,98 $US
            </b>
            <br></br>
            <b className="pricebefore">600,00 $US</b>
            
            <button className = 'validationBtn'>
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
        
        </>
    )
}

export default CourseCard
