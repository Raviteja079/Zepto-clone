import React, { useState } from "react";
// import offersIcon from "./assets/cart/percent-image.png";
import offersIcon from "../assets/cart/percent-image.png"
import { VscTriangleRight } from "react-icons/vsc";
import CartAddresses from "../components/CartAddresses/CartAddresses";
import ModalComponent from "../components/Modal/Modal"
// import Button from "../components/Button/Button";
import Button from "./Button/Button";

const TotalCard = ({
  setDiscount,
  availableCoupons,
  discount,
  selectedAmount,
  offerPriceVar,
  originalPriceVar,
  toPayTotalVar,
}) => {
  const [couponModal, setCouponModal] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupons, setAppliedCoupons] = useState([]);

  const handlingCharges = 5.49;
  const platformFee = 2;
  const deliveryFee = 0;
  const openCouponModal = () => {
    setCouponModal(true);
  };

  const closeCouponModal = () => {
    setCouponModal(false);
  };

  const verifyCouponCode = (e) => {
    try {
      const coupon = availableCoupons.find(
        (coupon) => coupon.name === couponCode
      );
      if (appliedCoupons.includes(couponCode)) {
        alert("already applied this coupon");
        closeCouponModal();
      } else if (coupon) {
        setDiscount(parseInt(coupon.value));
        setAppliedCoupons([...appliedCoupons, couponCode]);
        closeCouponModal();
      } else {
        alert("Invalid coupon code");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleCouponChange = (e) => {
    try {
      const value = e.target.value;
      setIsButtonEnabled(value.trim().length);
      setCouponCode(value);
    } catch (err) {
      console.log(err.message);
    }
  };
  const orderCharges = {
    total: offerPriceVar,
    originalTotal: originalPriceVar,
    deliveryFee: deliveryFee || 0,
    tip: selectedAmount || 0,
    coupons: discount || 0,
    toPayTotal: toPayTotalVar,
  };
  return (
    <div className="total-card">
      <div className="coupons-offers-card">
        <div
          className="d-flex flex-column justify-content-center cart-coupons"
          onClick={openCouponModal}
        >
          <div className="cart-coupons-head">
            <img src={offersIcon} alt="offers-icon" className="offers-image" />
            <h5>Avail Offers / Coupons</h5>
          </div>
          {appliedCoupons.length !== 0 && (
            <div className="mt-2">
              <h6 className="applied-coupons-text">Applied Coupons</h6>
              {appliedCoupons.map((each) => {
                return (
                  <div>
                    <p className="coupon-name">{each}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <ModalComponent
          isOpen={couponModal}
          onClose={closeCouponModal}
          variant="variant1"
        >
          <div className="vouchers-container">
            <h5 className="redeem-voucher-heading">Redeem Coupons</h5>
            <p className="redeem-voucher-text">
              Select coupon code and apply it to get discount
            </p>
            <input
              placeholder="Enter Voucher Code"
              className="redeem-input-field"
              onChange={handleCouponChange}
            />
            <Button
              onClick={verifyCouponCode}
              disabled={!isButtonEnabled}
              className={
                !isButtonEnabled
                  ? "redeem-input-field"
                  : "redeem-input-field redeem-voucher-submit-btn"
              }>
              Submit
            </Button>
          </div>
        </ModalComponent>
        <VscTriangleRight className="right-angled-icon" />
      </div>
      <div className="cp-item-total">
        <div>
          <div className="item-total-row">
            <span>Item Total</span>
            <div className="order-total">
              <p className="total-original-price">₹{originalPriceVar}</p>
              <p className="total-discount-price">₹{offerPriceVar}</p>
            </div>
          </div>

          <div className="cp-fee-row">
            <span className="fee-type-text">Handling charge</span>
            <div>
              <span className="original-fee-type">₹15</span>
              <span className="discounted-fee-type">₹{handlingCharges}</span>
            </div>
          </div>
          <div className="cp-fee-row">
            <span className="fee-type-text">Platform Fee</span>
            <div>
              <span className="discounted-fee-type platform-fee">
                ₹{platformFee}
              </span>
            </div>
          </div>
          <div className="cp-fee-row">
            <span className="fee-type-text">Delivery Fee</span>
            <div>
              <span className="original-fee-type">₹25</span>
              <span className="discounted-fee-type">₹{deliveryFee}</span>
            </div>
          </div>
          {discount !== 0 && (
            <div className="cp-fee-row">
              <span className="fee-type-text">Coupon Discount</span>
              <div>
                <span className="discounted-fee-type platform-fee">
                  ₹{discount}
                </span>
              </div>
            </div>
          )}
          {selectedAmount !== 0 && (
            <div className="cp-fee-row">
              <span className="fee-type-text">Coupon Discount</span>
              <div>
                <span className="discounted-fee-type platform-fee">
                  ₹{selectedAmount}
                </span>
              </div>
            </div>
          )}
          <div className="to-pay-amount">
            <p className="cp-to-pay-text">To Pay</p>
            <p className="to-pay-amount-text">Rs {toPayTotalVar}</p>
          </div>
        </div>
      </div>
      <CartAddresses total={toPayTotalVar} orderCharges={{ ...orderCharges }} />
    </div>
  );
};

export default TotalCard;
