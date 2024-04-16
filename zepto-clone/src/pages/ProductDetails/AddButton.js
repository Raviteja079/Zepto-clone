import classes from "./AddButton.module.css"
import React from "react";

const AddButton = (props) => {
    return (
      <div className={classes["btns-container"]}>
        {props.quantity > 0 ? (
          <div className={classes["icons-container"]}>
            <button
              className={classes["increment-decrement-btn"]}
              onClick={props.decreaseQty}
            >
              -
            </button>
            <div className={["count-container"]}>{props.quantity}</div>
            <button
              onClick={props.increaseQty}
              className={classes["increment-decrement-btn"]}
            >
              +
            </button>
          </div>
        ) : (
          <button className={classes["add-btn"]} onClick={props.handleAddClick}>
            Add
          </button>
        )}
      </div>
    );
};

export default AddButton;
