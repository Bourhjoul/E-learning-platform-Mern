import React,{useState, useRef} from 'react'

import Rating from './Rating'
import { Image } from 'antd';
import {Link } from 'react-router-dom'
import { IoIosArrowDown, AiFillPlayCircle, RiArrowUpSLine, RiArrowDownSLine} from 'react-icons/all'
const Collapsible = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const parentRef = useRef();
    if(parentRef.current) console.log(parentRef.current.scrollHeight)
    
    var i = 1;


    return (

        <div className="courseContent">
            
                    <div className="contentC"  onClick={() => setIsOpen(!isOpen)}>
                        <div className="iconCourseC">
                        {!isOpen ? <RiArrowDownSLine size="20" className="iconArrowDown"/> : <RiArrowUpSLine size="20" className="iconArrowDown" />} <b>{props.title}</b>
                        </div>
                        <div className="nbrSessionsCourseC">
                            <i>{props.sessions} sessions / {props.minutes}min</i>
                        </div>
                    </div>
                   
                    <div className= "contentOfSections-parent" ref={parentRef} style={isOpen ? {
                        height: parentRef.current.scrollHeight + 'px'
                    } : {height: "0px"}
                    }
                    >
                        <div className="contentOf">
                            <div className="sessionsContent">
                                <div className="sessionName">
                                    
                                        
                                       <Link to="/" className="session">{i++} - {props.content}</Link>
                                
                                        <Link to="/" className="session">{i++} - {props.content}</Link>
                                    
                                  
                                        <Link to="/" className="session">{i++} - {props.content}</Link>
                                     
                                        <Link to="/" className="session">{i++} - {props.content}</Link>
                                    
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                
    )
}

export default Collapsible
