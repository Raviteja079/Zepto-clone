import React from "react";
import "./Referrals.css"
import whatsapp from "../../assets/Profile/whatsapp.svg"
import share from "../../assets/Profile/share.svg"

const Referrals = () => {
 return (
   <div className="manage-referrals-container">
     <h5 className="offer-text">25% off for you and 15% off for them!</h5>
     <div className="working-container">
       <h5 className="working-head">How it works</h5>
       <ul>
         <li className="working-list-text">
           Share the referral link
           <span className="bold-text"> with your friend</span>
         </li>
         <li className="working-list-text">
           After your friend places their firstorder, you
           <span className="bold-text">get 25% off</span>
           upto Rs.200 on your next order
         </li>
         <li className="working-list-text">
           Upon 10 successfull referrals, <span>you can earn Rs.2000</span>
           <span className="bold-text">with your friend</span>
         </li>
       </ul>

       <a
         href="https://api.whatsapp.com/send?text=
         Hey!%20Check%20out%20Zepto%20-%20a%20grocery
         %20delivery%20app%20that%20delivers%20over%
         207000%20products%20in%2010%20minutes!%20Use%
         20my%20code%20XHFADB%20to%20sign%20up%20and%
         20get%2015%25%20off%20on%20your%20first%20order.
         %0ADownload%20now:%20https://zepto.onelink.me/95tn/607493a2"
         className="button-container"
       >
         <button className="share-btn">
           <img src={whatsapp} alt="whatsapp" />
           Invite via Whatsapp
         </button>
       </a>
       <div className="button-container">
         <button className="share-btn">
           <img src={share} alt="invite" />
           Share invite link
         </button>
       </div>

       <div className="bottom-section">
         <hr />
         <div className="referral-head-container">
           <h5 className="referral-head">Your Referrals</h5>
         </div>
         <p>No referrals yet. Share with your friend to start saving</p>
       </div>
     </div>
   </div>
 );
};

export default Referrals;
