import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Input, Popover ,Drawer, Button, Radio, Space} from 'antd';
import { CgShoppingCart,AiOutlineSearch,AiOutlineClose } from 'react-icons/all'
import {Link} from 'react-router-dom'
import useWindowDimensions from '../../useWindowDimensions';
const Navbar = () => {
    
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
                EDUSPACE
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
                    <button className='Btn' id='SignInbtn'>
                        <div id="spin"></div>
                        <Link className='linkinbtn'> Log in</Link>
                    </button>
                </div>}
            </nav>
            <Drawer
                    title="EDUSPACE"
                    placement={'left'}
                    closable={true}
                    onClose={onClose}
                    visible={visbile}
                    key={'left'}>
            <div className = 'onRightphone'>
                    <button className='Navbarbtns' id='Teacherbtn'>Become a Teacher</button>
                    <button className='Btn' id='SignInbtn'>
                        <div id="spin"></div>
                        <Link className='linkinbtn'> Log in</Link>
                    </button>
                   <h4>Most visited :</h4> <hr/>
                    {content}
            </div>

        </Drawer>

        </>
    )
}

export default Navbar
