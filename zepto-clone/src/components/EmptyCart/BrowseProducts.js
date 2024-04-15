import React from "react";
import "./BrowseProducts.css"
import { Link } from "react-router-dom";
import emptyBag from "../../assets/cart/empty-bag.png";


const BrowseProducts = () => {
  return (
    <div className="cart-content-container">
      <img src={emptyBag} alt="empty-bag" className="empty-bag" />
      <h6>your cart is empty</h6>
      <Link to="/">
        <button className="browse-products-btn">Browse Products</button>
      </Link>
    </div>
  );
};

export default BrowseProducts;
