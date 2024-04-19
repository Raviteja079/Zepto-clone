import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/LoginModal/modal-logo.svg";
import phone from "../../assets/LoginModal/get-the-app-phone.webp";
import playstore from "../../assets/LoginModal/download-play-store.svg";
import appstore from "../../assets/LoginModal/download-app-store.svg";

import { firestore, useFirebase } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";

const Modal = ({ isOpen, onClose, children }) => {
  const navigate = useNavigate();
  const { signUp, signInUser, err, setError } = useFirebase();
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [password, setPassword] = useState("");


  const validate = (str,field) => {
    if (!str) {
      return false;
    } else {
        if(field==="email"){
            const emailRegex = /^[a-z]+@[a-z]+\.[a-z]+$/;
            return emailRegex.test(str);
        }
        else if (field === "password") {
          const passwordRegex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          return passwordRegex.test(str);
        }
    }
  };

  if (!isOpen) return null;

  const onEmailChange = (e) => {
    if (!e.target.value) {
      setEmailErr("Enter Email correctly");
    }
    setEmailErr("");
    setEmail(e.target.value);
    setError("");
  };

  const onPassChange = (e) => {
    if (!e.target.value) {
      setPassErr("Enter Password correctly");
    }
    setPassErr("");
    setPassword(e.target.value);
    setError("");
  };

  const submitHandler = async () => {
    const validatedEmail = validate(email,"email");
    const validatedPassword = validate(password,"password");

    if (validatedEmail && validatedPassword) {
      try {
        const collectionRef = collection(firestore,"users")
        let q = query(collectionRef,where("email","==",email))
        let u = await getDocs(q)
        u = u.docs;
        if(u.length > 0){
        await signInUser(email, password, navigate, onClose);
        }
        signUp(email, password, navigate, setError,onClose);

      } catch (err) {
        console.log(err.message)
      }
    } else {
      if (!validatedEmail) setEmailErr("Enter correct email");
      if (!validatedPassword) setPassErr("Enter correct password");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        <div className="login-container">
          <img src={logo} className="modal-logo" alt="logo" />
          <h3 className="modal-main-text">Groceries delivered in 10 minutes</h3>
          <div className="modal-email-container">
            <input
              placeholder="Enter Email"
              className="modal-email"
              type="email"
              value={email}
              onChange={onEmailChange}
              maxLength={20}
            />
          </div>
          <p className="err-msg">{emailErr}</p>
          <div className="modal-pass-container">
            <input
              placeholder="Enter password"
              className="modal-pass"
              type="password"
              maxLength={20}
              onChange={onPassChange}
              value={password}
            />
          </div>
          <p className="err-msg">{passErr}</p>
          <button
            type="submit"
            className="modal-submit-btn"
            onClick={submitHandler}
          >
            Continue
          </button>
          <p className="mb-3 err-msg">{err}</p>
          <p className="modal-bottom-text">By continuing, you agree to our</p>
          <p className="modal-bottom-text">
            <a href="terms" className="text-decoration-none">
              <span className="text-danger">Terms of service </span>
            </a>
            &
            <a href="policy" className="text-decoration-none">
              <span className="text-danger"> Privacy Policy</span>
            </a>
          </p>
        </div>
      </div>
      <div className="get-app-card">
        <div>
          <img src={phone} alt="phone" />
        </div>
        <div>
          <h3 className="get-app-head">Order faster & easier everytime</h3>
          <h5>with the Zepto App</h5>
        </div>
        <div>
          <img src={playstore} alt="playstore" />
        </div>
        <div>
          <img src={appstore} alt="applestore" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
