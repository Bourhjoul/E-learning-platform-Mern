import React, { useRef, useState } from "react";
import Rating from "./Rating";

import { BiLike, BiDislike } from "react-icons/all";
const Comments = ({ commentPerson, commentMessage, rating, date }) => {
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [backgroundDisColor, setBackgroundDisColor] = useState("white");

  return (
    <div className="comments">
      <div className="comment">
        <div className="commentName">
          <h3>{commentPerson}</h3>
        </div>
        <div className="commentRating">
          <Rating value={rating} />
          <i className="commentDate">( {date} )</i>
        </div>
        <div className="commentParagraph">
          <p>{commentMessage}</p>
        </div>
        <div className="likeOrDislike">
          <BiLike style={{ background: backgroundColor }} className="bilike" />
          <BiDislike
            style={{ background: backgroundDisColor }}
            className="bidislike"
          />
        </div>
      </div>
      <br></br>
      <hr></hr>
      <br></br>
    </div>
  );
};

export default Comments;
