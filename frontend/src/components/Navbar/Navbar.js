import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Input, Popover ,Drawer, Button, Radio, Space} from 'antd';
import { CgShoppingCart,AiOutlineSearch,AiOutlineClose } from 'react-icons/all'
import {Link} from 'react-router-dom'
import useWindowDimensions from '../../useWindowDimensions';
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
const Navbar = () => {
    const auth = useSelector(state => state.auth)
    const {user,isLogged} = auth
    const handleLogout = async () => {
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }
    const userLink = () => {
        return <li className="drop-nav">
            <Popover content={contentProfile} style={{ cursor: "pointer" }}>
             <Link to="/" className="avatar"> 
             <img src= {user.avatar}/> {user.name}  <i className="fas fa-angle-down"></i>
             </Link>       
             </Popover>
             </li>       
        }
    const userLinkDrawer = () => {
        return <li className="drop-nav"> 
             <img src={user.avatar}/>
             <h4> {user.name} <i className="fas fa-angle-down"></i> <hr/> </h4>
             {contentProfile} 
                 
             </li>       
        }
        const transForm = {
                          transform: isLogged ? "translateY(-5px)" : "translateY(8px)"
                      }
    

    const [visbile, setvisbile] = useState(false)
    const showDrawer = () => {
      setvisbile(true)
    };

    const onClose = () => {
        setvisbile(false)
    };

    const { height, width } = useWindowDimensions()
    const [ showsearch, setshowsearch ] = useState(false)
    const [showicons, setshowicons] = useState(false)
    const { Search } = Input;
    const contentProfile = (
        <div className="Profilepobover"> 
          <Link to ="/profile">Profile</Link> <br />    
          <Link to="/" onClick={handleLogout}>Logout</Link>
        </div>
         );
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
                <Link to="/" >EDUSPACE</Link>
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
                    <ul style={transForm}>
                    {
                         isLogged 
                         ?  userLink()
                         : 
                             <button className='Btn' id='SignInbtn'>
                                  <div id="spin"></div>
                            <Link to='/login' className='linkinbtn'> Log in</Link>
                            </button>
                    }
                </ul>
                </div>}
            </nav>
            <section>

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
            </section>

        </>
    )
}

export default Navbar
