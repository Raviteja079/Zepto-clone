import React, { useEffect, useState } from "react";
import walletIcon from "../../assets/wallet/wallet-icon.png";
import "./Wallet.css";
import { FaAngleRight } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import ModalComponent from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import { collection, getDocs } from "firebase/firestore";
import { firestore, useFirebase } from "../../firebase/firebase";
import Modal from "../../components/WalletModal/index"
import WalletActivity from "../../components/WalletActivity";

const Wallet = () => {
  const [redeemModalOpen, setRedeemModalOpen] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promocode, setPromocode] = useState("");
  const [walletAmt, setWalletAmt] = useState(0);
  const [appliedPromocodes, setAppliedPromoCodes] = useState([]);
  const [availablePromocodes, setAvailablePromoCodes] = useState([]);
  const {
    getTransactions,
    addTransactions,
    wallet,
    temp,
    userRefId,
    getUserDocDetails,
    setWalletTransactions,
    setWallet,
    user
  } = useFirebase();

  useEffect(() => {
    const getCoupons = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "vouchers"));
        const promoCodes = [];
        querySnapshot.forEach((doc) => {
          const { voucher } = doc.data();
          promoCodes.push({
            code: voucher.code,
            value: voucher.value,
            name: voucher.name,
          });
        });
        setAvailablePromoCodes([...promoCodes]);
      } catch (err) {
        console.log(err.message);
      }
    };
    getCoupons();

    const getAllTransactions = async () => {
      const allWalletTransactions = await getTransactions(
        getUserDocDetails,
        setWalletTransactions,
        setWallet,
        user,
        userRefId
      );
      setAppliedPromoCodes(allWalletTransactions || []);
    };
    getAllTransactions();
    
  }, [wallet, temp]);

  const handleVoucherReedem = () => {
    setRedeemModalOpen(true);
  };
  const handleComponentClose = () => {
    setRedeemModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const handleVoucherInputChange = (e) => {
    try {
      const value = e.target.value;
      setIsButtonEnabled(value.trim().length);
      setPromocode(value);
    } catch (err) {
      console.log(err.message);
    }
  };

  const verifyVoucherCode = async () => {
    try {
      const matchedCode = availablePromocodes.find(
        (eachCode) => eachCode.code === promocode
      );
      const isCodeExists = appliedPromocodes.some(
        (promo) => promo.code === promocode
      );
      if (isCodeExists) {
        alert("already applied this promocode");
        handleComponentClose();
      } else if (matchedCode) {
        setWalletAmt((amt)=>amt + matchedCode.value);
        const dateTime = new Date()
        setAppliedPromoCodes([...appliedPromocodes, {...matchedCode,dateTime:dateTime}]);
        handleComponentClose();
        await addTransactions(
            user,
          getUserDocDetails,
          setWalletTransactions,
          setWallet,
          userRefId,
          getTransactions,
          wallet,
          matchedCode
        );
      } else {
        alert("Invalid coupon code");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="wallet-wrapper-container">
      <div className="wallet-container">
        <div className="wallet-inner-container">
          <div className="wallet-banner"></div>
          <div className="wallet-white-card">
            <div className="wallet-balance-container">
              <div className="balance-amt-container">
                <h3 className="balance-text amount">₹{walletAmt}</h3>
                <div className="d-flex align-items-center">
                  <h6 className="mb-1 balance-text">Your Balance</h6>
                  <button className="wallet-info-button" onClick={openModal}>
                    <div>
                      <p className="mb-1">ⓘ</p>
                    </div>
                  </button>
                  <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <p>This is the content of the modal.</p>
                    <h1>ENter content</h1>
                    <button>Submit</button>
                  </Modal>
                </div>
              </div>
              <div>
                <img src={walletIcon} alt="wallet" className="wallet-image" />
              </div>
            </div>
            <hr className="wallet-hr" />
            <div
              className="wallet-reedem-voucher"
              onClick={handleVoucherReedem}
            >
              <div className="d-flex align-items-center">
                <FaRegStar className="wallet-star-icon" />
                <p className="mb-1">Reedem Voucher</p>
              </div>
              <FaAngleRight className="text-danger" />
            </div>
            <ModalComponent
              isOpen={redeemModalOpen}
              onClose={handleComponentClose}
              variant="variant1"
            >
              <div className="vouchers-container">
                <h5 className="redeem-voucher-heading">Redeem Voucher</h5>
                <p className="redeem-voucher-text">
                  Enter the voucher code and redeem it on your next purchase!
                </p>
                <input
                  placeholder="Enter Voucher Code"
                  className="redeem-input-field"
                  onChange={handleVoucherInputChange}
                />
                <Button
                  onClick={verifyVoucherCode}
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
          </div>
        </div>
        <WalletActivity appliedPromocodes={appliedPromocodes} />
      </div>
    </div>
  );
};

export default Wallet;
