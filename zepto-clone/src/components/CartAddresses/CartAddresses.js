import React, { useEffect, useState } from "react";
import {useFirebase } from "../../firebase/firebase";
import ChangeCartAdd from "../ChangeAddress/ChangeCartAdd";
import AddCartAddresses from "../AddCartAddress/AddCartAddress";
import ModalComponent from "../Modal/Modal";
import "./CartAddresses.css";
import locationPin from "../../assets/cart/location-pin.svg";
import zeptoFavicon from "../../assets/favicon.png";
import { useNavigate } from "react-router-dom";

const CartAddresses = ({total,orderCharges}) => {
  const {
    userAddresses,
    user,
    deliveryAddress,
    cartProductsList,
    saveAsOrder,
    emptyCart,
    setCount,
    setTotal
  } = useFirebase();
  
  const [allAddresses, setAllAddresses] = useState([]);
  const [cartAddressModalOpen, setCartAddressModalOpen] = useState(false);
  const [AddAddressModalOpen, setAddAddressModalOpen] = useState(false);
  const[selectedAddress, setSelectedAddress] = useState({})
  const [cartItems, SetCartItems] = useState([])
  const navigate = useNavigate()
 

  const openCartAddressModal = () => {
    setCartAddressModalOpen(true);
  };

  const handleComponentClose = () => {
    setCartAddressModalOpen(false);
    setAddAddressModalOpen(false);
  };

  const handleAddAddress = () => {
    setAddAddressModalOpen(true);
    setCartAddressModalOpen(false);
  };

  useEffect(() => {
    setAllAddresses(userAddresses);
    setSelectedAddress(deliveryAddress)
    SetCartItems(cartProductsList)
  }, [userAddresses, allAddresses,deliveryAddress]);

  const amount = parseInt(total*100);
  const currency = "INR";
  const receiptId = "ADAFJ89DSF343";

  const saveOrderDetails = (cartProducts)=>{
    setTotal(total)
    saveAsOrder(cartProducts,orderCharges)
    emptyCart()
    setCount(0)
  }
 
  const handlePayment = async (e) => {
    const response = await fetch("http://localhost:5000/order", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();

    var options = {
      key: "rzp_test_VMRDNU93WFaNL7", 
      amount, 
      currency,
      name: "Zepto", 
      description: "Test Transaction",
      image: { zeptoFavicon },
      order_id: order.id, 
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "http://localhost:5000/order/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes);

        const randomTime =
          Math.floor(Math.random() * (900000 - 480000 + 1)) + 480000;
          console.log(randomTime)
        
        setTimeout(() => {
          saveOrderDetails(cartItems);
        }, randomTime);

        navigate("/account")
        saveOrderDetails(cartItems);

      },
      prefill: {
        name: user.uid, 
        email: user.email,
       
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
    
  };

  return (
    <div className="cp-add-address">
      <div className="cp-delivery-location">
        {allAddresses[0] ? (
          <div className="d-flex flex-column">
            <div className="d-flex ">
              <p className="saved-address-text">Saved Address: </p>
              <p className="address-text">{selectedAddress.houseNo},</p>
              <p className="address-text">{selectedAddress.buildingNo},</p>
              <p className="address-text">{selectedAddress.areaName}</p>
            </div>
            <div
              className="tex-danger d-flex align-items-center change-address-container"
              onClick={openCartAddressModal}
            >
              <img
                src={locationPin}
                alt="location-pin"
                className="cp-location-image"
              />
              <span>Change</span>
            </div>
          </div>
        ) : (
          <p className="cp-enter-address-text">Enter your delivery address</p>
        )}
      </div>
      <div className="cp-address-to-delivery">
        {Object.keys(selectedAddress).length !== 0 ? (
          <button className="cp-add-address-btn" onClick={handlePayment}>
            Continue To Payment
          </button>
        ) : (
            <div className="d-flex justify-content-start w-100">
                <button className="add-address-btn" onClick={handleAddAddress}>
            +<span>Add Address</span>
          </button>
            </div>

          
        )}
      </div>
      <ModalComponent
        isOpen={cartAddressModalOpen}
        onClose={handleComponentClose}
        variant="variant1"
        overlayStyle="component-overlay-style"
      >
        <div className="change-address-modal-container">
          {userAddresses && <ChangeCartAdd onClose={handleComponentClose} />}
          <div className="d-flex bg-light">
            <button className="add-address-btn" onClick={handleAddAddress}>
              +<span>Add Address</span>
            </button>
          </div>
        </div>
      </ModalComponent>
      <ModalComponent
        isOpen={AddAddressModalOpen}
        onClose={handleComponentClose}
        variant="variant1"
      >
        <AddCartAddresses onClose={handleComponentClose} />
      </ModalComponent>
    </div>
  );
};

export default CartAddresses;
