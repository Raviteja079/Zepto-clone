// import React, { useState } from "react";
// import classes from "./SearchPageCard.module.css";
// import { firestore, useFirebase } from "../../firebase/firebase";
// import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";

// const SearchPageCard = ({ data }) => {
//   const [quantity, setQuantity] = useState(0);
//   const { user,count,setCount } = useFirebase();

//   let Product;
//   const addToCart = async (product, id) => {
//     try {
//       if (user && user.email) {
//         Product = product;
//         Product["qty"] = 1;
//         Product["id"] = id;
//         Product["TotalPrice"] =
//           parseInt(Product.qty) * parseInt(Product.offerPrice);
//         const collectionRef = collection(firestore, "Cart " + user.uid);
//         // const documentRef = doc(collectionRef, product.productName + id);
//         // const isExistingDoc = await getDoc(documentRef);
//         const currentProduct = await getDocs(collectionRef);
//         currentProduct.forEach(async (document) => {
//           if (document.data().id === product.id) {
//             const docRef = doc(firestore, "Cart " + user.uid, document.id);
//             await updateDoc(docRef, { qty: document.data().qty + 1 });
//             setQuantity(document.data().qty + 1);
//           }
//         });

//         if (isExistingDoc) {
//             console.log(isExistingDoc.data(),"exisitng doc")
//           increaseQty();
//         } else {;
//             setQuantity((q) => q + 1);
//             setCount((q) => q + 1);
//           await setDoc(documentRef, Product);
//           console.log("added product doc to new cart collection")
//         }
//       }
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   const handleAddClick = async () => {
//     try {
//       addToCart(data);
//       console.log(data);
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   const decreaseQty = async () => {
//     try {
//       console.log("decrease Qty");
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   const increaseQty = async () => {
//     try {
//       console.log("increase Qty");
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   return (
//     <div className={classes["card-container"]}>
//       <div className={classes["product-image-container"]}>
//         <img alt="product" src={data.image} className={classes["listItem"]} />
//       </div>
//       <div>
//         <h5 className={classes["item-name"]}>{data.productName}</h5>
//       </div>
//       <div>
//         <h4 className={classes["quantity-text"]}>{data.quantity}</h4>
//       </div>
//       <div className={classes["bottom-section"]}>
//         <div className={classes["prices-container"]}>
//           <h5 className={classes["original-price"]}>₹{data.originalPrice}</h5>
//           <h5 className={classes["offer-price"]}>₹{data.offerPrice}</h5>
//         </div>
//         <div className={classes["btns-container"]}>
//           {quantity > 0 ? (
//             <div className={classes["icons-container"]}>
//               <button
//                 className={classes["increment-decrement-btn"]}
//                 onClick={decreaseQty}
//               >
//                 -
//               </button>
//               <div className={["count-container"]}>{quantity}</div>
//               <button
//                 onClick={increaseQty}
//                 className={classes["increment-decrement-btn"]}
//               >
//                 +
//               </button>
//             </div>
//           ) : (
//             <button className={classes["add-btn"]} onClick={handleAddClick}>
//               Add
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchPageCard;
