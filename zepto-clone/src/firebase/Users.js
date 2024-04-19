import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { firebaseAuth, firestore } from "./firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const handleAuthStateChanged = async (setUser, userRefId) => {
  let temp;
  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      setUser(user);
      temp = user;
      sessionStorage.setItem("isLoggedIn", true);
    } else {
      setUser(null);
      temp = null;
      sessionStorage.setItem("isLoggedIn", false);
    }
  });
  if (temp) {
    const collectionRef = collection(firestore, "users");
    let userQueryRef = query(collectionRef, where("email", "==", temp.email));
    let userDoc = await getDocs(userQueryRef);
    userDoc = userDoc.docs;
    userRefId.current = userDoc[0].id;
  }
};

export const getUserId = async (user, userRefId, setTemp, temp) => {
  try {
    if (user) {
      const collectionRef = collection(firestore, "users");
      let userQueryRef = query(collectionRef, where("email", "==", user.email));
      let userDoc = await getDocs(userQueryRef);
      userDoc = userDoc.docs;
      userRefId.current = userDoc[0].id;
      setTemp(!temp);
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const getUserDocDetails = async (user, userRefId) => {
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

export const signOutUser = async () => {
  await signOut(firebaseAuth);
  alert("sign out successful");
};

export const signInUser = async (email, password, navigate, onClose) => {
  try {
    const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
    alert("Sign in Successful!");
    onClose();
    return res;
  } catch (err) {
    console.log(err.message);
  }
};

export const signUp = async (email, password, navigate, setError,onClose) => {
  try {
    await addDoc(collection(firestore, "users"), {
      name: "",
      email,
      password,
      time: new Date(),
      transactions: [],
      wallet: 0,
      deliveryAddress: [],
    });
    await createUserWithEmailAndPassword(firebaseAuth, email, password);
    alert("signUp successful");
    await signInUser(email, password, navigate,onClose);
    navigate("/");
  } catch (err) {
    if (err.message === "Firebase: Error (auth/email-already-in-use).") {
      setError("Please Enter correct password");
    } else {
      console.log(err.message);
    }
  }
};
