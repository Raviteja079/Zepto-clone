import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "./firebase";

export const getUserAddresses = async (
  user,
  userRefId,
  setUserAddresses,
  setDeliveryAddresses
) => {
  try {
    if (user && user.email) {
      const collectionRef = collection(firestore, "users");
      let userQueryRef = query(collectionRef, where("email", "==", user.email));
      let userDoc = await getDocs(userQueryRef);
      userDoc = userDoc.docs;
      userRefId.current = userDoc[0].id;
      const userDocRef = doc(firestore, "users", userRefId.current);
      let addressList = await getDoc(userDocRef);
      addressList = addressList.data();
      if (addressList.address) {
        setUserAddresses(addressList.address);
      }
      await getDeliveryAddress(user, userRefId, setDeliveryAddresses);
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const getDeliveryAddress = async (
  user,
  userRefId,
  setDeliveryAddresses
) => {
  try {
    if (user && user.email) {
      const userDocRef = doc(firestore, "users", userRefId.current);
      let addressList = await getDoc(userDocRef);
      addressList = addressList.data();
      if (addressList.deliveryAddress) {
        setDeliveryAddresses(addressList.deliveryAddress);
      }
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const addAddress = async (
  user,
  userRefId,
  userAddresses,
  uuid,
  houseNo,
  buildingNo,
  areaName,
  setUserAddresses,
  setDeliveryAddresses
) => {
  try {
    const usersCollectionRef = doc(firestore, "users", userRefId.current);
    await updateDoc(usersCollectionRef, {
      address: [
        ...userAddresses,
        {
          id: uuid,
          houseNo: houseNo,
          buildingNo: buildingNo,
          areaName: areaName,
        },
      ],
    });
    await getUserAddresses(
      user,
      userRefId,
      setUserAddresses,
      setDeliveryAddresses
    );
  } catch (err) {
    console.log(err.message);
  }
};

export const changeAddressTo = async (
  userRefId,
  addressDetails,
  user,
  setDeliveryAddresses
) => {
  const usersCollectionRef = doc(firestore, "users", userRefId.current);
  await updateDoc(usersCollectionRef, {
    deliveryAddress: {
      houseNo: addressDetails.houseNo,
      buildingNo: addressDetails.buildingNo,
      areaName: addressDetails.areaName,
    },
  });
  await getDeliveryAddress(user, userRefId, setDeliveryAddresses);
};

export const deleteAddress = async (
  userRefId,
  userAddresses,
  setUserAddresses,
  id
) => {
  try {
    const newAddresses = userAddresses.filter((each) => each.id !== id);
    setUserAddresses(newAddresses);

    const usersCollectionRef = doc(firestore, "users", userRefId.current);
    await updateDoc(usersCollectionRef, {
      address: [...newAddresses],
    });
  } catch (err) {
    console.log(err.message);
  }
};
