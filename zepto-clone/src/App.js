import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { NotFound } from "./components/NotFound";
import { Cart } from "./pages/Cart.js";
import { LoggedInStatusProvider } from "./firebase/firebase.js";
import Account from "./components/Account/Account.js";
import SubCategory from "./pages/SubCategory/SubCategory.js";
import Search from "./pages/Search.js";
import ProductDetails from "./pages/ProductDetails/ProductDetails.js";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes.js";

function App() {
  return (
    <BrowserRouter>
      <LoggedInStatusProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/account">
              <Route path="" element={<Account />} />
              <Route path="cart" element={<Account />} />
              <Route path="search" element={<Account />} />
              <Route path="paan-corner" element={<Account />} />
              <Route path="products-for-you" element={<Account />} />
              <Route path="account" element={<Account />} />
              <Route path="orders" element={<Account />} />
              <Route path="customer-support" element={<Account />} />
              <Route path="referrals" element={<Account />} />
              <Route path="address" element={<Account />} />
              <Route path="profile" element={<Account />} />
              <Route path="wallet" element={<Account />} />
              <Route path="order-details/:orderId" element={<Account />} />
            </Route>
          </Route>

          <Route path="/sub-category/:id" element={<SubCategory />}>
            <Route path=":subCatId" element={<SubCategory />} />
          </Route>

          {/* <Route path="/payment" element={<Payment />} /> */}
          <Route path="/search" element={<Search />} />
          <Route path="/product-details">
            <Route path=":id" element={<ProductDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LoggedInStatusProvider>
    </BrowserRouter>
  );
}

export default App;
