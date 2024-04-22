import React, { useEffect, useState } from "react";
import classes from "./ProductItem.module.css";
import { Link } from "react-router-dom";
import { firestore, useFirebase } from "../../firebase/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const ProductItem = (props) => {
  const { data, isCard, addToCart, product, isCartProduct, updateCart, cart } = props;
  const { user, count, setCount } = useFirebase();
  const [quantity, setQuantity] = useState(0);

  let productId;
  if (product === undefined) {
    productId = data.id;
  } else {
    productId = product.productData.id;
  }

  useEffect(() => {
    if (cart) {
      let p = cart.find((product) => {
        return product.id === productId;
      });
      if (p) {
        setQuantity(p.qty);
      } else {
        setQuantity(0);
      }
    }
  }, [cart, productId]);

  useEffect(() => {
    if (isCartProduct) {
      setQuantity(product.productData.qty);
    }
  }, [isCartProduct]);

  const handleAddClick = async () => {
    setCount((q) => q + 1);
    await addToCart(data);
    setQuantity((q) => q + 1);
  };

  const decreaseQty = async () => {
      setCount((q) => q - 1);
    // }
    if (quantity === 1) {
      let productId;
      if (product === undefined) {
        productId = data.id;
      } else {
        productId = product.productData.id;
        setQuantity(product.productData.qty);
      }
      try {

         const collectionRef = collection(firestore, "Cart " + user.uid);
         let q = query(collectionRef, where("id", "==", productId));
         let u = await getDocs(q);
         u = u.docs;
         const docRef = doc(firestore, "Cart " + user.uid, u[0].id);
         await deleteDoc(docRef);
         if (isCartProduct) {
           await updateCart();
         } else {
           setQuantity(0);
         }

        return;
      } catch (err) {
        console.log(err.message);
      }
    }

    if (quantity > 1) {
      const collectionRef = collection(firestore, "Cart " + user.uid);
        let q = query(collectionRef, where("id", "==", productId));
        let u = await getDocs(q);
        u = u.docs
        const docRef = doc(firestore, "Cart " + user.uid,u[0].id);
        await updateDoc(docRef, { qty: u[0].data().qty - 1 });
          setQuantity(u[0].data().qty - 1);
        }
  };

  const increaseQty = async () => {
    try {
      setCount((q) => q + 1);

    const collectionRef = collection(firestore, "Cart " + user.uid);
    let q = query(collectionRef, where("id", "==", productId));
    let u = await getDocs(q);
    u = u.docs;
    const docRef = doc(firestore, "Cart " + user.uid, u[0].id);
    await updateDoc(docRef, { qty: u[0].data().qty + 1 });
    setQuantity(u[0].data().qty + 1);

    } catch (err) {
      console.log(err.message);
    }
  };

  if (isCard)
    return (
      <Link
        to={`/product-details/${productId}`}
        className={
          props.isSearchPage
            ? `${classes["search-page-card-link"]}`
            : `${classes["card-link"]}`
        }
      >
        <div
          className={
            props.isSearchPage
              ? `${classes["search-page-card-container"]} ${classes["card-container"]}`
              : `${classes["card-container"]} ${classes["card-products-container"]}`
          }
        >
          <div className={classes["product-image-container"]}>
            <img
              alt="product"
              src={data.image}
              className={classes["listItem"]}
            />
          </div>
          <div>
            <h5 className={classes["item-name"]}>{data.productName}</h5>
          </div>
          <div>
            <h4 className={classes["quantity-text"]}>{data.quantity}</h4>
          </div>
          <div className={classes["bottom-section"]}>
            <div className={classes["prices-container"]}>
              <h5 className={classes["original-price"]}>
                ₹{data.originalPrice}
              </h5>
              <h5 className={classes["offer-price"]}>₹{data.offerPrice}</h5>
            </div>
            <div className={classes["btns-container"]}>
              {quantity > 0 ? (
                <div className={classes["icons-container"]}>
                  <button
                    className={classes["increment-decrement-btn"]}
                    onClick={decreaseQty}
                  >
                    -
                  </button>
                  <div className={["count-container"]}>{quantity}</div>
                  <button
                    onClick={increaseQty}
                    className={classes["increment-decrement-btn"]}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button className={classes["add-btn"]} onClick={handleAddClick}>
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  else if (props.isCarousel)
    return (
      <div
        className={
          props.isSearchPage
            ? `${classes["search-page-card-link"]}`
            : `${classes["card-link"]}`
        }
      >
        <div
          className={
            props.isSearchPage
              ? `${classes["search-page-card-container"]} ${classes["card-container"]}`
              : `${classes["card-container"]} ${classes["card-products-container"]}`
          }
        >
          <Link
            to={`/product-details/${productId}`}
            className={classes["product-image-container"]}
          >
            <img
              alt="product"
              src={data.image}
              className={classes["listItem"]}
            />
          </Link>
          <div>
            <h5 className={classes["item-name"]}>{data.productName}</h5>
          </div>
          <div>
            <h4 className={classes["quantity-text"]}>{data.quantity}</h4>
          </div>
          <div className={classes["bottom-section"]}>
            <div className={classes["prices-container"]}>
              <h5 className={classes["original-price"]}>
                ₹{data.originalPrice}
              </h5>
              <h5 className={classes["offer-price"]}>₹{data.offerPrice}</h5>
            </div>
            <div className={classes["btns-container"]}>
              {quantity > 0 ? (
                <div className={classes["icons-container"]}>
                  <button
                    className={classes["increment-decrement-btn"]}
                    onClick={decreaseQty}
                  >
                    -
                  </button>
                  <div className={["count-container"]}>{quantity}</div>
                  <button
                    onClick={increaseQty}
                    className={classes["increment-decrement-btn"]}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button className={classes["add-btn"]} onClick={handleAddClick}>
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  else if (isCartProduct)
    return (
      <div className="ordered-product-card">
        <div className="cp-card-container">
          <div className="d-flex">
            <img
              src={product.productData.image}
              alt="product"
              className="ordered-product-image"
            />
            <div>
              <p className="cp-product-name">
                {product.productData.productName}
              </p>
              <p className="cp-quantity">{product.productData.quantity}</p>
              <div className="cp-prices">
                <h6 className="cp-offer-price">
                  ₹{product.productData.offerPrice}
                </h6>
                <h6 className="cp-original-price">
                  {product.productData.originalPrice}
                </h6>
              </div>
            </div>
          </div>

          <div className="">
            <div className="cp-btns-container">
              <button className="btn-icon" onClick={decreaseQty}>
                -
              </button>
              <span className="cp-count-text">{quantity}</span>
              <button className="btn-icon" onClick={increaseQty}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <Link to={`/sub-category/${data.id}/1`}>
      <div>
        <img
          alt="product"
          src={data.image}
          className={
            data.id === "1" ? classes["listItemFirst"] : classes["listItem"]
          }
        />
      </div>
    </Link>
  );
};
export default ProductItem;
