import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Signup from './signupform';
import Bot from "./pages/bot"
import Optional from "./pages/Optional"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/home" element={<App />} />
      <Route path="/" element={<Signup />} />
      <Route path="/bot" element={<App />} />
    </Routes>
  </BrowserRouter>
);
