import { Card, Rate } from 'antd'
import React from 'react'
import  {Link} from 'react-router-dom' 
const CourseCard = ({ course }) => {
    
    return (
        <div className = 'coursecard'>
            <Card
                style={{ width: 250,marginRight:'10px' }}
                 cover={<img style = {{height : '150px',objectFit : 'cover'}} alt="example" src={course.image} />} 
                >
                <h3>
                    <Link to = {`/courses/${course._id}`}>
                    {course.name}
                    </Link>
                </h3>
                <h4>{course.user.name}</h4>
                <h5>${course.price}</h5>
                <div className = 'rating'>
                <Rate disabled  width = '2' allowHalf value={course.rating} />
                </div>
            </Card>
        </div>

    )
}

export default CourseCard