import React from "react";
import "./CustomerSupport.css";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

const CustomerSupport = () => {
  return (
    <div className="customer-support-tab">
      <div className="content-container">
        <h5 className="faq-heading">FAQs</h5>
        <ul>
          <li className="faq-list-item">
            <Link className="link-text">Coupons & Offers</Link>
            <FaAngleRight className="angle-right" />
          </li>
          <li className="faq-list-item">
            <Link className="link-text">General Inquiry</Link>
            <FaAngleRight className="angle-right" />
          </li>
          <li className="faq-list-item">
            <Link className="link-text">Payment Related</Link>
            <FaAngleRight className="angle-right" />
          </li>
          <li className="faq-list-item">
            <Link className="link-text">Feedback and Suggestions</Link>
            <FaAngleRight className="angle-right" />
          </li>
          <li className="faq-list-item">
            <Link className="link-text">Orders/Products Related</Link>
            <FaAngleRight className="angle-right" />
          </li>
          <li className="faq-list-item">
            <Link className="link-text">Zepto Super Over Campaign</Link>
            <FaAngleRight className="angle-right" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomerSupport;
