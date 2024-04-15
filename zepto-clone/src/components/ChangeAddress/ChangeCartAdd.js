import { useFirebase } from "../../firebase/firebase";
import "./ChangeCartAddress.css";
import React, { useEffect, useState } from "react";
import locationPin from "../../assets/cart/location-pin.svg";

const ChangeCartAdd = ({onClose}) => {
  const [allAddresses, setAllAddresses] = useState([]);
  const { userAddresses, ChangeAddressTo} = useFirebase();

const changeToDeliveryAddress = (addressDetails)=>{
    ChangeAddressTo(addressDetails)
    onClose()
}

  useEffect(() => {
    setAllAddresses(userAddresses);
  }, [userAddresses]);

  return (
    <div className="d-flex flex-column mb-4">
      {allAddresses.map((each) => (
        <div className="d-flex align-items-center" onClick={()=>changeToDeliveryAddress(each)}>
          <img
            src={locationPin}
            alt="location-pin"
            className="cp-location-image"
          />
          <p className="address-text">{each.houseNo},</p>
          <p className="address-text">{each.buildingNo},</p>
          <p className="address-text">{each.areaName}</p>
        </div>
      ))}
    </div>
  );
};

export default ChangeCartAdd;
