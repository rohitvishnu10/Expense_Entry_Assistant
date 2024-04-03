import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './signupform';
import AdminSignup from "./Login/Adminlogin/signupform";
import HomeApp from "./pages/Homepage";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<Signup />} /> */}
      <Route path="/app/*" element={<App />}>
        {/* Nested routes can be added here if needed */}
      </Route>
    </Routes>
    <Routes>
      <Route path="/login" exact element={<Signup />} />
      <Route path="/" exact element={<HomeApp />}></Route>
      <Route path="/adminlogin" exact element={<AdminSignup />}></Route>

      <Route path="/bot" element={<App />} />
      <Route path="/dashboard" element={<App />} />
      <Route path='/tabledata' element={<App/>} />
   
    </Routes>
  </BrowserRouter>
);
