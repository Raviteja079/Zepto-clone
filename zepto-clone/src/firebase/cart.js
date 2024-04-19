import { collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";

export const getAllCartProducts = async (
  user,
  setCartProductsList,
  setCount
) => {
  try {
    if (user && user.email) {
      const collectionRef = collection(firestore, "Cart " + user.uid);
      const querySnapshot = await getDocs(collectionRef);

      const cartProducts = [];

      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        cartProducts.push({ id: doc.id, productData });
      });
      setCartProductsList(cartProducts);
      const totalQty = cartProducts.reduce(
        (acc, curr) => acc + curr.productData.qty,
        0
      );
      setCount(totalQty);
      return cartProducts;
    }
  } catch (error) {
    console.error("Error getting cart products: ", error);
    return [];
  }
};
// const getAllCartProducts = async () => {
//   try {
//     if (user && user.email) {
//       const collectionRef = collection(firestore, "Cart " + user.uid);
//       const querySnapshot = await getDocs(collectionRef);

//       const cartProducts = [];

//       querySnapshot.forEach((doc) => {
//         const productData = doc.data();
//         cartProducts.push({ id: doc.id, productData });
//       });
//       setCartProductsList(cartProducts);
//       const totalQty = cartProductsList.reduce(
//         (acc, curr) => acc + curr.productData.qty,
//         0
//       );
//       setCount(totalQty);
//       return cartProducts;
//     }
//   } catch (error) {
//     console.error("Error getting cart products: ", error);
//     return [];
//   }
// };

export const getCartProducts = async (user,productId) => {
  try {
    const collectionRef = collection(firestore, "Cart " + user.uid);
    const documentRef = doc(collectionRef, productId);
    const result = await getDoc(documentRef);
    const data = result.data();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export const updateCart = async (
  getCartProducts,
  setCurrentProductId,
  setUpdatedProduct,
  productId,
  qty,user
) => {
  try {
    setCurrentProductId(productId);
    const currentProduct = await getCartProducts(user,productId);
    const updated = { ...currentProduct, qty: (currentProduct.qty += qty) };
    setUpdatedProduct(updated);
    return updated;
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteDocuments = async (collectionRef) => {
  try {
    const ordersDocs = await getDocs(collectionRef);

    ordersDocs.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

  } catch (error) {
    console.error(error);
  }
};

export const emptyCart = async (user) => {
  try {
    const collectionRef = collection(firestore, "Cart " + user.uid);
    await deleteDocuments(collectionRef);
  } catch (err) {
    console.log(err.message);
  }
};