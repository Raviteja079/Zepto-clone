import React, { useEffect, useState } from "react";
import "./Account.css";
import { useFirebase } from "../../firebase/firebase";
import { Link, useLocation, useNavigate,useParams} from "react-router-dom";
import Header from "../Headers/Header";
import { BsHandbag } from "react-icons/bs";
import { TbBrandHipchat } from "react-icons/tb";
import { GrLocation } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { BiWallet } from "react-icons/bi";
import { VscReferences } from "react-icons/vsc";
import Orders from "../../pages/Orders/Orders";
import Address from "../../pages/Address/Address";
import Wallet from "../../pages/Wallet/Wallet";
import CustomerSupport from "../../pages/CustomerSupport/CustomerSupport";
import Referrals from "../../pages/ManageReferrals/Referrals";
import Profile from "../../pages/Profile/Profile";
import OrderDetails from "../OrderDetails/OrderDetails";

const Account = () => {
  const { user } = useFirebase();
  const location = useLocation();
  const [pathName, setPathName] = useState("");
   const { orderId } = useParams();

  useEffect(() => {
    const { pathname } = location;
    setPathName(pathname);
    document.title = pathname;
  }, [location, pathName]);

  const navigate = useNavigate();
  const { signOutUser } = useFirebase();
  const onSignOut = () => {
    signOutUser();
    navigate("/");
  };
  return (
    <>
      <Header isSearchPage={false} />
      <div className="account-container">
        <div className="side-bar">
          <div className="account-details">
            <h3 className="my-account-head">My Account</h3>
            <h4 className="email-head">{user.email}</h4>
          </div>
          <div className="hr-line-profile"></div>

          <Link
            to="/account/orders"
            className={
              pathName === "/account/orders" || pathName === "/account"
                ? "account-menu-option-active"
                : "account-menu-option"
            }
          >
            <BsHandbag className="account-menu-icons" />
            <div className="account-text-container">
              <h6 className="text-container">Orders</h6>
            </div>
          </Link>
          <Link
            to="/account/customer-support"
            className={
              pathName === "/account/customer-support"
                ? "account-menu-option-active"
                : "account-menu-option"
            }
          >
            <TbBrandHipchat className="account-menu-icons" />
            <div className="account-text-container">
              <h6 className="text-container">Customer Support</h6>
            </div>
          </Link>
          <Link
            to="/account/referrals"
            className={
              pathName === "/account/referrals"
                ? "account-menu-option-active"
                : "account-menu-option"
            }
          >
            <VscReferences className="account-menu-icons" />
            <div className="account-text-container">
              <h6 className="text-container">Manage Referrals</h6>
            </div>
          </Link>
          <Link
            to="/account/address"
            className={
              pathName === "/account/address"
                ? "account-menu-option-active"
                : "account-menu-option"
            }
          >
            <GrLocation className="account-menu-icons" />
            <div className="account-text-container">
              <h6 className="text-container">Address</h6>
            </div>
          </Link>
          <Link
            to="/account/profile"
            className={
              pathName === "/account/profile"
                ? "account-menu-option-active"
                : "account-menu-option"
            }
          >
            <CgProfile className="account-menu-icons" />
            <div className="account-text-container">
              <h6 className="text-container">Profile</h6>
            </div>
          </Link>
          <Link
            to="/account/wallet"
            className={
              pathName === "/account/wallet"
                ? "account-menu-option-active"
                : "account-menu-option"
            }
          >
            <BiWallet className="account-menu-icons" />
            <div className="account-text-container">
              <h6 className="text-container">Wallet</h6>
            </div>
          </Link>
          <div>
            <hr />
          </div>
          <button className="sign-out-btn">
            <div className="sign-out-container" onClick={onSignOut}>
              Sign Out
            </div>
          </button>
        </div>
        {pathName === "/account" && <Orders default={true} />}
        {pathName === "/account/orders" && <Orders />}
        {pathName === "/account/address" && <Address />}
        {pathName === "/account/wallet" && <Wallet />}
        {pathName === "/account/customer-support" && <CustomerSupport />}
        {pathName === "/account/referrals" && <Referrals />}
        {pathName === "/account/profile" && <Profile />}
        {pathName === `/account/order-details/${orderId}` && <OrderDetails />}
      </div>
    </>
  );
};

export default Account;
