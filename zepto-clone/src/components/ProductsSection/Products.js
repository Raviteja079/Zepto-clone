import React from "react";
import classes from "./Products.module.css";
import { FaGreaterThan } from "react-icons/fa";
import ExploreByCategory from "../ExploreByCategory/ExploreByCategory";
import { Link } from "react-router-dom";
import Carousel from "../Carousel/Carousel";

export const Products = () => {
  

  return (
    <div>
      <div>
        <div className={classes.listHead}>
          <h4 className={classes["category-heading"]}>Products for you</h4>
          <button className={classes.seeAllBtn}>
            <Link
              to="/"
              className="text-decoration-none text-danger"
            >
              See All
              <FaGreaterThan />
            </Link>
          </button>
        </div>
        <Carousel />
        <div className={classes.listHead}>
          <h4 className={classes["category-heading"]}>Explore by Categories</h4>
        </div>
      </div>
      <ExploreByCategory />
    </div>
  );
};
