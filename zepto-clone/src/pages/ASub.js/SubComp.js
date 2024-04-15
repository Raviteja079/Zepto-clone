import React, { useEffect, useState } from "react";
import Header from "../../components/Headers/Header";
import { useParams } from "react-router-dom";
import { firestore, useFirebase } from "../../firebase/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import ProductItem from "../../components/SubCatProductItem/ProductItem";
// import SubProductItem from "../../components/ProductItem/ProductItem";
import SubPro from "./SubPro";


const SubComp = () => {
  const [products, setProducts] = useState([]);
  const [subCatProducts, setSubCatProducts] = useState([]);
      const { id, subCatId } = useParams();
  const {
    getSubCategories,
    getSubCategoryProducts,
    user,
    cartProductsCount,
  } = useFirebase();

  const addToCart = async (product, id) => {
    try {
        const uid = user.uid
        let Product
      if (uid !== null) {
        Product = product;
        Product["qty"] = 1;
        Product["id"] = id;
        console.log(id, "subCategory");
        Product["TotalPrice"] =
          parseInt(Product.qty) * parseInt(Product.offerPrice);
        const collectionRef = collection(firestore, "Cart " + user.uid);
        const documentRef = doc(collectionRef, product.productName + id);
        await setDoc(documentRef, Product);
      } else {
        cartProductsCount.push(1);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  
console.log("hello",products)
    useEffect(() => {
      console.log("subCategory useEffect");
      const getProducts = async () => {
        console.log("get subcategory try")
        try {
          const subCategories = await getSubCategories(id);
          console.log(subCategories)
            setProducts(subCategories);
        } catch (error) {
          console.error("Error getting users:", error);
          //   setProducts([]);
        }
      };
      const getSubCatProducts = async () => {
        try {
          console.log("getSubCatProducts try");
          const subCategoryProducts = await getSubCategoryProducts(
            id,
            subCatId
          );
          console.log(subCategoryProducts, "asdfasdfasdfasdfd");
          setSubCatProducts(subCategoryProducts);
        } catch (error) {
          console.error("Error getting users:", error);
          setSubCatProducts([]);
        }
      };

        getProducts();
        getSubCatProducts();
    }, [subCatId]);

  return (<div>
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
              {subCatProducts.map((each) => {
                const productId = products[subCatId - 1][1].subCategory;
                console.log(each[1])
                return (
                  <SubPro
                    id={productId + each[0]}
                    key={each[0]}
                    subProduct={each[1]}
                    isCard={true}
                    addToCart={addToCart}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
)}

export default SubComp;
