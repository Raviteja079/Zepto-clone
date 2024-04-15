import React, { useState } from "react";
import "./Location.css";
import { useFirebase } from "../../firebase/firebase";
import { FaAngleDown } from "react-icons/fa6";
import currentLocation from "../../assets/Headers/current-location-marker-icon.svg";
import { CiSearch } from "react-icons/ci";

const Modal = ({ isOpen, onClose, children, showShakeEffect, modalType }) => {
  if (!isOpen) return null;
  const styleClass =
    modalType === "inputReadModal"
      ? "input-read-modal"
      : "location-modal-content";

  return (
    <div className={`modal-card-overlay`} onClick={onClose}>
      <div
        className={`${styleClass} ${showShakeEffect ? "shake" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="location-modal-close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export const LocationDetails = () => {
  const { myLocation, setMyLocation, showLocation, setShowLocation } =
    useFirebase();
  const [modalOpen, setModalOpen] = useState(true);
  const [inputReadModal, setInputReadModal] = useState(false);

  const openModal = () => {
    setShowLocation(true);
    setMyLocation("");
    setInputReadModal(false);
  };
  const openEnterLocationModal = () => {
    setInputReadModal(true);
    setShowLocation(false);
  };

  const [location, setLocation] = useState("");

  const closeModal = () => {
    if (location.trim() === "") {
      setShowLocation(true);
    } else {
      setMyLocation(location);
      setShowLocation(false);
    }
  };

  const [showShakeEffect, setShowShakeEffect] = useState(false);

  return (
    <div className="timeLocationText">
      <h5 className="delivery-text">
        Delivery in
        <span className="timeText"> 8 Mins</span>
      </h5>
      <button
        className="bg-transparent border-0 d-flex flex-start align-items-center"
        onClick={openModal}
      >
        <span>{myLocation}</span>
        <FaAngleDown className="location-angle-down" />
      </button>
      {inputReadModal && myLocation === "" ? (
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          showShakeEffect={showShakeEffect}
          modalType="inputReadModal"
        >
          <div className="w-100 input-read-modal-card">
            <h5 className="location-heading">Your Location</h5>
            <hr />
            <div className="d-flex align-items-center">
              <div className="modal-input-search-icon">
                <CiSearch />
              </div>

              <input
                placeholder="Search a new address"
                className="location-input"
                onChange={(e) => setLocation(e.target.value)}
              />
              <button className="location-submit-btn" onClick={closeModal}>
                submit
              </button>
            </div>

            <div className="d-flex align-items-center">
              <img
                src={currentLocation}
                className="mt-2"
                alt="current-location"
              />
              <div className="cl-text-container">
                <h5 className="current-location-text">Current Location</h5>
                <p className="enable-text">
                  Enable your current location for better services
                </p>
              </div>
              <div>
                <button className="enable-button">Enable</button>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}
      {showLocation && myLocation === "" ? (
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          showShakeEffect={showShakeEffect}
          modalType="mainModal"
        >
          <div className="d-flex flex-column">
            <div className="d-flex">
              <svg
                width="100"
                height="100"
                viewBox="0 0 18 22"
                className="svg-location"
              >
                <path
                  d="M9 0C4.02949 0 0 3.99849 0 8.93076C0 13.4051 5.60746 19.292 7.97051 21.5743C8.54929 22.1321 9.4644 22.1438 10.0544 21.5971C12.4316 19.3982 18 13.7335 18 8.93028C17.9995 3.99849 13.9705 0 9 0ZM9 11.8325C6.94492 11.8325 5.27994 10.1803 5.27994 8.14154C5.27994 6.10276 6.94492 4.4501 9 4.4501C11.0546 4.4501 12.7191 6.10227 12.7191 8.14154C12.7191 10.1808 11.0546 11.8325 9 11.8325Z"
                  fill="black"
                />
              </svg>
              <p>
                To deliver as quickly as possible, we would like your current
                location
              </p>
            </div>
            <div className="d-flex align-items-center ml-4">
              <button
                className="set-location-btn"
                onClick={openEnterLocationModal}
              >
                Type Manually
              </button>
              <button className="current-location" onClick={closeModal}>
                Use Current Location
              </button>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};
