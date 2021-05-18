import React from 'react'
import './CategoryCard.css'
const CategoryCard = ({image,title}) => {
    return (
        <div className='CategoryCard'>
            <div className = 'limiter_img'>
                <img src={image} alt='' />
            </div>

            <h2>{title}</h2>
        </div>
    )
}

export default CategoryCard
