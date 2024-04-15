import React from 'react';
import "./Button.css"

const Button = ({ onClick, children, disabled,className }) => {
  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
};

export default Button