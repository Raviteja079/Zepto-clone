import React, { useEffect, useState } from "react";
import Header from "../components/Headers/Header";
import "./Cart.css";
import Modal from "../components/Login/Login";
import { useFirebase } from "../firebase/firebase";
import { Link, useLocation } from "react-router-dom";
import BrowseProducts from "../components/EmptyCart/BrowseProducts";
import CartProducts from "../components/CartProducts/CartProducts";
import { FaAngleLeft } from "react-icons/fa6";

export const Cart = () => {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);

  const { isLoggedIn,cartProductsList} = useFirebase();

  useEffect(() => {
    const { pathname } = location;
    document.title = pathname;
  }, [location]);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  if (isLoggedIn)
    return (
      <div className="cart-page-container">
        <div className="cart-page-header">
          <Header isSearch={false} />
        </div>
        <Link to="/" className="cart-header">
          <div className="cart-to-home">
            <FaAngleLeft />
            <p className="mb-0">Cart</p>
          </div>
        </Link>
        <div className="cart-page-details-container">
          {cartProductsList.length === 0 ? (
            <BrowseProducts />
          ) : (
            <CartProducts />
          )}
        </div>
      </div>
    );

  return (
    <div className="cart-page-container">
      <Header isSearch={false} />
      <div className="cart-container">
        <h3>Please Login</h3>
        <p>please login to access the cart</p>
        <button className="cart-login-btn" onClick={openModal}>
          Login
        </button>
        <Modal isOpen={modalOpen} onClose={closeModal}>
          <p>This is the modal content.</p>
        </Modal>
      </div>
    </div>
  );
};
