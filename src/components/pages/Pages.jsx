import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "../common/header/Header";
import Home from "../home/Home";
import Footer from "../common/footer/Footer";
import About from "../about/About";
import Pricing from "../pricing/Pricing";
import Blog from "../blog/Blog";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import LoginForm from "../login/Login";
import RegisterForm from "../register/Register";
import AddProducts from "../products/AddProducts";
import EditProducts from "../products/EditProduct";
import OrdersPage from "../home/orders/OrdersPage";
import Vendors from "../vendors/Vendors";
import AddVendors from "../vendors/AddVendors";
import Category from "../categories/Category";
import Users from "../users/Users";
import ListVendors from "../vendors/ListVendors";
import VendorComments from "../vendors/VendorComments";
import AllOrders from '../orders/OrdersPage';
import CancelRequests from "../orders/CancelRequests";

const Pages = () => {
  const location = useLocation(); 

  const isLoginPage = location.pathname === "/";
  const isRegisterPage = location.pathname === '/register';
  const isAddProducts = location.pathname === '/add-Product';
  const isEditProducts = location.pathname === '/edit-Product';
  const isOrdersPage = location.pathname === '/orders';
  const isAddVendorPage = location.pathname === '/add-Vendor';

  return (
    <>
      {!isLoginPage && !isRegisterPage && !isAddProducts && !isEditProducts && !isAddVendorPage && <Header />}
      
      
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/add-Product" element={<AddProducts />} />
        <Route path="/edit-Product" element={<EditProducts />} />
        <Route path="/add-Vendor" element={<AddVendors />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/users" element={<Users />} />
        <Route path="/all-Orders" element={<AllOrders />} />
        <Route path="/list-Vendors" element={<ListVendors />} />
        <Route path="/cancel-requests" element={<CancelRequests />} />
        <Route path="/vendor-comments/:vendorId" element={<VendorComments />} />
      </Routes>
      
      {!isLoginPage && !isRegisterPage && !isAddProducts && !isEditProducts && !isOrdersPage && !isAddVendorPage && <Footer />}
    </>
  );
};

export default Pages;
