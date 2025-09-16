import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Shoppinglayout from "../components/shopping-view/Shoppinglayout";
import Checkout from "../pages/shopping-view/Checkout";
import Home from "../pages/shopping-view/Home";
import Account from "../pages/shopping-view/Account";
import Listing from "../pages/shopping-view/Listing";
import Adminlayout from "../components/admin-view/Adminlayout"
import Dashboard from "../pages/admin-view/Dashboard"
import Products from "../pages/admin-view/Product"

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Shoppinglayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/Listing" element={<Listing />} />
      </Route>
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="/" element={<Adminlayout.jsx/>}  >
      <Route path="/dashboard " element={<Dashboard/>}/>
      <Route path="/products " element={<Products/>}/>

      </Route>
    </Routes>
  );
};

export default MainRoutes;
