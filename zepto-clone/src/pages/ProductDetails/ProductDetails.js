import { addDoc,collection,deleteDoc,doc,getDocs,updateDoc} from "firebase/firestore";
import { useParams } from "react-router-dom";
import classes from "./ProductDetails.module.css";
import React, { useEffect, useState } from "react";
import { firestore, useFirebase } from "../../firebase/firebase";
import Header from "../../components/Headers/Header";
import Carousel from "../../components/Carousel/Carousel";
import Footer from "./Footer";
import HowItWorksSection from "./HowItWorksSection";
import NavigationSection from "./NavigationSection";
import AddButton from "./AddButton";

const ProductDetails = () => {
  const { id } = useParams();
  const { searchPageProducts, count, setCount, user } = useFirebase();
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useState([]);
  let currentProduct;

  try {
    currentProduct = searchPageProducts.filter((product) => product.id === id);
    currentProduct = currentProduct[0];
  } catch (err) {
    console.log(err.message);
  }

  useEffect(() => {
    const getCart = async () => {
      try {
        if (user && user.email) {
          const collectionRef = collection(firestore, "Cart " + user.uid);
          let result = await getDocs(collectionRef);
          const resultArray = [];
          result.forEach((doc) => {
            resultArray.push(doc.data());
          });
          setCart(resultArray);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getCart();
  }, [user]);

  const productId = currentProduct.id;
  let Product;
  const addToCart = async (product) => {
    try {
      if (user && user.email) {
        Product = product;
        Product["qty"] = 1;
        Product["TotalPrice"] =
          parseInt(Product.qty) * parseInt(Product.offerPrice);
        const collectionRef = collection(firestore, "Cart " + user.uid);
        await addDoc(collectionRef, Product);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

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

  const handleAddClick = async () => {
    setCount((q) => q + 1);
    await addToCart(currentProduct);
    setQuantity((q) => q + 1);
  };

  const decreaseQty = async () => {
    if (!count <= 0) {
      setCount((q) => q - 1);
    }
    if (quantity === 1) {
      setQuantity(currentProduct.qty);
      try {
        const collectionRef = collection(firestore, "Cart " + user.uid);
        const currentProduct = await getDocs(collectionRef);
        currentProduct.forEach(async (document) => {
          if (document.data().id === productId) {
            const docRef = doc(firestore, "Cart " + user.uid, document.id);
            await deleteDoc(docRef);
            setQuantity(0);
          }
        });
        return;
      } catch (err) {
        console.log(err.message);
      }
    }
    if (quantity > 1 && user && user.email) {
      const collectionRef = collection(firestore, "Cart " + user.uid);
      const currentProduct = await getDocs(collectionRef);
      currentProduct.forEach(async (document) => {
        if (document.data().id === productId) {
          const docRef = doc(firestore, "Cart " + user.uid, document.id);
          await updateDoc(docRef, { qty: document.data().qty - 1 });
          setQuantity(document.data().qty - 1);
        }
      });
    }
  };

  const increaseQty = async () => {
    setCount((q) => q + 1);
    try{
        if(user && user.email){
        const collectionRef = collection(firestore, "Cart " + user.uid);
        const currentProduct = await getDocs(collectionRef);
        currentProduct.forEach(async (document) => {
          if (document.data().id === productId) {
            const docRef = doc(firestore, "Cart " + user.uid, document.id);
            await updateDoc(docRef, { qty: document.data().qty + 1 });
            setQuantity(document.data().qty + 1);
          }
        });
    }
    }catch(err){
        console.log(err.message)
    }
    
  }
  ;

  return (
    <>
      <Header isSearch={false} />
      <div className={classes["wrapper"]}>
        <div className="d-flex">
          <div className={classes["left-section"]}>
            <div className={classes["image-container"]}>
              <img src={currentProduct.image} alt="product" />
            </div>
            <div className={classes["about-product"]}>
              <h5>About Product</h5>
            </div>
            <div className={classes["description-container"]}>
              <ul className={classes["about-product-unordered-list"]}>
                {currentProduct &&
                  currentProduct.description.map((each) => <li>{each}</li>)}
              </ul>
            </div>
          </div>
          <div className={classes["right-section"]}>
            <NavigationSection currentProduct={currentProduct} />
            <div>
              <h5 className={classes["product-name"]}>
                {currentProduct.productName}
              </h5>
            </div>
            <div className={classes["quantity"]}>
              <p>{currentProduct.quantity}</p>
            </div>
            <div>
              <div className={classes["price-details"]}>
                <h4 className={classes["offer-price"]}>
                  ₹{currentProduct.offerPrice}
                </h4>
                <p className={classes["original-price"]}>
                  ₹{currentProduct.originalPrice}
                </p>
                {currentProduct.discountPercentage && (
                  <div className={classes["discount-percentage"]}>
                    {currentProduct.discountPercentage} % Off
                  </div>
                )}
              </div>
              <AddButton
                quantity={quantity}
                handleAddClick={handleAddClick}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                count= {count}
              />
            </div>
            <hr className={classes["hr-line"]} />
            <HowItWorksSection />
          </div>
        </div>
        <Carousel />
        <Footer />
      </div>
    </>
  );
};

export default ProductDetails;
