import React,{useState, useRef} from 'react'
import { Radio, Checkbox  } from 'antd';

import './CollapsibleFilter.css'
import { Image } from 'antd';
import {Link } from 'react-router-dom'
import { IoIosArrowDown, AiFillPlayCircle, RiArrowUpSLine, RiArrowDownSLine,BsStarFill, BsStarHalf, BsStar} from 'react-icons/all'
const CollapsibleFilter = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const parentRef = useRef();
    if(parentRef.current) console.log(parentRef.current.scrollHeight)
    
    var i = 1;


    const [value, setValue] = React.useState(1);

    const onChange = e => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    };
    return (

        <div className="courseContentFilter">
            
                    <div className="contentCFilter"  onClick={() => setIsOpen(!isOpen)}>
                        <div className="iconCourseCFilter">
                        {!isOpen ? <RiArrowDownSLine size="20" className="iconArrowDownFilter"/> : <RiArrowUpSLine size="20" className="iconArrowDownFilter" />} <b>{props.title}</b>
                        </div>
                        
                    </div>
                   
                    <div className= "contentOfSections-parent" ref={parentRef} style={isOpen ? {
                        height: parentRef.current.scrollHeight + 'px'
                    } : {height: "0px"}
                    }
                    >
                        <div className="contentOfFilter">
                            <div className="sessionsContentFilter">
                                
                                <div className="sessionNameFilter">
                                {props.value == 1 ?
                                       
                                            <form onChange={onChange} value={value}>
                                                <input type="radio" name="rating" value={1} id="rate" /> <label for="rate"><span className="start"><BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStarHalf /></span> 4.5 & up</label><br></br>
                                                <input type="radio" name="rating" value={2} id="rate1" /> <label for="rate1"><span className="start"><BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStar /></span> 4.0 & up</label><br></br>
                                                <input type="radio" name="rating" value={3}  id="rate2" /> <label  for="rate2"><span className="start"><BsStarFill /><BsStarFill /><BsStarFill /><BsStarHalf /><BsStar /></span> 3.5 & up</label><br></br>
                                                <input type="radio" name="rating" value={4} id="rate3" /> <label  for="rate3"><span className="start"><BsStarFill /><BsStarFill /><BsStarFill /><BsStar /><BsStar /></span> 3.0 & up</label><br></br>
                                            </form>
                                            
                                       
                                       : null}
                                    
                                </div>

                                <div className="sessionNameFilter">
                                {props.value == 2 ?
                                       <form  onChange={onChange} value={value}>
                                            <Checkbox onChange={onChange}>HTML</Checkbox><br></br>
                                            <Checkbox onChange={onChange}>CSS</Checkbox><br></br>
                                            <Checkbox onChange={onChange}>Javascript</Checkbox> <br></br>
                                            <Checkbox onChange={onChange}>Python</Checkbox> <br></br>
                                            <Checkbox onChange={onChange}>NodeJS</Checkbox> <br></br>
                                            <Checkbox onChange={onChange}>ReactJS</Checkbox> <br></br>
                                            <Checkbox onChange={onChange}>Kotlin</Checkbox> <br></br>
                                            <Checkbox onChange={onChange}>Flutter</Checkbox> <br></br>
                                            <Checkbox onChange={onChange}>MongoDB</Checkbox> <br></br>
                                            <Checkbox onChange={onChange}>MernStack</Checkbox> <br></br>
                                            <Checkbox onChange={onChange}>Mevn</Checkbox> <br></br>
                                            <Checkbox onChange={onChange}>Laravel</Checkbox> <br></br>
                                            <Checkbox onChange={onChange}>-.-</Checkbox> <br></br>
                                        </form>
                                       : null}
                                    
                                </div>

                                <div className="sessionName">
                                {props.value == 3 ?
                                       <form  onChange={onChange} value={value}>
                                       <Checkbox onChange={onChange}>Web Development</Checkbox><br></br>
                                       <Checkbox onChange={onChange}>Other in IT & Software</Checkbox><br></br>
                                       <Checkbox onChange={onChange}>Web Design</Checkbox> <br></br>
                                       <Checkbox onChange={onChange}>Entrepreneurship</Checkbox> <br></br>
                                       <Checkbox onChange={onChange}>Software Engineering</Checkbox> <br></br>
                                       
                                   </form>
                                       : null}
                                    
                                </div>




                                <div className="sessionName">
                                {props.value == 4 ?
                                       <form  onChange={onChange} value={value}>
                                       <Checkbox onChange={onChange}>Paid</Checkbox><br></br>
                                       <Checkbox onChange={onChange}>Free</Checkbox><br></br>
                                       
                                      
                                       
                                   </form>
                                       : null}
                                    
                                </div>


                                
                                
                            </div>

                            
                        </div> 

                        
                    </div>
                </div>
                
    )
}

export default CollapsibleFilter
