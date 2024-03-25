import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './signupform';
import Request from "./scenes/requests";
import Dashboard from './scenes/dashboard';
import Bar from './scenes/bar';
import Form from './scenes/form/index';
import Line from './scenes/line';
import Pie from './scenes/pie';
import Form2 from './scenes/form/form2';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path="/requests" element={<Request />} />
        <Route path="/form" element={<Form />} />
        <Route path="/form2" element={<Form2 />} />
        <Route path="/bar" element={<Bar />} />
        <Route path="/pie" element={<Pie />} />
        <Route path="/line" element={<Line />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </BrowserRouter>
);

