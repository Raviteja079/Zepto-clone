import React, { useEffect, useState } from "react";
import "./AllProducts.css";
import Header from "../../components/Headers/Header";
import ProductItem from "../../components/ProductItem/ProductItem";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { useLocation } from "react-router-dom";

const AllProducts = () => {
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    document.title = pathname;
  }, [location]);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(firestore, "allproducts")
        );

        setProducts(querySnapshot.docs);
      } catch (error) {
        console.error("Error getting users:", error);
        setProducts([]);
      }
    };
    getProducts();
  }, []);
  return (
    <div>
      <Header isSearchPage={false} />
      <div className="all-products-list-head">
        <h4 className="all-products-head">Products For you</h4>
        <div className="cardsListContainer">
          <div className="listContainer">
            <div className="cardsList">
              {products.map((doc) => {
                const data = { id: doc.id, ...doc.data() };
                return <ProductItem key={doc.id} data={data} isCard={true} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
