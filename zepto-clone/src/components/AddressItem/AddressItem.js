import { CiEdit } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import EditModal from "../EditModal/EditModal";
import "./AddressItem.css";
import React, { useState } from "react";
import { useFirebase } from "../../firebase/firebase";

const AddressItem = (each) => {
  const { deleteAddress } = useFirebase();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDeleteAddress = async () => {
    await deleteAddress(each.id);
  };

  return (
    <div className="address-entry-container">
      <div className="d-flex">
        <IoLocationOutline className="address-location-icon" />
        <p className="address-text">{each.hNo},</p>
        <p className="address-text">{each.bNo},</p>
        <p className="address-text">{each.areaName}</p>
      </div>
      <div className="d-flex">
        <CiEdit
          onClick={() => {
            setIsEditModalOpen((prev) => !prev);
          }}
          className="icon-button"
        />
        <MdDelete onClick={handleDeleteAddress} className="icon-button" />
      </div>
      {isEditModalOpen && (
        <EditModal
          onClose={() => setIsEditModalOpen(false)}
          handleBlurClick={(e) =>
            e.target === e.currentTarget
              ? setIsEditModalOpen(false)
              : setIsEditModalOpen(true)
          }
          addressData={each}
        />
      )}
    </div>
  );
};

export default AddressItem;
