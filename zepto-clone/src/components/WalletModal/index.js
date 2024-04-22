
import howItWorks from "../../assets/wallet/wallet-how-it-works.avif";

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

export default Modal