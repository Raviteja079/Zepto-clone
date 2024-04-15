import React, { useEffect } from "react";
import Header from "../components/Headers/Header";
import { BannerSecion } from "../components/Banner/BannerSecion";
import { Products } from "../components/ProductsSection/Products";
import "./Home.css"
import Footer from "../components/Footer/Footer";
import { useFirebase } from "../firebase/firebase";
import OfferBanner from "../components/OfferForYouBanner/OfferBanner";
import Carousel from "../components/Carousel/Carousel";

function Home() {
    document.title = "Grocery Delivery"
    const {getAllCartProducts,count} = useFirebase()

    useEffect(() => {
        const callGetAllCartProducts = async()=>{
            await getAllCartProducts();
        }
        callGetAllCartProducts()
    }, [count]);

  return (
    <div className="home-page-container">
      <Header />
      <BannerSecion />
      <OfferBanner/>
      <Products />
      <Footer/>
    </div>
  );
}

export default Home;
