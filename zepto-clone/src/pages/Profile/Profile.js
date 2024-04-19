import React, { useEffect, useRef, useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { firebaseAuth, firestore, useFirebase } from "../../firebase/firebase";
import Button from "../../components/Button/Button";
import { deleteUser, reauthenticateWithCredential } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import ModalComponent from "../../components/Modal/Modal";
import cautionImage from "../../assets/Profile/t-img-suc-delete.png";
import { EmailAuthProvider } from "firebase/auth/cordova";

const Profile = () => {
  const [userProfile, setUserProfile] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [name, setName] = useState("");
  const [removeAccountModal, setRemoveAccountModal] = useState(false);
  const { getUserDocDetails, temp, updateUserProfileName, userRefId,user } =
    useFirebase();

  const navigate = useNavigate();

  const getUserDoc = async () => {
    const userData = await getUserDocDetails(user,userRefId);
    setUserProfile(userData);
    setName(userData?.name);
  };

  const openRemoveUserModal = () => {
    setRemoveAccountModal(true);
  };

  const handleComponentClose = () => {
    setRemoveAccountModal(false);
  };

  useEffect(() => {
    getUserDoc();
  }, [getUserDocDetails, temp]);

  const removeUser = async () => {
    let credential = EmailAuthProvider.credential(
      userProfile.email,
      userProfile.password
    );
    const loggedInUser = firebaseAuth.currentUser;
    await reauthenticateWithCredential(loggedInUser, credential);
    await deleteUser(loggedInUser);
    const docRef = doc(firestore, "users", userRefId.current);
    await deleteDoc(docRef);
    navigate("/");
  };

  const handleClick = async () => {
    await updateUserProfileName(userRefId, name)
    setName("")
    await getUserDoc();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setName(value);
    setIsButtonEnabled(value.trim().length > 0);
  };

  return (
    <div className="profile-container">
      <label>Name*</label>
      <div>
        <input
          type="text"
          className="profile-input"
          onChange={handleInputChange}
          value={name}
        />
      </div>
      <label>Email Address*</label>
      <div>
        <input
          disabled={true}
          placeholder="Enter your email"
          className="profile-input"
          value={userProfile ? userProfile.email : ""}
        />
      </div>
      <p className="promise-text">We promise not to spam you</p>

      <Button
        onClick={handleClick}
        disabled={!isButtonEnabled}
        className={
          !isButtonEnabled
            ? "disabled-profile-submit-btn"
            : "profile-submit-btn"
        }
      >
        Submit
      </Button>
      <div>
        <hr />
      </div>
      <h4 className="profile-delete-heading" onClick={openRemoveUserModal}>
        Delete Account
      </h4>
      <ModalComponent
        isOpen={removeAccountModal}
        onClose={handleComponentClose}
        variant="variant1"
      >
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img src={cautionImage} alt="alert" className="caution-image" />
          <h5 className="delete-ac-note-heading">Sad To See You Go</h5>
          <p className="delete-ac-note">
            You will lose your past order details. Would you still like to
            proceed?
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <button
              onClick={handleComponentClose}
              className="delete-ac-cancel-btn"
            >
              No, Thank you
            </button>
            <button onClick={removeUser} className="delete-ac-continue-btn">
              Continue
            </button>
          </div>
        </div>
      </ModalComponent>
      <p className="profile-delete-note">
        Deleting your account will remove all your orders, wallet amount and any
        active referral
      </p>
    </div>
  );
};

export default Profile;
