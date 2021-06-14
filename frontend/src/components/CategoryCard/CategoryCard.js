import React from "react";
import { Link } from "react-router-dom";
import "./CategoryCard.css";
const CategoryCard = ({ image, title }) => {
  return (
    <div className="CategoryCard">
      <Link to={`coursesfilter/${title}`}>
        <div className="limiter_img">
          <img src={image} alt="" />
        </div>
        <h2>{title}</h2>{" "}
      </Link>
    </div>
  );
};

export default CategoryCard;
