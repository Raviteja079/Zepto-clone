import React from "react";
import "./Banner.css"
import banner from "../../assets/banner.webp";
import { Link } from "react-router-dom";


export const BannerSecion = () => {
  return (
    <Link to="/" className="bannerImageContainer">
      <img src={banner} className="bannerImage" alt="banner" />
    </Link>
  );
};
