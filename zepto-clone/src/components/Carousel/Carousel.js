import React, { useEffect, useState } from "react";
import "./Carousel.css";
import { firestore, useFirebase } from "../../firebase/firebase";
import ProductItem from "../ProductItem/ProductItem";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Loading from "../Loading";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [cart, setCart] = useState([]);
  const { searchPageProducts, user } = useFirebase();
  const items = 5; 
  const visibleItems = 7;

  useEffect(() => {
    setSearchResults(searchPageProducts);
  }, [searchPageProducts]);

  const moveLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  const moveRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items-1 ? prevIndex : prevIndex + 1
    );
  };

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

  const carouselContentStyle = {
    transform: `translateX(${-(currentIndex * (100 / visibleItems))}%)`,
  };
 return (
   <div className="carousel">
     <div className="carousel-content" style={carouselContentStyle}>
       {searchResults.length === 0 ? (
         <Loading />
       ) : (
         <>
           {searchResults.map((each, index) => {
             return (
               <ProductItem
                 key={index}
                 data={each}
                 isSearchPage={false}
                 addToCart={addToCart}
                 cart={cart}
                 isCarousel={true}
               />
             );
           })}
           <div className="carousel-btn left" onClick={moveLeft}>
             &#10094;
           </div>
           <div className="carousel-btn right" onClick={moveRight}>
             &#10095;
           </div>
         </>
       )}
     </div>
   </div>
 );

};

export default Carousel;
