import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import Settings from './pages/Settings';
import Transactions from './pages/Transactions';
import Signup from './signupform';

export default function App() {
  return (
    <div style={{ backgroundColor: '#171b2c', minHeight: '100vh' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Signup />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/Chatbot" exact element={<Chatbot />} />
          <Route path="/Transactions" exact element={<Transactions />} />
          <Route path="/Settings" exact element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
