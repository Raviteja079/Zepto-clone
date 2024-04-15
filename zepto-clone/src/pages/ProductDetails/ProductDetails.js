import { Link, useParams } from "react-router-dom";
import classes from "./ProductDetails.module.css";
import openApp from "../../assets/productDetailsPage/place-order.svg";
import enjoy from "../../assets/productDetailsPage/enjoy.svg";
import doNotBlink from "../../assets/productDetailsPage/do-not-blink.svg";
import zeptoLogo from "../../assets/Footer/logo.svg";
import instagram from "../../assets/Footer/instagram.svg";
import twitter from "../../assets/Footer/twitter.svg";
import facebook from "../../assets/Footer/facebook.svg";
import linkedIn from "../../assets/Footer/linkedin.svg";
import playStore from "../../assets/Footer/play-store.svg";
import appStore from "../../assets/Footer/app-store.svg";
import React, { useEffect, useState } from "react";
import { firestore, useFirebase } from "../../firebase/firebase";
import Header from "../../components/Headers/Header";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import Carousel from "../../components/Carousel/Carousel";

const ProductDetails = () => {
  const { id } = useParams();
  const { searchPageProducts, allCategoriesList,count,setCount,user } = useFirebase();
  const [quantity, setQuantity] = useState(0);
  const [cart,setCart] = useState([])
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
  let Product
  const addToCart = async (product) => {
    try {
      if (user && user.email) {
        Product = product;
        Product["qty"] = 1;
        Product["TotalPrice"] = parseInt(Product.qty) * parseInt(Product.offerPrice);
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

    if (quantity > 1) {

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
    const collectionRef = collection(firestore, "Cart " + user.uid);
    const currentProduct = await getDocs(collectionRef);
    currentProduct.forEach(async (document) => {
      if (document.data().id === productId) {
        const docRef = doc(firestore, "Cart " + user.uid, document.id);
        await updateDoc(docRef, { qty: document.data().qty + 1 });
        setQuantity(document.data().qty + 1);
      }
    });
  };

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
            <div>
              <p className={classes["navigation-text"]}>
                <span>
                  <span>
                    <Link className={classes["navigation-links"]} to={"/"}>
                      Home
                    </Link>
                  </span>
                  {">"}
                </span>
                <span>
                  <span>
                    <Link
                      className={classes["navigation-links"]}
                      to={`/sub-category/${currentProduct.categoryId}/${currentProduct.subCatId}`}
                    >
                      subCategory
                    </Link>
                  </span>
                  {">"}
                </span>
                <span>
                  <span>
                    <Link className={classes["navigation-links"]} to="">
                      {currentProduct.productName}
                    </Link>
                  </span>
                  {">"}
                </span>
              </p>
            </div>
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
              {/* <div>
                <button className={classes["add-btn"]}>Add</button>
              </div> */}

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
                  <button
                    className={classes["add-btn"]}
                    onClick={handleAddClick}
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
            <hr className={classes["hr-line"]} />
            <div className="d-flex flex-column align-items-start">
              <div>
                <h3 className={classes["how-it-works"]}>How it works</h3>
              </div>
              <div className="d-flex justify-content-start align-center mb-4">
                <div className={classes["icon-container"]}>
                  <img
                    className={classes["icon-image"]}
                    src={openApp}
                    alt="instruction-icon"
                  />
                </div>
                <div className="d-flex flex-column">
                  <h5 className={classes["how-it-works-heading"]}>
                    Open the app
                  </h5>
                  <h6 className={classes["how-it-works-description"]}>
                    Choose from over 7000 products across groceries, fresh
                    fruits & veggies, meat, pet care, beauty items & more
                  </h6>
                </div>
              </div>
              <div className="d-flex justify-content-center align-center mb-4">
                <div className={classes["icon-container"]}>
                  <img
                    className={classes["icon-image"]}
                    src={doNotBlink}
                    alt="instruction-icon"
                  />
                </div>
                <div className="d-flex flex-column">
                  <h5 className={classes["how-it-works-heading"]}>
                    Place an order
                  </h5>
                  <h6 className={classes["how-it-works-description"]}>
                    Add your favourite items to the cart & avail the best offers
                  </h6>
                </div>
              </div>
              <div className="d-flex justify-content-center align-center mb-4">
                <div className={classes["icon-container"]}>
                  <img
                    className={classes["icon-image"]}
                    src={enjoy}
                    alt="instruction-icon"
                  />
                </div>
                <div className="d-flex flex-column">
                  <h5 className={classes["how-it-works-heading"]}>
                    Get free delivery
                  </h5>
                  <h6 className={classes["how-it-works-description"]}>
                    Experience lighting-fast speed & get all your items
                    delivered in 10 minutes
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Carousel/>
        <div className={classes["footer-container"]}>
          <div className="m-2">
            <h4 className={classes["categories-heading"]}>Categories</h4>
            <div>
              <ul className={classes["categories-unordered-list"]}>
                {allCategoriesList &&
                  allCategoriesList.map((each) => (
                    <li className={classes["category-list-item"]}>
                      <Link
                        className={classes["category-links"]}
                        to={`/sub-category/${each.id}/1`}
                      >
                        {each.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <hr className={classes["hr-line"]} />
          <div className="mt-5 d-flex">
            <div className={classes["social-media-ac-container"]}>
              <div className={classes["social-media-ac"]}>
                <img
                  className={classes["zepto-logo"]}
                  src={zeptoLogo}
                  alt="zepto-logo"
                />
                <div className="d-flex">
                  <a href="https://www.instagram.com/zeptonow/">
                    <img
                      src={instagram}
                      className={classes["social-media-icon"]}
                      alt="instagram"
                    />
                  </a>
                  <a href="https://twitter.com/ZeptoNow">
                    <img
                      src={twitter}
                      className={classes["social-media-icon"]}
                      alt="twitter"
                    />
                  </a>
                  <a href="https://www.facebook.com/Zeptonow/">
                    <img
                      src={facebook}
                      className={classes["social-media-icon"]}
                      alt="facebook"
                    />
                  </a>
                  <a href="https://www.linkedin.com/company/zeptonow/">
                    <img
                      src={linkedIn}
                      className={classes["social-media-icon"]}
                      alt="linkedIn"
                    />
                  </a>
                </div>
              </div>
              <p className={classes["company-name"]}>
                © KiranaKart Technologies Private Limited
              </p>
            </div>
            <div className={classes["external-links-container"]}>
              <div className="d-flex flex-column w-100">
                <Link to="/" className={classes["external-links"]}>
                  <p>Home</p>
                </Link>
                <a
                  href="https://www.zeptonow.com/del-areas"
                  className={classes["external-links"]}
                >
                  <p>Delivery Areas</p>
                </a>
                <a
                  href="https://zeptonow.openings.co/#!/"
                  className={classes["external-links"]}
                >
                  <p>Careers</p>
                </a>
                <a
                  href="https://www.zeptonow.com/customer-support"
                  className={classes["external-links"]}
                >
                  <p>Customer Support</p>
                </a>
                <a
                  href="https://www.zeptonow.com/press"
                  className={classes["external-links"]}
                >
                  <p>Press</p>
                </a>
              </div>
              <div className="d-flex flex-column w-100">
                <a
                  href="https://www.zeptonow.com/privacy-policy"
                  className={classes["external-links"]}
                >
                  <p>Privacy Policy</p>
                </a>
                <a
                  href="https://www.zeptonow.com/terms-of-service"
                  className={classes["external-links"]}
                >
                  <p>Terms of Use</p>
                </a>
                <a
                  href="https://www.zeptonow.com/responsible-disclosure-policy"
                  className={classes["external-links"]}
                >
                  <p>Responsible Disclosure Policy</p>
                </a>
                <a
                  href="https://blog.zeptonow.com/"
                  className={classes["external-links"]}
                >
                  <p>Mojo - a Zepto Blog</p>
                </a>
              </div>
            </div>
            <div className="">
              <p>Download now</p>
              <div>
                <a
                  href="https://play.google.com/store/apps/details?id=com.zeptoconsumerapp&pli=1"
                  className={classes["download-btn"]}
                >
                  <img
                    src={playStore}
                    className={classes["app-icon"]}
                    alt="playstore"
                  />
                  <p className={classes["button-text"]}>Get it on Playstore</p>
                </a>
                <a
                  href="https://apps.apple.com/in/app/zepto-10-min-grocery-delivery/id1575323645"
                  className={classes["download-btn"]}
                >
                  <img
                    src={appStore}
                    className={classes["app-icon"]}
                    alt="playstore"
                  />
                  <p className={classes["button-text"]}>Get it on Playstore</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
