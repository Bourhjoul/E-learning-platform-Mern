import React,{useState, useRef, useEffect} from 'react'
import { Radio, Checkbox  } from 'antd';
import { useDispatch } from 'react-redux';
import './CollapsibleFilter.css'
import { Image } from 'antd';
import { Link, useParams } from "react-router-dom";
import { IoIosArrowDown, AiFillPlayCircle, RiArrowUpSLine, RiArrowDownSLine,BsStarFill, BsStarHalf, BsStar} from 'react-icons/all'
import { LisCoursesbyrating, ListCoursesbyprice } from '../../redux/actions/courseActions';
import {GET_CRSRATING_RESET,GET_CRSPRICE_RESET} from "../../redux/constants/courseconstants";
const CollapsibleFilter = (props) => {
    let { topic } = useParams();
    const [isOpen, setIsOpen] = useState(false)
    const parentRef = useRef();
    if(parentRef.current) console.log(parentRef.current.scrollHeight)
    
    var i = 1;

     const dispatch = useDispatch()
    const [price, setPrice] = useState();
    const [rating, setRating] = useState();

    const handleRating = async (e) => {
        console.log('Rate Value', e.target.value);
        setRating(e.target.value);
    }
    const handlepric = async (e) => {
        console.log('Price Value', e.target.value);
        setPrice(e.target.value);
    }
    
    useEffect(() => {
        if(rating){
        dispatch(LisCoursesbyrating(topic,{rating}))
        console.log("Topic - rating dispatch : ",topic,rating);
        dispatch({type : GET_CRSPRICE_RESET});
    }
    if(price){
        dispatch(ListCoursesbyprice(topic,{price}))
        dispatch({type : GET_CRSRATING_RESET});
    }
        return () => {};
    }, [dispatch,rating,price]);
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
                                       
                                            <form onChange={handleRating} value={rating}>
                                                <input type="radio" name="rating" value={4.5} id="rate" /> <label for="rate"><span className="start"><BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStarHalf /></span> 4.5 & up</label><br></br>
                                                <input type="radio" name="rating" value={4} id="rate1" /> <label for="rate1"><span className="start"><BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStar /></span> 4.0 & up</label><br></br>
                                                <input type="radio" name="rating" value={3.5}  id="rate2" /> <label  for="rate2"><span className="start"><BsStarFill /><BsStarFill /><BsStarFill /><BsStarHalf /><BsStar /></span> 3.5 & up</label><br></br>
                                                <input type="radio" name="rating" value={3} id="rate3" /> <label  for="rate3"><span className="start"><BsStarFill /><BsStarFill /><BsStarFill /><BsStar /><BsStar /></span> 3.0 & up</label><br></br>
                                            </form>
                                            
                                       
                                       : null}
                                    
                                </div>

                                <div className="sessionName">
                                {props.value == 2 ?
                                       <form  onChange={handlepric} value={price}>
                                       <input type="radio" name="price" value={1}/> <label for="price1">Paid</label> <br/>
                                       <input type="radio" name="price"value={0} /><label for="free"> Free</label>
                                    
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
