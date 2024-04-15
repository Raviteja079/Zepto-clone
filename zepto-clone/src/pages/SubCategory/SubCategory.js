import React, { useEffect, useState } from "react";
import Header from "../../components/Headers/Header";
import "./SubCategory.css";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { firebaseAuth, firestore, useFirebase } from "../../firebase/firebase";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import ProductItem from "../../components/SubCatProductItem/ProductItem";
import SubProductItem from "../../components/ProductItem/ProductItem";
import { onAuthStateChanged } from "firebase/auth";

const SubCategory = () => {
  const navigate = useNavigate();
  const { id, subCatId } = useParams();
  const {
    getSubCategories,
    getSubCategoryProducts,
    user,
    cartProductsCount,
    getCartProducts,
    setCount
  } = useFirebase();
  const [products, setProducts] = useState([]);
  const [subCatProducts, setSubCatProducts] = useState([]);
  const [cart, setCart] = useState([])
  function GetUserUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          setUid(user.uid);
        } else {
          setUid(null);
        }
      });
    }, []);
    return uid;
  }
  const uid = GetUserUid();

  let Product;
  const addToCart = async (product) => {
    try {
      if (uid !== null) {
        Product = product;
        Product["qty"] = 1;
        Product["TotalPrice"] =
          parseInt(Product.qty) * parseInt(Product.offerPrice);
        const collectionRef = collection(firestore, "Cart " + user.uid);
        // const documentRef = doc(collectionRef, product.id);
        await addDoc(collectionRef, Product);
      } else {
        cartProductsCount.push(1);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getSubCatProducts = async () => {
    try {
      const subCategoryProducts = await getSubCategoryProducts(id, subCatId);
      setSubCatProducts(subCategoryProducts);
    } catch (error) {
      console.error("Error getting users:", error);
      setSubCatProducts([]);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const subCategories = await getSubCategories(id);
        setProducts(subCategories);
      } catch (error) {
        console.error("Error getting users:", error);
        setProducts([]);
      }
    };
    getProducts();
    getSubCatProducts();
    
  }, [id, subCatId]);


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
}
    getCart()
  },[user,subCatId])

  return (
    <div>
      <Header isSearch={false} />
      <div className="sub-category-container">
        <div className="sub-category-sidebar-details-container">
          <div className="sub-category-sidebar">
            {products.map((product, i) => {
              return (
                <ProductItem
                  id={product[0]}
                  key={product[0]}
                  data={product[1]}
                />
              );
            })}
          </div>
          <div className="sub-category-details-page">
            <h3 className="detailed-page-head">Buy Fresh Fruits Online</h3>
            <div className="detailed-page-container">
              {subCatProducts.length!==0 && subCatProducts.map((each) => {
                const productId = products[subCatId-1][1].subCategory;
                console.log(each,"eachhhhhhhhhhhhhhhhh")
                return (
                  <SubProductItem
                    key={each[0]}
                    data={each[1]}
                    isCard={true}
                    addToCart={addToCart}
                    cart={cart}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategory;
