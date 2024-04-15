import classes from "./Footer.module.css"
import React, { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import zeptoHome from "../../assets/Footer/Home_ActiveIcon.svg"
import categories from "../../assets/Footer/Categories_InactiveIcon.svg"
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
     const [pathname, setPathName] = useState("");
     const location = useLocation()

     useEffect(() => {
       const { pathname } = location;
       setPathName(pathname);
     }, [location]);

    
  return (
    !(pathname === "/cart") && (
      <div className={classes["footer-container"]}>
        <div className={classes["footer-inner-container"]}>
          <Link to="/" className={classes["icon-container"]}>
            <img
              src={zeptoHome}
              className={classes["footer-icon"]}
              alt="zeptoHome"
            />
            <p className={classes["footer-text"]}>Zepto</p>
          </Link>
          <Link to="/" className={classes["icon-container"]}>
            <img
              src={categories}
              className={classes["footer-icon"]}
              alt="categories"
            />
            <p className={classes["footer-text"]}>Categories</p>
          </Link>
          <Link
            to="/cart"
            className={`${classes["icon-container"]}`}
          >
            <BsCart3 />
            <p className={classes["footer-text"]}>Cart</p>
          </Link>
        </div>
      </div>
    )
  );
};

export default Footer;
