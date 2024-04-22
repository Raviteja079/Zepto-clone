import React from "react";
import TipButton from "../components/TipAMountBtn/TipButton";


const TipsCard = ({selectedAmount,setSelectedAmount}) => {
  return (
    <div className="tips-card">
      <h5 className="delivery-feature-heading">Delivery Partner Tip</h5>
      <p className="delivery-feature-description">
        The Entire amount will be sent to your delivery partner
      </p>
      <div className="tip-amounts">
        <TipButton
          amt={10}
          selectedAmount={selectedAmount}
          setSelectedAmount={setSelectedAmount}
        />
        <TipButton
          amt={20}
          selectedAmount={selectedAmount}
          setSelectedAmount={setSelectedAmount}
        />
        <TipButton
          amt={35}
          selectedAmount={selectedAmount}
          setSelectedAmount={setSelectedAmount}
        />
        <TipButton
          amt={50}
          selectedAmount={selectedAmount}
          setSelectedAmount={setSelectedAmount}
        />
      </div>
    </div>
  );
};

export default TipsCard;
