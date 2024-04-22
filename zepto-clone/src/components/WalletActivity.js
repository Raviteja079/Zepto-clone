import React from "react";
import emptyCone from "../assets/Profile/cone-icon-noaddress.avif"

const WalletActivity = ({ appliedPromocodes }) => {
  return (
    <div className="wallet-recent-activity-tab">
      <div className="wallet-recent-activity">
        <h5 className="wallet-recent-activity-text">Recent Activity</h5>
        <div className="wallet-see-all">
          {/* <p className="wallet-see-all-text">See All</p> */}
          {/* <FaAngleRight /> */}
        </div>
      </div>
      {appliedPromocodes.length !== 0 ? (
        <div>
          {appliedPromocodes.map((each) => {
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
        </div>
      ) : (
        <div className="wallet-transactions-tab">
          <div className="No-transactions-card">
            <div className="wallet-empty-image-container">
              <img src={emptyCone} alt="empty" />
            </div>
            <h4 className="wallet-transaction-head">No Transactions Yet</h4>
            <p className="wallet-add-cash-text">
              To see the transactions add the zepto cash in your wallet
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletActivity;
