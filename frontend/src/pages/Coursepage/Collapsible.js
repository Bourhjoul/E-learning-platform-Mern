import React,{useState, useRef} from 'react'

import Rating from './Rating'
import { Image } from 'antd';
import {Link } from 'react-router-dom'
import { IoIosArrowDown, AiFillPlayCircle, RiArrowUpSLine, RiArrowDownSLine} from 'react-icons/all'
const Collapsible = ({section}) => {
    const [isOpen, setIsOpen] = useState(false)
    const parentRef = useRef();
    if(parentRef.current) console.log(parentRef.current.scrollHeight)
    
    var i = 1;


    return (

        <div className="courseContent">
            
                    <div className="contentC"  onClick={() => setIsOpen(!isOpen)}>
                        <div className="iconCourseC">
                        {!isOpen ? <RiArrowDownSLine size="20" className="iconArrowDown"/> : <RiArrowUpSLine size="20" className="iconArrowDown" />} <b>{section.name}</b>
                        </div>
                        <div className="nbrSessionsCourseC">
                            <i>x sessions / x min</i>
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
                            {section.lectures.map(lecture => (
                                <Link to="/" className="session">{i++} - {lecture.name}</Link>
                            ))}
                        
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                
    )
}

export default Collapsible
