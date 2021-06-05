import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Input, Popover ,Drawer, Button, Radio, Space, Dropdown} from 'antd';
import { CgShoppingCart,AiOutlineSearch,AiOutlineClose,RiArrowDropDownLine } from 'react-icons/all'
import {Link} from 'react-router-dom'
import useWindowDimensions from '../../useWindowDimensions';
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
const Navbar = () => {
    const { height, width } = useWindowDimensions()
    const [ showsearch, setshowsearch ] = useState(false)
    const [showicons, setshowicons] = useState(false)
    const { Search } = Input;
    const auth = useSelector(state => state.auth)
    const { user, isLogged } = auth
    const handleLogout = async () => {
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }
    const contentProfile = (
        <div className="Profilepobover"> 
          <Link to ="/profile">Profile</Link> <br />    
            <Link to="/" onClick={handleLogout}>Logout</Link><br />
            {user.Teacher && <Link to="/Mycourses">Dashboard</Link>}
        </div>
    );
    const contentProfilephone = (
        <div className="Profilepobover phonedropdown"> 
          <Link to ="/profile">Profile</Link> <br />    
          <Link to="/" onClick={handleLogout}>Logout</Link>
        </div>
         );
    const userLink = () => {
        return <Popover content={contentProfile} style={{ cursor: "pointer" }}>
            <Link to="/" className="avatar">
                <div className='dropdownic'>
                    <img src={user.avatar} className='profile_pic' /> {user.name}
                    <RiArrowDropDownLine  size='24' />
                </div>
             </Link>       
            </Popover> 
        }
    const userLinkDrawer = () => {
        return <Dropdown overlay = {contentProfilephone} trigger={['click']}>
                <div className='dropdownic' style = {{ margin: '20px 0px'}}>
                    <img src={user.avatar} className='profile_pic' alt = 'profilpic' /> {user.name}
                    <RiArrowDropDownLine  size='24' />
                </div> 
        </Dropdown>
     
        }
    

    const [visbile, setvisbile] = useState(false)
    const showDrawer = () => {
      setvisbile(true)
    };

    const onClose = () => {
        setvisbile(false)
    };



    const content = (
                <div className = 'Categoriespobover'>
                    <Link>Devlopement</Link> <br />
                    <Link>Marketing</Link><br />
                    <Link>Design</Link><br />
                    <Link>Education</Link><br />
                    <Link>Photography</Link><br />
                    <Link>Music</Link><br />
                    <Link>Self Devlopement</Link><br />
                    <Link>Business</Link><br />
                    <Link>Cg 1</Link><br />
                    <Link>Cg 1</Link><br />
                </div>
    );
    useEffect(() => {
        if (width < 788) {
            setshowicons(true)
        } else {
            setvisbile(false)
            setshowicons(false)
        }
        return () => {
        }
    }, [width])
    const Activateburger = () => {
        showDrawer();
    }
    return (
        <>
            <nav className='navbar'>
            <div className='burger' onClick ={Activateburger}>
                <div className = 'line1'></div>
                <div className = 'line2'></div>
                <div className = 'line3'></div>
            </div>
            <div className='logo'>
                <Link to="/" ><img src = 'https://i.imgur.com/4jq68uE.png' alt = 'Logo' className = 'logo_header'/></Link>
            </div>
            {showicons &&
                <div className = 'Phoneonright'>
                    { showsearch ? <AiOutlineClose size='24' color='#1890ff' onClick= {() => setshowsearch(!showsearch)} /> : <AiOutlineSearch size='24' color='#1890ff' onClick= {() => setshowsearch(!showsearch)} /> }
                    <CgShoppingCart size='24' color='#1890ff' />
                    <div className = {showsearch ? 'searchactive' : 'searchphone'}>
                       <Search
                        placeholder="Search"
                        allowClear
                        enterButton
                        size="large"
                       />
                    </div>
 
                </div>
           

            }
            <div className = 'search_box'>
                <Search
                    placeholder="Search"
                    allowClear
                    enterButton
                    size="large"
                />
            </div>
            {!showicons &&
                <div className='Onright'>
                    <button className='Navbarbtns' id='Teacherbtn'>Become a Teacher</button>
                    <Popover content={content} style={{ cursor: "pointer" }}>
                        <button className='Navbarbtns' id='Categoriesbtn'>Categories</button>
                    </Popover>
                        <CgShoppingCart size='22' className='carticon' />
                    {/* <ul style={transForm}> */}
                    {
                         isLogged 
                         ?  userLink()
                         : 
                             <button className='Btn' id='SignInbtn'>
                                  <div id="spin"></div>
                            <Link to='/login' className='linkinbtn'> Log in</Link>
                            </button>
                    }
                {/* </ul> */}
                </div>}
            </nav>
            {showicons &&
                <Drawer
                    title="EDUSPACE"
                    placement={'left'}
                    closable={true}
                    onClose={onClose}
                    visible={visbile}
                    key={'left'}>
            <div className = {isLogged ? '' : 'onRightphone'}>
                    <button className='Navbarbtns' id='Teacherbtn'>Become a Teacher</button>
                        { isLogged 
                         ?  userLinkDrawer()
                         :
                    <button className='Btn' id='SignInbtn'>
                        <div id="spin"></div>
                       <Link to='/login' className='linkinbtn'> Log in</Link>
                    </button>
                    }
                   <h4>Most visited :</h4> <hr/>
                    {content}
            </div>

                </Drawer> 
            }


        </>
    )
}

export default Navbar
