import React, { useEffect, useState } from "react";
import "./Orders.css";
import { Link } from "react-router-dom";
import emptyBag from "../../assets/cart/empty-bag.png";
import { useFirebase } from "../../firebase/firebase";
import { format } from "date-fns";

const Orders = () => {
  const [ordersArray, setOrdersArray] = useState([]);
  const { getSavedOrders, userRefId, setOrdersSaved } = useFirebase();

  const getOrderDetails = async () => {
    const result = await getSavedOrders(userRefId, setOrdersSaved);
    setOrdersArray(result);
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  const formatDate = (timestamp) => {
    const milliseconds =
      timestamp.seconds * 1000 + Math.round(timestamp.nanoseconds / 1e6);
    const date = new Date(milliseconds);
    const formattedDate = format(date, "M/d/yyyy, h:mm:ss a");
    return formattedDate;
  };

  return (
    <div className="main-container">
      <div className="cart-details-container">
        {ordersArray && ordersArray.length !== 0 ? (
          <div>
            {ordersArray.length!==0 &&ordersArray.map((each) => {
                const orderId = each[1].orderId
              const dateTime = formatDate(each[1].time);
              const items = each[1].products;
              let totalOrderCost = 0;
              let productNames = ""
              items.map((eachItem) => {
                productNames += eachItem.productData.productName
                totalOrderCost += eachItem.productData.qty * eachItem.productData.originalPrice
                return 1
              });

              return (
                <Link className="order-detailed-view-link" to={`/account/order-details/${orderId}`}>
                  <div className="order-container">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="products-details-text">{productNames}</h6>
                      <p className="products-details-text">
                        Rs. {totalOrderCost}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <p className="order-details-text">Order ID:{orderId}</p>
                        <p className="order-details-text">{dateTime}</p>
                      </div>
                      <div>
                        <button className="delivered-btn">Delivered</button>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="cart-content-container">
            <img src={emptyBag} alt="empty-bag" className="empty-bag" />
            <h6>your cart is empty</h6>
            <Link to="/">
              <button className="browse-products-btn">Browse Products</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
