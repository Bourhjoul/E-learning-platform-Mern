import { Card, Rate } from 'antd'
import React from 'react'

const CourseCard = ({title,Creator,price,image,rating}) => {
    return (
        <div className = 'coursecard'>
            <Card
                style={{ width: 250,marginRight:'10px' }}
                 cover={<img style = {{height : '150px',objectFit : 'cover'}} alt="example" src="https://images.unsplash.com/photo-1551034549-befb91b260e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80" />} 
                                >
            <h3>{title ? title : 'C++ for beginners'}</h3>
                <h4>Creator</h4>
                <h4>$40</h4>
                <div className = 'rating'>
                <Rate disabled  width = '2' allowHalf defaultValue={2.5} />
                </div>
            </Card>
        </div>

    )
}

export default CourseCard