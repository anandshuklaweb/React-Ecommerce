import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import {
  Home,
  NotFound,
  Login,
  Register,
  Reset,
  Contact,
  Admin,
  Cart,
  OrderHistory,
} from "./pages/index";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import Collection from "./pages/collection/Collection";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import ReviewProducts from "./components/reviewProducts/ReviewProducts";
import Profile from "./pages/profile/Profile";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/collection" element={<Collection />} />

          <Route path="/products/:id" element={<ProductDetails />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout-details" element={<CheckoutDetails />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/checkout-success" element={<CheckoutSuccess />} />

          <Route path="/order-history" element={<OrderHistory />} />

          <Route path="/order-details/:id" element={<OrderDetails />} />

          <Route path="/review-product/:id" element={<ReviewProducts />} />

          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
