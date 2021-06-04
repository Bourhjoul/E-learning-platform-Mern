import React, { useEffect } from 'react'
import { Table, Tag, Button } from 'antd';
import { Link } from 'react-router-dom'
import {listMyCourses} from '../../redux/actions/courseActions'
import {AiOutlineEdit,TiDeleteOutline} from 'react-icons/all'
import { useDispatch, useSelector } from 'react-redux';
const Mycourses = ({history}) => {
    const { Column } = Table;
    let crs = []
    const dispatch = useDispatch()
    const ListMyCoursesReducer = useSelector(state => state.ListMyCoursesReducer)
    const { loading, courses, error } = ListMyCoursesReducer
    const auth = useSelector(state => state.auth)
    const { user, isLogged } = auth

    useEffect(() => {
      if (isLogged && user.Teacher) {
          dispatch(listMyCourses())
        }
    }, [dispatch,isLogged,user.Teacher])

  if (!loading && !error) {
                courses.forEach((element,index) => {
            crs.push({
                key : index,
                name: element.name,
                price: element.price,
                rating: element.rating,
                nmbr_stu: element.numStudents,
                category : element.category[0]
            })
            });
  }
    // const crs = [

    //   {
    //     key: '1',
    //     name: 'Learn React',
    //     price: 302,
    //     rating: '2.4',
    //     nmbr_stu: '1000',
    //     category: 'tech'
    //   },
    //   {
    //     key: '2',
    //     name: 'Learn Vuejs',
    //     price: 32,
    //     rating: '4.5',
    //     nmbr_stu: '10050',
    //     category: 'tech'
    //   },

    // ];
  return (
  <>
    {(!loading) &&
       <Table dataSource={crs}>  
                     <Column title="Name" dataIndex="name" key="_id" />
                     <Column title="Price" dataIndex="price" key="price" />
                     <Column title="Category" dataIndex="category"  />
                     <Column title="Number of students" dataIndex="nmbr_stu"  />
                     <Column title="Rating" dataIndex="rating" key="rating"/>
                   <Column
                     title="Action"
                     dataIndex="_id"
                     key="_id"
                     render={(_id) => (
                       <span>
                          <Link to={`/edit_user/${_id}`}>
                              <Button className="btn-edit" 
                               type="primary"  
                               shape="round" icon = {<AiOutlineEdit  />} size= 'small' >EDIT</Button>
                          </Link>
                          <Button className="btn-delete"   type="danger" shape="round" icon = {<TiDeleteOutline  />} size='small'>DELETE</Button>
                       </span>
                     )}
                   />
            </Table>
      }
      </>
           
    )
}

export default Mycourses
