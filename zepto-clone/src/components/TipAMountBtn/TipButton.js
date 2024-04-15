import React, { useState } from "react";
import coinsImage from "../../assets/cart/5000.png";
import "./TipButton.css";

const TipButton = ({ amt, selectedAmount, setSelectedAmount }) => {
  const handleClick = () => {
    if (selectedAmount === amt) {
      setSelectedAmount(0); 
    } else {
      setSelectedAmount(amt); 
    }
  };

  return (
    <button
      className="tip-button"
      onClick={handleClick}
      style={{
        backgroundColor: selectedAmount === amt ? "lightgray" : "white",
      }}
    >
      <img src={coinsImage} alt="money" />
      <p className="tip-amount-text">₹{amt}</p>
    </button>
  );
};

export default TipButton;
