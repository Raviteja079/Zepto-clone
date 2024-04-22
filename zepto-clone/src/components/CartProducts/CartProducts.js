import ProductItem from "../ProductItem/ProductItem";
import "./CartProducts.css";
import React, { useEffect, useState } from "react";
import banner from "../../assets/cart/delivery-banner-icon.svg";
import { firestore, useFirebase } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import DeliveryInstructions from "../DeliveryInstruction/DeliveryInstruction";
import { collection, getDocs } from "firebase/firestore";
import TipsCard from "../TipsCard";
import TotalCard from "../TotalCard";

const CartProducts = () => {
  const {
    cartProductsList,
    getAllCartProducts,
    setCount,
    user,
    setCartProductsList,
  } = useFirebase();

  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [discount, setDiscount] = useState(0);

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

  useEffect(() => {
    setCount((c) => c + 1);
  }, []);

  const updateCart = async () => {
    await getAllCartProducts(user, setCartProductsList, setCount);
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

  const toPayTotalVar = (
    handlingCharges +
    platformFee +
    deliveryFee +
    offerPriceVar -
    discount +
    selectedAmount
  ).toFixed(2);

  const totalSavedAmount = () => {
    const totalOriginalAmt =
      parseFloat(handlingCharges) +
      parseFloat(deliveryFee) +
      parseFloat(originalPrice());
    return Math.abs(parseFloat(totalOriginalAmt - toPayTotalVar).toFixed(2));
  };

  const savedAmountVar = totalSavedAmount();

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
          <TipsCard
            selectedAmount={selectedAmount}
            setSelectedAmount={setSelectedAmount}
          />
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
        <TotalCard
          setDiscount={setDiscount}
          discount={discount}
          availableCoupons={availableCoupons}
          selectedAmount={selectedAmount}
          offerPriceVar={offerPriceVar}
          originalPriceVar={originalPriceVar}
          deliveryFee={deliveryFee}
          toPayTotalVar = {toPayTotalVar}
          handlingCharges = {handlingCharges}
        />
      </div>
    </div>
  );
};

export default CartProducts;
