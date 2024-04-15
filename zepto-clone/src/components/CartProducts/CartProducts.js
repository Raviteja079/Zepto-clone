import ProductItem from "../ProductItem/ProductItem";
import "./CartProducts.css";
import React, { useEffect, useState } from "react";
import banner from "../../assets/cart/delivery-banner-icon.svg";
import offersIcon from "../../assets/cart/percent-image.png";
import { VscTriangleRight } from "react-icons/vsc";
import CartAddresses from "../CartAddresses/CartAddresses";
import { firestore, useFirebase } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import TipButton from "../TipAMountBtn/TipButton";
import DeliveryInstructions from "../DeliveryInstruction/DeliveryInstruction";
import ModalComponent from "../Modal/Modal";
import Button from "../Button/Button";
import { collection, getDocs } from "firebase/firestore";

const CartProducts = () => {
  const { cartProductsList, getAllCartProducts } = useFirebase();
  const [couponModal, setCouponModal] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupons, setAppliedCoupons] = useState([]);
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(0);

  const handlingCharges = 5.49;
  const platformFee = 2;
  const deliveryFee = 0;

  useEffect(() => {
    const getCoupons = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "coupons"));
        const coupons = [];
        querySnapshot.forEach((doc) => {
          const { couponCode } = doc.data();
          coupons.push({
            name: couponCode.name,
            value: couponCode.value,
          });
        });
        setAvailableCoupons([...coupons]);
      } catch (err) {
        console.log(err.message);
      }
    };
    getCoupons();
  }, []);

  const updateCart = async () => {
    await getAllCartProducts();
  };

  const originalPrice = () => {
    const originalPricesArray = cartProductsList.map((each) => {
      return parseInt(each.productData.originalPrice * each.productData.qty);
    });
    let sum = originalPricesArray.reduce(function (a, b) {
      return a + b;
    }, 0);
    return sum;
  };

  const offerPrice = () => {
    const offerPricesArray = cartProductsList.map((each) =>
      parseFloat(each.productData.offerPrice * each.productData.qty)
    );
    let sum = offerPricesArray.reduce(function (a, b) {
      return a + b;
    }, 0);
    return sum;
  };

  const originalPriceVar = originalPrice();

  const offerPriceVar = offerPrice();

  const toPayTotalVar =
    (handlingCharges +
    platformFee +
    deliveryFee +
    offerPriceVar -
    discount +
    selectedAmount).toFixed(2)

  const totalSavedAmount = () => {
    const totalOriginalAmt =
      parseFloat(handlingCharges) +
      parseFloat(deliveryFee) +
      parseFloat(originalPrice());
    return Math.abs(parseFloat(totalOriginalAmt - toPayTotalVar).toFixed(2));
  };

  const savedAmountVar = totalSavedAmount();

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
    total:offerPriceVar,
    originalTotal:originalPriceVar,
    deliveryFee:deliveryFee||0,
    tip:selectedAmount||0,
    coupons: discount||0,
    toPayTotal:toPayTotalVar
  }

  return (
    <div className="page-container">
      <div className="msg-ribbon">
        <img src={banner} alt="banner-icon" className="banner-icon" />
        <h6>Delivering to you in 12 mins</h6>
      </div>
      <div className="d-flex justify-content-center w-100">
        <div className="mt-5 mb-1 cart-order-details-container">
          <div className="cart-saved-amount">
            <h4>Cart({cartProductsList.length} items)</h4>
            <div className="saved-amount-text">
              <h6 className="saved-amount">₹{savedAmountVar}</h6>
              <p className="saved-text"> Saved on this order</p>
            </div>
          </div>
          <Link to="/" className="add-more-btn-container">
            <button className="add-more-btn">Add More</button>
          </Link>
          {/* <div className="add-more-btn-container">
          <button className="add-more-btn">Add More</button>
        </div> */}
        </div>
      </div>
      <div className="orders-total-container">
        <div className="d-flex flex-column left-container">
          <div className="orders-card">
            {cartProductsList.map((product) => {
              return (
                <ProductItem
                  isCartProduct={true}
                  key={product.id}
                  product={product}
                  updateCart={updateCart}
                />
              );
            })}
          </div>
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
          <div className="delivery-instructions">
            <h5 className="delivery-feature-heading">Delivery Instructions</h5>
            <p className="delivery-feature-description">
              The Entire amount will be sent to your delivery partner
            </p>
            <div>
              <DeliveryInstructions />
            </div>
          </div>
        </div>

        <div className="total-card">
          <div className="coupons-offers-card">
            <div
              className="d-flex flex-column justify-content-center cart-coupons"
              onClick={openCouponModal}
            >
              <div className="cart-coupons-head">
                <img
                  src={offersIcon}
                  alt="offers-icon"
                  className="offers-image"
                />
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
                  }
                >
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
                  <span className="discounted-fee-type">
                    ₹{handlingCharges}
                  </span>
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

          <CartAddresses
            total={toPayTotalVar}
            orderCharges={{ ...orderCharges }}
          />
        </div>
      </div>
    </div>
  );
};

export default CartProducts;
