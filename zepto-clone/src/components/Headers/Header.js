import React, { useEffect, useState } from "react";
import zeptoLogo from "../../assets/Headers/zepto-logo.svg";
import { IoSearch } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import classes from "./Header.module.css";
import Modal from "../Login/Login";
import { LocationDetails } from "../Location/LocationDetails";
import SearchBar from "../SearchBar/SearchBar";
import { useFirebase } from "../../firebase/firebase";
import { IoCartOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const Header = (props) => {
  const location = useLocation();
  const [pathname, setPathName] = useState("");

  useEffect(() => {
    const { pathname } = location;
    setPathName(pathname);
  }, [location]);

  const items = [
    '"kurkure"',
    '"apple juice"',
    '"cheese slices"',
    '"chacolate box"',
    '"amul butter"',
    '"banana"',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicTextIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  

  const { isLoggedIn,count } = useFirebase();
  const [isSearchPage, setIsSearchPage] = useState(props.isSearch);
  const [dynamicTextIndex, setDynamicTextIndex] = useState(0);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="m-auto">
      <header className={classes["headers"]}>
        <div className={classes["header-inner-container"]}>
          <div className={classes["logo-location-container"]}>
            <Link to="/" className={classes["logo-link"]}>
              <img src={zeptoLogo} alt="logo" />
            </Link>
            {isLoggedIn && (
              <Link className={classes.iconAccountContainer} to="/account">
                <FaRegUserCircle className={classes.icon} />
                <span className={classes.profileText}>Profile</span>
              </Link>
            )}
            {!isSearchPage && <LocationDetails />}
          </div>
            
          {!isSearchPage && (
            <div className={classes["searchbar-container"]}>
              <Link to="/search" className={classes.searchBarLink}>
                <IoSearch className={classes.searchIcon} />
                <span>Search for</span>
                <div className={classes["container-div"]}>
                  <span className={classes["line"]}>
                    {items[dynamicTextIndex]}
                  </span>
                </div>
              </Link>
            </div>
          )}

          {isSearchPage && <SearchBar inputChange={props.inputChange} />}
          <div className={classes["navbar-container"]}>
            {!isLoggedIn && (
              <div className={classes.iconContainer} onClick={openModal}>
                <FaRegUserCircle className={classes.icon} />
                <span>Login</span>
              </div>
            )}
            {isLoggedIn && (
              <Link className={classes.iconContainer} to="/account">
                <FaRegUserCircle className={classes.icon} />
                <span>Profile</span>
              </Link>
            )}
            {!(pathname === "/cart") && (
              <Link to="/cart" className={classes.iconContainer}>
                <div className={classes["cart-count-container"]}>{count}</div>
                <IoCartOutline className={classes.icon} />
                <span>Cart</span>
              </Link>
            )}
          </div>

          <Modal isOpen={modalOpen} onClose={closeModal}>
            <p>This is the modal content.</p>
          </Modal>
        </div>
      </header>
    </div>
  );
};

export default Header;
