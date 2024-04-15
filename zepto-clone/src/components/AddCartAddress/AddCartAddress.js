import React, {useState } from "react";
import {useFirebase } from "../../firebase/firebase";
import "./AddCartAddress.css";
import { v4 as uuidv4 } from "uuid";

const AddCartAddresses = ({ onClose }) => {
  const [houseNo, setHouseNo] = useState("");
  const [buildingNo, setBuildingNo] = useState("");
  const [areaName, setAreaName] = useState("");
  const { addAddress } = useFirebase();
  const [errMsg, setErrMsg] = useState("");

  const submitData = async () => {
    if (houseNo !== "" && buildingNo !== "" && areaName !== "") {
      setErrMsg("");
      await addAddress(uuidv4(), houseNo, buildingNo, areaName);
      setHouseNo("");
      setBuildingNo("");
      setAreaName("");
      onClose();
    } else {
      setErrMsg("Enter valid data");
    }
  };

  return (
    <div className="d-flex flex-column add-cart-address-container">
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
        <button class="submit-btn" onClick={submitData}>
          Submit
        </button>
        <div className="err-msg">
          {errMsg && <p className="text-danger">{errMsg}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddCartAddresses;
