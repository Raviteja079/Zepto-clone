import React from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../../firebase/firebase";
import {formatDate} from "../../utils/order"
import "./OrderDetails.css";

const OrderDetails = () => {
  const { orderId } = useParams();
  const { ordersSaved } = useFirebase();


  let dateTime,
    currentOrder,
    products,
    deliveryFee,
    tip,
    coupons,
    totalOfferPrice,
    totalOriginalPrice,
    toPayTotal

  try {
    currentOrder = ordersSaved.filter((each) => each[1].orderId === orderId);
    currentOrder = currentOrder[0];
    products = [...currentOrder[1].products];
    dateTime = formatDate(currentOrder[1].time);
    deliveryFee = currentOrder[1].deliveryFee;
    tip = currentOrder[1].tip;
    coupons = currentOrder[1].coupons;
    totalOfferPrice = currentOrder[1].total;
    totalOriginalPrice = currentOrder[1].originalTotal;
    toPayTotal = currentOrder[1].toPayTotal
  } catch (err) {
    console.log(err);
  }

  return (
    <div className="order-details-container w-100">
      <div className="d-flex justify-content-between w-100 mb-3">
        <div className="d-flex flex-column justify-content-start">
          <h6 className="order-id">ORDER ID: {orderId}</h6>
          <p className="detailed-cart-item-text">{dateTime}</p>
        </div>
        <div>
          <button className="delivery-btn">Delivered</button>
        </div>
      </div>
      {products.map((each) => {
        const productData = each.productData;
        return (
          <div className="d-flex cart-item-row w-100  mb-3">
            <div className="w-100 d-flex align-items-center">
              <img
                src={productData.image}
                className="cart-item-image"
                alt="product"
              />
              <div className="d-flex flex-column w-100">
                <div className="product-price">
                  <p className="mb-0">{productData.productName}</p>
                  <div className="od-price-container">
                    <h6 className="mb-0">Rs.{productData.offerPrice}</h6>
                  </div>
                </div>
                <div className="weight-quantity">
                  <p className="detailed-cart-item-text">
                    {productData.quantity}
                  </p>
                  <p className="detailed-cart-item-text">
                    Qty:{productData.qty}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="mt-3">
        <div className="item-total-row">
          <span>Item Total</span>
          <div className="order-total">
            <p className="total-original-price">₹{totalOriginalPrice}</p>
            <p className="total-discount-price">₹{totalOfferPrice}</p>
          </div>
        </div>
        <div className="cp-fee-row">
          <span className="fee-type-text">Handling charge</span>
          <div>
            <span className="original-fee-type">₹15</span>
            <span className="discounted-fee-type">₹{5.49}</span>
          </div>
        </div>
        <div className="cp-fee-row">
          <span className="fee-type-text">Platform Fee</span>
          <div>
            <span className="discounted-fee-type platform-fee">₹{2}</span>
          </div>
        </div>
        {coupons !== 0 && (
          <div className="cp-fee-row">
            <span className="fee-type-text">Coupon discount</span>
            <div>
              <span className="discounted-fee-type platform-fee">
                ₹{coupons}
              </span>
            </div>
          </div>
        )}
        {tip !== 0 && (
          <div className="cp-fee-row">
            <span className="fee-type-text">Tip amount</span>
            <div>
              <span className="discounted-fee-type platform-fee">₹{tip}</span>
            </div>
          </div>
        )}
        <div className="cp-fee-row">
          <span className="fee-type-text">Delivery Fee</span>
          <div>
            <span className="original-fee-type">₹25</span>
            <span className="discounted-fee-type">₹{deliveryFee}</span>
          </div>
        </div>
        <div className="to-pay-amount">
          <p className="cp-to-pay-text">To Pay</p>
          <p className="to-pay-amount-text">Rs {toPayTotal}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
