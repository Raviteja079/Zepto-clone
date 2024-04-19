import { useState } from "react";
import "./DeliveryInstructin.css"
import pets from "../../assets/cart/beware_of_pets.avif"
import bell from "../../assets/cart/do_not_ring_bell.png"
import noContact from "../../assets/cart/no_contact_delivery.avif"
import bottle from "../../assets/cart/return_bottle.avif"
import { useFirebase } from "../../firebase/firebase";

const DeliveryInstructions = () => {
  const [selectedInstructions, setSelectedInstructions] = useState([]);
  const { setDelvryInstructions } = useFirebase();

  const toggleInstruction = (instruction) => {
    if (selectedInstructions.includes(instruction)) {
      setSelectedInstructions(
        selectedInstructions.filter((item) => item !== instruction)
      );
    } else {
      setSelectedInstructions([...selectedInstructions, instruction]);
    }
    setDelvryInstructions(selectedInstructions)
  };


  return (
    <div className="main-container">
      <div className="container">
        <div
          className={`instruction ${
            selectedInstructions.includes("instrn-1") && "selected"
          }`}
          onClick={() => toggleInstruction("instrn-1")}
        >
          <div className="d-flex align-items-center">
            <img src={pets} alt="pets" className="instruction-img" />
            <h6>Beware of pets</h6>
          </div>

          <p>Delivery partner will be informed about the presence of pet(s)</p>
        </div>
        <div
          className={`instruction ${
            selectedInstructions.includes("instrn-2") && "selected"
          }`}
          onClick={() => toggleInstruction("instrn-2")}
        >
          <div className="d-flex align-items-center">
            <img src={bell} alt="bell" className="instruction-img" />
            <h6>Do Not Ring The Bell</h6>
          </div>

          <p>Delivery partner will not ring the bell</p>
        </div>
        <div
          className={`instruction ${
            selectedInstructions.includes("instrn-3") && "selected"
          }`}
          onClick={() => toggleInstruction("instrn-3")}
        >
          <div className="d-flex align-items-center">
            <img src={noContact} alt="door" className="instruction-img" />
            <h6>No Contact Delivery</h6>
          </div>
          <p>Delivery partner will leave your order at your door</p>
        </div>
        <div
          className={`instruction ${
            selectedInstructions.includes("instrn-4") && "selected"
          }`}
          onClick={() => toggleInstruction("instrn-4")}
        >
          <div className="d-flex align-items-center">
            <img src={bottle} alt="bottle" className="instruction-img bottle" />
            <h6>Return PET Bottles</h6>
          </div>

          <p>
            Help us recycle plastic bottles by returning them to our delivery
            partner
          </p>
          <div>
            <p>An Initiative by COCA COLA</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInstructions;
