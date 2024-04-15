import "./Modal.css"

const ModalComponent = ({ isOpen, onClose, variant, children,overlayStyle }) => {
  if (!isOpen) return null;

  let modalContent;

  switch (variant) {
    case "variant1":
      modalContent = <div>Variant 1 Content</div>;
      break;
    case "variant2":
      modalContent = <div>Variant 2 Content</div>;
      break;
    default:
      modalContent = <div>Default Content</div>;
      break;
  }
  
  return (
    <div
      className="modal-component-overlay"
      onClick={onClose}
    >
      <div
        className={`${overlayStyle} modal-component-content `}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-component-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};


export default ModalComponent