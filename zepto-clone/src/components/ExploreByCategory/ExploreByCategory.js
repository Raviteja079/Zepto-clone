import React, { useEffect, useState } from "react";
import "./ExploreByCategory.css";
import ProductItem from "../ProductItem/ProductItem";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

const ExploreByCategory = () => {

  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(true)
  const getProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "category"));
      setProducts(querySnapshot.docs);
    } catch (error) {
      console.error("Error getting users:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    getProducts();
  }, [count]);

  return (
    <div className="cardsListContainer">
      <div className="listContainer">
        <div className="cardsList">
          {products.map((doc) => {
            const data = { id: doc.id, ...doc.data() };
            return <ProductItem key={doc.id} data={data} isCard={false} getProducts={getProducts} changedCount={setCount} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ExploreByCategory;
