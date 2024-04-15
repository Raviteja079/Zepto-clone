import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Address.css";
import cone from "../../assets/Profile/cone-icon-noaddress.avif";
import { useFirebase } from "../../firebase/firebase";

import AddressItem from "../../components/AddressItem/AddressItem";

const Modal = ({ isOpen, handleBlurClick, children }) => {
  if (!isOpen) return null;
  return (
    <div className="address-modal-overlay" onClick={handleBlurClick}>
      <div className="address-modal">
        <h2>Location Information</h2>
        {children}
      </div>
    </div>
  );
};

const Address = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddAddress = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [houseNo, setHouseNo] = useState("");
  const [buildingNo, setBuildingNo] = useState("");
  const [areaName, setAreaName] = useState("");
  const { addAddress, userAddresses } = useFirebase();
  const [errMsg, setErrMsg] = useState("");

  const handleBlurClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const submitData = async () => {
    if (houseNo !== "" && buildingNo !== "" && areaName !== "") {
        console.log(houseNo, buildingNo, areaName)
      setErrMsg("");
      await addAddress(uuidv4(), houseNo, buildingNo, areaName);
      setHouseNo("")
      setBuildingNo("")
      setAreaName("")
      handleCloseModal();
    } else {
        console.log("got")
      setErrMsg("Enter valid data");
    }
  };
  return (
    <div className="address-container">
      <div className="d-flex flex-row justify-content-between address-head">
        <h6>All Saved Addresses</h6>
        <button className="add-address-btn" onClick={handleAddAddress}>
          Add New Address
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          handleBlurClick={handleBlurClick}
        >
          <label htmlFor="h-no">House No. & Floor No *</label>
          <input
            id="h-no"
            type="address-text"
            placeholder="Enter Details"
            onChange={(e) => setHouseNo(e.target.value)}
          />
          <label htmlFor="block-no">Building & Block No. *</label>
          <input
            id="block-no"
            type="address-text"
            onChange={(e) => setBuildingNo(e.target.value)}
            placeholder="Enter Details"
          />
          <label htmlFor="area">Landmark & Area Name</label>
          <input
            id="area"
            type="address-text"
            placeholder="Enter Details"
            onChange={(e) => setAreaName(e.target.value)}
          />
          <div className="modal-btns-container">
            <button onClick={handleCloseModal}>Close</button>
            <button class="submit-btn" onClick={submitData}>
              Submit
            </button>
          </div>
          <div className="err-msg">
            {errMsg && <p className="text-danger">{errMsg}</p>}
          </div>
        </Modal>
      </div>
      {userAddresses.length === 0 ? (
        <div className="address-details mt-5">
          <div className="d-flex justify-content-center mt-3">
            <div className="image-container">
              <img src={cone} alt="no-address" />
            </div>
          </div>
          <h5 className="address-text-heading">No address added</h5>
          <p>
            To see the saved addresses here, add your work or home address here
          </p>
        </div>
      ) : (
        <div>
          {userAddresses.map((each) => {
            console.log(each)
            return (
              <AddressItem
                hNo={each.houseNo}
                bNo={each.buildingNo}
                areaName={each.areaName}
                key={each.id}
                id={each.id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Address;
