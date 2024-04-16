import React from "react";
import classes from "./HowItWorksSection.module.css"
import openApp from "../../assets/productDetailsPage/place-order.svg";
import enjoy from "../../assets/productDetailsPage/enjoy.svg";
import doNotBlink from "../../assets/productDetailsPage/do-not-blink.svg";

const HowItWorksSection = () => {
  return (
    <div className="d-flex flex-column align-items-start">
      <div>
        <h3 className={classes["how-it-works"]}>How it works</h3>
      </div>
      <div className="d-flex justify-content-start align-center mb-4">
        <div className={classes["icon-container"]}>
          <img
            className={classes["icon-image"]}
            src={openApp}
            alt="instruction-icon"
          />
        </div>
        <div className="d-flex flex-column">
          <h5 className={classes["how-it-works-heading"]}>Open the app</h5>
          <h6 className={classes["how-it-works-description"]}>
            Choose from over 7000 products across groceries, fresh fruits &
            veggies, meat, pet care, beauty items & more
          </h6>
        </div>
      </div>
      <div className="d-flex justify-content-center align-center mb-4">
        <div className={classes["icon-container"]}>
          <img
            className={classes["icon-image"]}
            src={doNotBlink}
            alt="instruction-icon"
          />
        </div>
        <div className="d-flex flex-column">
          <h5 className={classes["how-it-works-heading"]}>Place an order</h5>
          <h6 className={classes["how-it-works-description"]}>
            Add your favourite items to the cart & avail the best offers
          </h6>
        </div>
      </div>
      <div className="d-flex justify-content-center align-center mb-4">
        <div className={classes["icon-container"]}>
          <img
            className={classes["icon-image"]}
            src={enjoy}
            alt="instruction-icon"
          />
        </div>
        <div className="d-flex flex-column">
          <h5 className={classes["how-it-works-heading"]}>Get free delivery</h5>
          <h6 className={classes["how-it-works-description"]}>
            Experience lighting-fast speed & get all your items delivered in 10
            minutes
          </h6>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
