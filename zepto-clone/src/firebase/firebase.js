import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateId } from "../utils/order";
import {
  getUserDocDetails,
  getUserId,
  handleAuthStateChanged,
  signInUser,
  signOutUser,
  signUp,
} from "./Users";
import {
  addAddress,
  changeAddressTo,
  deleteAddress,
  getDeliveryAddress,
  getUserAddresses,
} from "./addresses";
import {
  emptyCart,
  getAllCartProducts,
  getCartProducts,
  updateCart,
} from "./cart";
import { getCategories, getSubCategories } from "./Categories";
import {
  addTransactions,
  getSavedOrders,
  getTransactions,
  saveAsOrder,
} from "./orders";
import { getSearchPageProducts } from "./searchPage";
import { updateUserProfileName } from "./profile";

const firebaseConfig = {
  apiKey: "AIzaSyDupak0LgF-iX74jbFKmcHgtuD0k3q9pWQ",
  authDomain: "zepto-7258c.firebaseapp.com",
  projectId: "zepto-7258c",
  storageBucket: "zepto-7258c.appspot.com",
  messagingSenderId: "1080923343944",
  appId: "1:1080923343944:web:fc6ec6853c2624faad5c7d",
  measurementId: "G-RBEVPSE4S5",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firestore = getFirestore(app);

const FirebaseContext = createContext("");
export const useFirebase = () => useContext(FirebaseContext);


export const LoggedInStatusProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [myLocation, setMyLocation] = useState("");
  const [showLocation, setShowLocation] = useState(true);
  const [err, setError] = useState("");
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [currentProductId, setCurrentProductId] = useState("");
  const [userAddresses, setUserAddresses] = useState([]);
  const [deliveryAddress, setDeliveryAddresses] = useState({});
  const [cartProductsList, setCartProductsList] = useState([]);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [ordersSaved, setOrdersSaved] = useState([]);
  const [delvryInstructions, setDelvryInstructions] = useState([]);
  const [walletTransactions, setWalletTransactions] = useState([]);
  const [wallet, setWallet] = useState(0);
  const [temp, setTemp] = useState(false);
  const [searchPageProducts, setSearchPageProducts] = useState([]);
  const [allCategoriesList, setAllCategoriesList] = useState([]);

  let userRefId = useRef();

  const updateLocationState = (newState) => {
    setMyLocation(newState);
  };

  useEffect(() => {
    handleAuthStateChanged(setUser, userRefId);
  }, []);

  useEffect(() => {
    getUserId(user, userRefId, setTemp, temp);
  }, [user]);

  const getSubCategoryProducts = async (categoryId, subCatId) => {
    const collectionRef = collection(
      firestore,
      "category",
      categoryId,
      "subcategories",
      subCatId,
      "products"
    );

    const result = await getDocs(collectionRef);
    const products = result.docs.map((product) => {
      return [product.id, product.data()];
    });
    return products;
  };

  useEffect(() => {
    getUserAddresses(user, userRefId, setUserAddresses, setDeliveryAddresses);
    getDeliveryAddress(user, userRefId, setDeliveryAddresses);
  }, [user]);

  useEffect(() => {
    getCategories(user, setAllCategoriesList);
  }, [user]);

  useEffect(() => {
    getAllCartProducts(user, setCartProductsList, setCount);
  }, [user, count]);

  useEffect(() => {
    const getUpdatedSavedOrders = async () => {
      getSavedOrders(userRefId, setOrdersSaved);
    };
    getUpdatedSavedOrders();
  }, [userRefId]);

  useEffect(() => {
    getSearchPageProducts(setSearchPageProducts);
  }, []);

  const isLoggedIn = user ? true : false;
  const value = {
    user,
    userRefId,
    getUserDocDetails,
    isLoggedIn,
    signOutUser,
    signInUser,
    signUp,
    myLocation,
    setMyLocation,
    showLocation,
    setShowLocation,
    updateLocationState,
    err,
    setError,
    getSubCategories,
    getSubCategoryProducts,
    getCartProducts,
    updateCart,
    userAddresses,
    addAddress,
    deleteAddress,
    setUserAddresses,
    setDeliveryAddresses,
    changeAddressTo,
    deliveryAddress,
    getAllCartProducts,
    cartProductsList,
    emptyCart,
    saveAsOrder,
    setCount,
    count,
    getSavedOrders,
    total,
    setTotal,
    ordersSaved,
    setOrdersSaved,
    setDelvryInstructions,
    delvryInstructions,
    getTransactions,
    addTransactions,
    walletTransactions,
    wallet,
    setWallet,
    setWalletTransactions,
    temp,
    updateUserProfileName,
    searchPageProducts,
    allCategoriesList,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
