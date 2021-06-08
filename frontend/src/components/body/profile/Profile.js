import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {isMatch,isLength} from '../../utils/validation/Validation'
import {showSuccessMsg, showErrMsg} from '../../utils/notification/Notification'
import {fetchAllUsers, dispatchGetAllUsers,dispatchGetAllUsersRequest} from '../../../redux/actions/usersAction'
import axios from 'axios'
import HashLoader from "react-spinners/HashLoader";
import './profile.css'
import {FaTimes} from 'react-icons/all'
import { Table, Button,Divider, Tag, Skeleton } from 'antd';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import {listMyCourses} from '../../../redux/actions/courseActions'
import {Link} from 'react-router-dom'
import Error from '../../utils/Error'
const { Column, ColumnGroup } = Table;
const Profile = () => {
    let crs = []
    const initialState = {
        name : "",
        email: "",
        password: "",
        cf_password: ""
    }
    const [avatar,setAvatar] = useState(false)
    const [data,setData] = useState(initialState)
    const [loadingUsers,setLoadingUsers] = useState(false)
    
   
    const [size,setSize] = useState('small')
    const {name,email,password,cf_password, err, success} = data
    const token = useSelector(state => state.token)
    const auth = useSelector(state => state.auth)
    const usersInfo = useSelector(state => state.usersInfo)
    const {loadingtab,users} = usersInfo
    const [callback, setCallback] = useState(false)
    const ListMyCoursesReducer = useSelector(state => state.ListMyCoursesReducer)
    const { loading, courses, error } = ListMyCoursesReducer

    
    const {isLogged,user,isAdmin} = auth
    const dispatch = useDispatch()
    useEffect(() => {
      if(isAdmin){
        dispatch(dispatchGetAllUsersRequest())
         fetchAllUsers(token).then(res => {    
          dispatch(dispatchGetAllUsers(res))
        })
      }
    }, [token,isAdmin,dispatch,callback])

    useEffect(() => {
      if (isLogged && user.Teacher) {
          dispatch(listMyCourses())
        }
    }, [dispatch, isLogged, user.Teacher])
  
    if (!loading && !error) {
      courses.forEach((element,index) => {
      crs.push({
        key : index,
        name: element.name,
        price: element.price,
        rating: element.rating,
        nmbr_stu: element.numStudents,
        category : element.category
      })
  });
}
    

   const handleChange = async(e) => {
        setData({...data, [e.target.name] : e.target.value , err : '',success : ''})
      }
      const changeAvatar = async(e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if(!file) return setData({...data, err: "No files were uploaded." , success: ''})

            if(file.size > 1024 * 1024)
                return setData({...data, err: "Size too large." , success: ''})

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return setData({...data, err: "File format is incorrect." , success: ''})

            let formData =  new FormData()
            formData.append('file', file)

            setLoadingUsers(true)
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoadingUsers(false)
            setAvatar(res.data.url)
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

   const updateInfor = () => {
        try {
          axios.patch('/user/update', {
            name: name ? name : user.name,
            avatar: avatar ? avatar : user.avatar
        },{
            headers: {Authorization: token}
        })
            setData({ ...data,  err: '',success: 'Update success !'})
        } catch (err) {
          setData({ ...data,  err: err.response.data.msg ,success: ''})
        }
      }
  const updatePassword = () => {
      if(isLength(password))
        return  setData({ ...data,  err: 'Password must be at least 6 characters.' , success: ''})
        
      if(!isMatch(password, cf_password))
        return  setData({ ...data,  err: 'Password did not match' , success: ''})

      try {
          axios.post('/user/reset',{password},{
            headers : {Authorization: token}
          })
          setData({...data, err: '' , success: "Updated Success!"})
        } 
      catch (err) {
          setData({ ...data,  err: err.response.data.msg ,success: ''})
        }
      }
      const handleUpdate = () => {
        if(name || avatar) updateInfor()
        if(password) updatePassword()
      }
      const handleDelete = async (id) => {
        try {
            if(user._id !== id){
                if(window.confirm("Are you sure you want to delete this account?")){
                    setLoadingUsers(true)
                    await axios.delete(`/user/delete/${id}`, {
                        headers: {Authorization: token}
                    })
                    setLoadingUsers(false)
                    setCallback(!callback)
                }
            }
            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }
    return (
      <>
        <div>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
        </div>
        <div className="profile-page">
            <div className="col-left">
                    <h2>{isAdmin ? "Admin Profile" : "User Profile" }</h2>
                    {loadingUsers && <div className='loading'>
                            <HashLoader   color={"#1e1e2c"}  loading={loadingUsers} size={40} />
                              </div>}
                    <div className={loadingUsers ? 'disable-avatar' : 'avatar'}>
                        <img alt = 'profile_pic' src={avatar ? avatar : user.avatar}/>
                        <span>
                        <i className="fas fa-camera"></i>
                        <p>Change</p>
                        <input type="file" name="file" id="file_up" onChange={changeAvatar}/>
                       </span>
                    </div>
                        <div>
                    <em style={{color: "crimson"}}> 
                    *Chose your picture then click update to apply the change
                    </em>
                </div>
                    <div className="form-group">
                        <label>Name </label>
                        <input type="text" name="name" defaultValue={user.name} placeholder="Your name" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Email </label>
                        <input type="text" name="email" defaultValue={user.email} placeholder="Your email address" disabled/>
                    </div>
                    <div className="form-group">
                        <label>New Password </label>
                        <input type="password" name="password" value={password} placeholder="Your password" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password </label>
                        <input type="password" name="cf_password" value={cf_password} placeholder="Confirm password" onChange={handleChange} />
                    </div>                          
            <button className="btn-update" disabled={loadingUsers} onClick={handleUpdate}>Update</button>
            </div>
            <div className="col-right">
                <h2>{isAdmin ? "Users" : "My Courses"}</h2>
                {loadingtab &&  <div className='loading'>
                            <HashLoader   color={"#1e1e2c"}  loading={loadingtab} size={40} />
                        </div> } 
                        {isAdmin ?  
                         <Table dataSource={users}>  
                         <Column title="Id" dataIndex="_id" key="_id" />
                         <Column title="Name" dataIndex="name"  />
                         <Column title="Email" dataIndex="email"  />
                         <Column title="Admin" dataIndex="role" key="role"
                            render={role => (
                             <span>
                              {
                                role === 1
                                ? <div className ='admin'>YES</div>
                                : <div className ='notadmin'>NO</div>
                              }
                             </span>
                           )}
                         />
                       <Column
                         title="Action"
                         dataIndex="_id"
                         key="_id"
                         render={(_id) => (
                           <span>
                              <Link to={`/edit_user/${_id}`}>
                                  <Button className="btn-edit" 
                                   type="primary"  
                                   shape="round" icon = {<EditOutlined  />} size={size} >edit</Button>
                              </Link>            
                              <Button className="btn-delete"  onClick={() => handleDelete(_id)} type="danger" shape="round" icon = {<DeleteOutlined  />} size={size}>DELETE</Button>
                           </span>
                         )}
                       />
                     </Table>
                     : loading ? <Skeleton active /> : error ? <Error error = {error} /> :
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
                               shape="round" icon = {<EditOutlined  />} size= 'small' >EDIT</Button>
                          </Link>
                          <Button className="btn-delete"   type="danger" shape="round" icon = {<DeleteOutlined  />} size='small'>DELETE</Button>
                       </span>
                     )}
                   />
                  </Table>
            }
               
            
            </div>
        </div>
        </>
    )
}

export default Profile
