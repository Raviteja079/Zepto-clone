import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [allCategoriesList,setAllCategoriesList] = useState([])

  let userRefId = useRef();
  const navigate = useNavigate();

  const updateLocationState = (newState) => {
    setMyLocation(newState);
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      console.log(user);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    const getUserId = async () => {
      try {
        if (user) {
          const collectionRef = collection(firestore, "users");
          console.log(user.email);
          let userQueryRef = query(
            collectionRef,
            where("email", "==", user.email)
          );
          let userDoc = await getDocs(userQueryRef);
          userDoc = userDoc.docs;
          userRefId.current = userDoc[0].id;
          setTemp(!temp);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getUserId();
  }, [user]);

  const getUserDocDetails = async () => {
    try {
      if (user && user.email) {
        const userDocRef = doc(firestore, "users", userRefId.current);
        let docDetails = await getDoc(userDocRef);
        return docDetails.data();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const signOutUser = async () => {
    await signOut(firebaseAuth);
    alert("sign out successful");
  };

  const signInUser = async (email, password) => {
    const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
    await addDoc(collection(firestore, "users"), {
      name: "",
      email,
      password,
    });
    navigate("/account");
    alert("Sign In successful");
    return res;
  };

  const signUp = async (email, password) => {
    try {
      console.log(email, password);
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      await addDoc(collection(firestore, "users"), {
        name: "",
        email,
        password,
        time: new Date(),
      });
      navigate("/");
      alert("signUp successful");
    } catch (err) {
      if (err.message === "Firebase: Error (auth/email-already-in-use).") {
        setError("Please Enter correct password");
      }
    }
  };

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

  const getUserAddresses = async () => {
    try {
      if (user && user.email) {
        const collectionRef = collection(firestore, "users");
        let userQueryRef = query(
          collectionRef,
          where("email", "==", user.email)
        );
        let userDoc = await getDocs(userQueryRef);
        userDoc = userDoc.docs;
        console.log(userDoc[0], "hello");
        userRefId.current = userDoc[0].id;
        const userDocRef = doc(firestore, "users", userRefId.current);
        let addressList = await getDoc(userDocRef);
        addressList = addressList.data();

        if (addressList.address) {
          setUserAddresses(addressList.address);
        }
        await getDeliveryAddress();
        await getSavedOrders();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getDeliveryAddress = async () => {
    try {
      if (user && user.email) {
        const userDocRef = doc(firestore, "users", userRefId.current);
        let addressList = await getDoc(userDocRef);
        addressList = addressList.data();

        if (addressList.deliveryAddress) {
          console.log(addressList.deliveryAddress, "raghu");
          setDeliveryAddresses(addressList.deliveryAddress);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getUserAddresses();
    getDeliveryAddress();
  }, [user]);

  const addAddress = async (uuid, houseNo, buildingNo, areaName) => {
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
      console.log("called");
      await getUserAddresses();
    } catch (err) {
      console.log(err.message);
    }
  };

  const ChangeAddressTo = async (addressDetails) => {
    const usersCollectionRef = doc(firestore, "users", userRefId.current);
    await updateDoc(usersCollectionRef, {
      deliveryAddress: {
        houseNo: addressDetails.houseNo,
        buildingNo: addressDetails.buildingNo,
        areaName: addressDetails.areaName,
      },
    });
    await getDeliveryAddress();
  };

  const deleteAddress = async (id) => {
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

  const getSubCategories = async (categoryId) => {
    try {
      const collectionRef = collection(
        firestore,
        "category",
        categoryId,
        "subcategories"
      );
      const result = await getDocs(collectionRef);
      const subCategories = result.docs.map((subCategory) => [
        subCategory.id,
        subCategory.data(),
      ]);
      return subCategories;
    } catch (err) {
      console.log(err.message);
    }
  };

  const getAllCartProducts = async () => {
    try {
      if (user && user.email) {
        const collectionRef = collection(firestore, "Cart " + user.uid);
        const querySnapshot = await getDocs(collectionRef);

        const cartProducts = [];

        querySnapshot.forEach((doc) => {
          const productData = doc.data();
          cartProducts.push({ id: doc.id, productData });
        });
        setCartProductsList(cartProducts);
        const totalQty = cartProductsList.reduce(
          (acc, curr) => acc + curr.productData.qty,
          0
        );
        setCount(totalQty);
        return cartProducts;
      }
    } catch (error) {
      console.error("Error getting cart products: ", error);
      return [];
    }
  };

  const deleteDocuments = async (collectionRef) => {
    try {
      const ordersDocs = await getDocs(collectionRef);

      ordersDocs.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        console.log("deleted successfully.");
      });

      console.log("All documents deleted");
    } catch (error) {
      console.error(error);
    }
  };

  const emptyCart = () => {
    try {
      const collectionRef = collection(firestore, "Cart " + user.uid);
      deleteDocuments(collectionRef);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getAllCartProducts();
  }, []);

  function generateId(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const saveAsOrder = async (orderDetails, orderCharges) => {
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
      const orders = [...orderDetails];
      console.log(orders, "orderdetaisl");
      console.log(orderCharges, "order chargeeeee");
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

  const getSavedOrders = async () => {
    try {
      if (userRefId.current) {
        console.log(userRefId.current);
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
  useEffect(() => {
    const getUpdatedSavedOrders = async () => {
      getSavedOrders();
    };
    getUpdatedSavedOrders();
  }, [userRefId]);

  const getCartProducts = async (productId) => {
    try {
      const collectionRef = collection(firestore, "Cart " + user.uid);
      const documentRef = doc(collectionRef, productId);
      const result = await getDoc(documentRef);
      const data = result.data();
      return data;
    } catch (err) {
      console.log(err.message);
    }
  };

  const increaseQty = async (data, id) => {
    try {
      const productId = data.productName + id;
      const collectionRef = collection(firestore, "Cart " + user.uid);
      const documentRef = doc(collectionRef, productId);
      const currentProduct = await getDoc(documentRef);

      if (currentProduct.exists()) {
        const currentData = currentProduct.data();
        const updatedQty = (currentData.qty || 0) + 1;
        await updateDoc(documentRef, { qty: updatedQty });
      } else {
        console.error("Product not found in cart");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const decreaseQty = async (data, id, quantity) => {
    try {
      if (quantity === 1) {
        return;
      }
      if (quantity > 0) {
        const productId = data.productName + 1;
        const collectionRef = collection(firestore, "Cart " + user.uid);
        const documentRef = doc(collectionRef, productId);
        const currentProduct = await getDoc(documentRef);

        if (currentProduct.exists()) {
          const currentData = currentProduct.data();
          const updatedQty = (currentData.qty || 0) - 1;
          await updateDoc(documentRef, { qty: updatedQty });
        } else {
          console.error("Product not found in cart");
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateCart = async (productId, qty, id) => {
    try {
      setCurrentProductId(productId);
      const currentProduct = await getCartProducts(productId);
      const updated = { ...currentProduct, qty: (currentProduct.qty += qty) };
      setUpdatedProduct(updated);
      return updated;
    } catch (err) {
      console.log(err.message);
    }
  };

  const getTransactions = async () => {
    try {
      const userDetails = await getUserDocDetails();
      setWalletTransactions(userDetails.transactions);
      setWallet(userDetails.wallet);
      return walletTransactions;
    } catch (err) {}
  };
  const addTransactions = async (transactionItem) => {
    try {
      const usersCollectionRef = doc(firestore, "users", userRefId.current);
      const existingTransactions = await getTransactions();
      await updateDoc(usersCollectionRef, {
        transactions: [
          ...existingTransactions,
          {
            code: transactionItem.code,
            value: transactionItem.value,
            name: transactionItem.name,
            dateTime: transactionItem.dateTime.toLocaleString(),
          },
        ],
        wallet: wallet + transactionItem.value,
      });
      getTransactions();
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateUserProfileName = async (name) => {
    const usersCollectionRef = doc(firestore, "users", userRefId.current);
    try {
      await updateDoc(usersCollectionRef, {
        name: name,
      });
      alert("Successfully updated name!");
    } catch (err) {
      console.log(err.message);
    }
  };

  const getSearchPageProducts = async () => {
    try {
      if (user && user.email) {
        const allProducts = []
        const collectionRef = collection(firestore, "category");
        const allCategoryDocs = await getDocs(collectionRef);
        allCategoryDocs.forEach(async (categoryDoc) => {
          const eachDocCollecitonRef = collection(
            firestore,
            "category",
            categoryDoc.id,
            "subcategories"
          );
          const allSubCategories = await getDocs(eachDocCollecitonRef);
          allSubCategories.forEach(async (subCategoryDoc) => {
            const eachSubCatProducts = collection(
              firestore,
              "category",
              categoryDoc.id,
              "subcategories",
              subCategoryDoc.id,
              "products"
            );
            const allSubCatProducts = await getDocs(eachSubCatProducts);
            allSubCatProducts.forEach((doc) => {
              allProducts.push(doc.data())
            });
          });
        });
        setSearchPageProducts(allProducts)
      }
    } catch (err) {
      console.log(err.message);
    }
  };
    const getCategories = async () => {
    try {
      if (user && user.email) {
        const allCategories = []
        const collectionRef = collection(firestore, "category");
        const allCategoryDocs = await getDocs(collectionRef);
        allCategoryDocs.forEach(async (categoryDoc) =>allCategories.push({id:categoryDoc.id,name:categoryDoc.data().name,}))
        setAllCategoriesList(allCategories);
    }
    }
    catch(err){
        console.log(err.message)
    }}

  useEffect(() => {
    getSearchPageProducts();
    getCategories()
  }, [user]);

  useEffect(()=>{
    getSearchPageProducts()
  },[])



  const isLoggedIn = user ? true : false;
  const value = {
    user,
    isLoggedIn,
    signOutUser,
    signInUser,
    signUp,
    myLocation,
    setMyLocation,
    updateLocationState,
    err,
    setError,
    getSubCategories,
    getSubCategoryProducts,
    getCartProducts,
    showLocation,
    setShowLocation,
    updateCart,
    increaseQty,
    decreaseQty,
    getUserDocDetails,
    userAddresses,
    addAddress,
    deleteAddress,
    userRefId,
    setUserAddresses,
    ChangeAddressTo,
    deliveryAddress,
    getAllCartProducts,
    cartProductsList,
    saveAsOrder,
    setCount,
    count,
    getSavedOrders,
    emptyCart,
    total,
    setTotal,
    ordersSaved,
    setDelvryInstructions,
    getTransactions,
    addTransactions,
    walletTransactions,
    wallet,
    temp,
    updateUserProfileName,
    searchPageProducts,
    allCategoriesList
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
