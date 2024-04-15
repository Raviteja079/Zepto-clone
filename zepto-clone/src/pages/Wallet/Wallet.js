import React, { useEffect, useState } from "react";
import walletIcon from "../../assets/wallet/wallet-icon.png";
import "./Wallet.css";
import { FaAngleRight } from "react-icons/fa6";
import emptyCone from "../../assets/Profile/cone-icon-noaddress.avif";
import { FaRegStar } from "react-icons/fa";
import howItWorks from "../../assets/wallet/wallet-how-it-works.avif";
import ModalComponent from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import { collection, getDocs } from "firebase/firestore";
import { firestore, useFirebase } from "../../firebase/firebase";

const Modal = ({ isOpen, onClose }) => {
  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className="card">
        <div className="how-it-works-container">
          <img src={howItWorks} className="how-it-works" alt="how-it-works" />
        </div>
        <button className="modal-close-btn" onClick={onClose}>
          <span>&times;</span>
        </button>
        <h2 className="card-heading">How It Works</h2>
        <div className="d-flex">
          <span className="points-container">1</span>
          <p className="wallet-balance-points">
            Zepto Cash is a wallet service offered by the Company to its
            customers, which can be used for purchase of Products until expiry.
          </p>
        </div>
        <div className="d-flex">
          <span className="points-container">2</span>
          <p className="wallet-balance-points">
            Zepto Cash is valid for 12 months from the date of issue unless
            specified a validity period. Zepto Cash is not refundable.
          </p>
        </div>
        <div className="d-flex">
          <span className="points-container">3</span>
          <p className="wallet-balance-points">
            Zepto Cash can be used in such cities where issuing Company is
            operating and shall be subject to Platform Terms of Use and
            applicable laws.
          </p>
        </div>
        <div className="d-flex">
          <span className="points-container">4</span>
          <p className="wallet-balance-points">
            You can purchase Zepto Cash using any available payment methods. You
            can also redeem Vouchers to add Zepto Cash into your wallet.
          </p>
        </div>
        <div className="d-flex">
          <span className="points-container">5</span>
          <p className="wallet-balance-points">
            For any further questions/queries, the Customer may reach out to
            support@zeptonow.com.
          </p>
        </div>
      </div>
    </div>
  );
};

const Wallet = () => {
  const [redeemModalOpen, setRedeemModalOpen] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promocode, setPromocode] = useState("");
//   const [walletAmt, setWalletAmt] = useState(0);
  const [appliedPromocodes, setAppliedPromoCodes] = useState([]);
  const [availablePromocodes, setAvailablePromoCodes] = useState([]);
  const { getTransactions, addTransactions, wallet, temp } = useFirebase();

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
      const allWalletTransactions = await getTransactions();
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
        // setWalletAmt((amt)=>amt + matchedCode.value);
        const dateTime = new Date()
        // setAppliedPromoCodes([...appliedPromocodes, {...matchedCode,dateTime:dateTime}]);
        await addTransactions({ ...matchedCode, dateTime: dateTime });
        handleComponentClose();
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
                <h3 className="balance-text amount">₹{wallet}</h3>
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
        <div className="wallet-recent-activity-tab">
          <div className="wallet-recent-activity">
            <h5 className="wallet-recent-activity-text">Recent Activity</h5>
            <div className="wallet-see-all">
              {/* <p className="wallet-see-all-text">See All</p> */}
              {/* <FaAngleRight /> */}
            </div>
          </div>
          {appliedPromocodes.length !== 0 ? (<div>
            {appliedPromocodes.map(each=>{
                // const appliedVoucher = availablePromocodes.find((eachCode)=>eachCode.code === each)
                console.log(each,"janagan")
                
                return (
                  <div className="d-flex flex-column transaction-card">
                    <h5 className="mb-3">{each.name}</h5>
                    <div className="d-flex justify-content-between ">
                      <p className="mb-0">Rs.{each.value}</p>
                      <p className="mb-0">{each.dateTime.toLocaleString()}</p>
                    </div>
                  </div>
                );
            })}
          </div>)
          :
          (<div className="wallet-transactions-tab">
            <div className="No-transactions-card">
              <div className="wallet-empty-image-container">
                <img src={emptyCone} alt="empty" />
              </div>
              <h4 className="wallet-transaction-head">No Transactions Yet</h4>
              <p className="wallet-add-cash-text">
                To see the transactions add the zepto cash in your wallet
              </p>
            </div>
          </div>)}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
