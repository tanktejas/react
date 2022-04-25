import logo from "./logo.svg";
// import "./App.css";
import React, { Component, Suspense } from "react";
import Navbar from "./Component/Navbar/Navbar";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Images from "./Component/images/images";
import Home from "./Component/Home/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Images />} />
          <Route path="/about" element={<Images />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
