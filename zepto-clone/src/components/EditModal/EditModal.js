import React, {useState } from "react";
import { firestore, useFirebase } from "../../firebase/firebase";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const EditModal = ({ onClose, addressData}) => {

  const [address, setAddress] = useState({
    houseNo: addressData.hNo,
    buildingNo: addressData.bNo,
    areaName: addressData.areaName,
  })

  const {userRefId, setUserAddresses } = useFirebase();

  const handleCloseModal = () => {
    onClose();
  };

  const handleChange = (e) => {
    setAddress((prevState) => ({
      ...prevState,
      areaName: e.target.value,
    }));
  };

  const handleBlurClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };


  const handleSubmit = async () => {
    const userDocRef = doc(firestore, "users", userRefId.current);
    const userDocSnapShot = await getDoc(userDocRef);
    const userData = userDocSnapShot.data();
    const updatedAddresses = userData.address.map((eachAddress) => {
      if (eachAddress.id === addressData.id) {
        return { ...address, id: addressData.id };
      } else {
        return eachAddress;
      }
    });

    setUserAddresses(updatedAddresses);
    await updateDoc(userDocRef, { address: updatedAddresses });
    handleCloseModal();
  };

  return (
    <div className="address-modal-overlay" onClick={handleBlurClick}>
      <div className="address-modal">
        <h2>Location Information</h2>
        <label htmlFor="h-no">House No. & Floor No *</label>
        <input
          id="h-no"
          type="address-text"
          placeholder="Enter Details"
          value={address.houseNo}
          onChange={(e) =>
            setAddress((prevState) => ({
              ...prevState,
              houseNo: e.target.value,
            }))
          }
        />
        <label htmlFor="block-no">Building & Block No. *</label>
        <input
          id="block-no"
          type="address-text"
          onChange={(e) =>
            setAddress((prevState) => ({
              ...prevState,
              buildingNo: e.target.value,
            }))
          }
          placeholder="Enter Details"
          value={address.buildingNo}
        />
        <label htmlFor="area">Landmark & Area Name</label>
        <input
          id="area"
          type="address-text"
          placeholder="Enter Details"
          value={address.areaName}
          onChange={handleChange}
        />
        <div className="modal-btns-container">
          <button onClick={handleCloseModal}>Close</button>
          <button class="submit-btn" onClick={handleSubmit}>
            submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditModal;
