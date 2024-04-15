import React, { useEffect, useState } from "react";
import Header from "../components/Headers/Header";
import { useLocation } from "react-router-dom";
import "./Search.css";
import { firestore, useFirebase } from "../firebase/firebase";
import ProductItem from "../components/ProductItem/ProductItem";
import { addDoc, collection, getDocs } from "firebase/firestore";

const Search = () => {
  const location = useLocation();
  const [cart, setCart] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { searchPageProducts, user } = useFirebase();

  const handleSearchInputChange = (event) => {
    // setSearchQuery(event.target.value);
    filterData(event.target.value);
  };

  const filterData = (query) => {
    const filteredData = searchPageProducts.filter((item) =>
      item.productName.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredData);
  };

  useEffect(() => {
    setSearchResults(searchPageProducts);
  }, []);

  useEffect(() => {
    const { pathname } = location;
    document.title = pathname;
  }, [location]);

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

  return (
    <>
      <Header isSearch={true} inputChange={handleSearchInputChange} />
      <div className="search-page-container">
        <ul className="unordered-list">
          {searchResults.map((each, index) => {
           return <ProductItem
              key={index}
              data={each}
              isCard={true}
              isSearchPage={true}
              addToCart={addToCart}
              cart={cart}
            />
})}
        </ul>
      </div>
    </>
  );
};

export default Search;
