import React, { useEffect, useState } from "react";
import classes from "../../components/ProductItem/ProductItem.module.css";
import { Link, useParams } from "react-router-dom";
import { firestore, useFirebase } from "../../firebase/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const ProductItem = ({ subProduct, isCard, addToCart, id }) => {
  const { user } = useFirebase();
  const { subCatId } = useParams();
  console.log(subCatId, "subcatId");
  const [quantity, setQuantity] = useState(0);
  // const[cartProducts,setCartProducts] = useState([])
  const [paramId, setParamId] = useState(subCatId);

  useEffect(() => {
    const getCartProducts = async () => {
      console.log("newProduct,", subProduct.productName);
      const collectionRef = collection(firestore, "Cart " + user.uid);
      const result = await getDocs(collectionRef);
      result.forEach((each) => {
        if (each.id === subProduct.productName + id) {
          // console.log(each.data().qty,each.data().productName,"with same values")
          setQuantity(each.data().qty);
        }
      });
    };
    getCartProducts();
    console.log("hello");
  }, [id, subCatId, paramId]);

  if (isCard)
    return (
      <div className={classes["card-container"]}>
        <div className={classes["product-image-container"]}>
          <img
            alt="product"
            src={subProduct.image}
            className={classes["listItem"]}
          />
        </div>
        <div>
          <h5 className={classes["item-name"]}>{subProduct.productName}</h5>
        </div>
        <div>
          <h4 className={classes["quantity-text"]}>{subProduct.quantity}</h4>
        </div>
        <div className={classes["bottom-section"]}>
          <div className={classes["prices-container"]}>
            <h5 className={classes["original-price"]}>
              ₹{subProduct.originalPrice}
            </h5>
            <h5 className={classes["offer-price"]}>₹{subProduct.offerPrice}</h5>
          </div>
          <div className={classes["btns-container"]}>
            {true ? (
              <div className={classes["icons-container"]}>
                <button
                  className={classes["increment-decrement-btn"]}
                  onClick={addToCart}
                >
                  -
                </button>
                <div className={["count-container"]}>{quantity}</div>
                <button
                  onClick={addToCart}
                  className={classes["increment-decrement-btn"]}
                >
                  +
                </button>
              </div>
            ) : (
              <button className={classes["add-btn"]} onClick={addToCart}>
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    );
};
export default ProductItem;
