import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { generateId } from "../utils/order";
import {firestore } from "./firebase";

export const saveAsOrder = async (
  userRefId,
  orderDetails,
  orderCharges,
  delvryInstructions
) => {
  try {
    const ordersCollectionRef = collection(
      firestore,
      "users",
      userRefId.current,
      "orders"
    );
    const instructions = {
      "instrn-1":
        "Delivery partner will be informed about the presence of pet(s)",
      "instrn-2": "Delivery partner will not ring the bell",
      "instrn-3": "Delivery partner will leave your order at your door",
      "instrn-4":
        "Help us recycle plastic bottles by returning them to our delivery partner",
    };
    const instructionsToAdd = [...delvryInstructions];
    const matchedInstructions = instructionsToAdd.map(
      (key) => instructions[key]
    );
    const orderDoc = {
      orderId: generateId(20),
      products: [...orderDetails],
      time: new Date(),
      deliveryInstructions: [...matchedInstructions],
      total: orderCharges.total,
      originalTotal: orderCharges.originalTotal,
      deliveryCharges: orderCharges.deliveryFee,
      coupons: orderCharges.coupons,
      tip: orderCharges.tip,
      toPayTotal: orderCharges.toPayTotal,
    };
    await addDoc(ordersCollectionRef, orderDoc);
  } catch (err) {
    console.log(err.message);
  }
};

export const getSavedOrders = async (userRefId, setOrdersSaved) => {
  try {
    if (userRefId.current) {
      const ordersCollectionRef = collection(
        firestore,
        "users",
        userRefId.current,
        "orders"
      );
      const ordersDocs = await getDocs(ordersCollectionRef);
      const ordersArray = [];
      ordersDocs.forEach((doc) => {
        ordersArray.push([doc.id, doc.data()]);
      });
      setOrdersSaved(ordersArray);
      return ordersArray;
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const getTransactions = async (
  getUserDocDetails,
  setWalletTransactions,
  setWallet,
  user,
  userRefId
) => {
  try {
    const userDetails = await getUserDocDetails(user, userRefId);
    setWalletTransactions(userDetails.transactions);
    setWallet(userDetails.wallet);
    return userDetails.transactions;
  } catch (err) {
    console.log(err.message);
  }
};

export const addTransactions = async (
    user,
  getUserDocDetails,
  setWalletTransactions,
  setWallet,
  userRefId,
  getTransactions,
  wallet,
  matchedCode
) => {
    const {code,value,name,dateTime} = matchedCode
  try {
    const usersCollectionRef = doc(firestore, "users", userRefId.current);
    const existingTransactions = await getTransactions(
      getUserDocDetails,
      setWalletTransactions,
      setWallet,
      user,
      userRefId
    )
    
    await updateDoc(usersCollectionRef, {
      transactions: [
        ...existingTransactions,
        {
          code: code,
          value: value,
          name: name,
          dateTime: dateTime.toLocaleString(),
        },
      ],
      wallet: wallet + value,
    });
    getTransactions(getUserDocDetails, setWalletTransactions, setWallet);
  } catch (err) {
    console.log(err.message);
  }
};