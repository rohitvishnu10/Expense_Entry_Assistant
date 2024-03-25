import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './signupform';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/app/*" element={<App />}>
        {/* Nested routes can be added here if needed */}
      </Route>
    </Routes>
  </BrowserRouter>
);
