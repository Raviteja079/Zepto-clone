import React from "react";
import { Link } from "react-router-dom";
import classes from "./NavigationSection.module.css"

const NavigationSection = (props) => {

    const currentProduct = props.currentProduct
  
    return (
    <div>
      <p className={classes["navigation-text"]}>
        <span>
          <span>
            <Link className={classes["navigation-links"]} to={"/"}>
              Home
            </Link>
          </span>
          {">"}
        </span>
        <span>
          <span>
            <Link
              className={classes["navigation-links"]}
              to={`/sub-category/${currentProduct.categoryId}/${currentProduct.subCatId}`}
            >
              subCategory
            </Link>
          </span>
          {">"}
        </span>
        <span>
          <span>
            <Link className={classes["navigation-links"]} to="">
              {currentProduct.productName}
            </Link>
          </span>
          {">"}
        </span>
      </p>
    </div>
  );
};

export default NavigationSection;
