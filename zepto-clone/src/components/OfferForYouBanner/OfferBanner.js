import React from "react";
import "./OfferBanner.css"
import offerBanner from "../../assets/offer-for-you-banner.png"
import { Link } from "react-router-dom";

const OfferBanner = () => {
  return <Link to="/"><img src={offerBanner} className="banner-image" alt="offer-banner" /></Link>;
};

export default OfferBanner;
