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

const Pages = () => {
  const location = useLocation(); 

  const isLoginPage = location.pathname === "/";
  const isRegisterPage = location.pathname === '/register';

  return (
    <>
      {/* Render Header only if not on Login or Register page */}
      {!isLoginPage && !isRegisterPage && <Header />}
      
      {/* Use Routes instead of Switch */}
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      
      {/* Render Footer only if not on Login or Register page */}
      {!isLoginPage && !isRegisterPage && <Footer />}
    </>
  );
};

export default Pages;
