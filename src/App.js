import React from 'react';
// import Sidenav from "./components/Sidenav_user";
import {Routes,Route,BrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
import Settings from "./pages/Settings";
import Transactions from './pages/Transactions';
import Signup from "./signupform";
import HomeApp from "./pages/Homepage";

export default function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
   <Route path="/login" exact element={<Signup />} />
   <Route path="/dashboard" exact element={<Home />}></Route>
   <Route path="/Chatbot" exact element={<Chatbot/>}></Route>
   <Route path='/Transactions' exact element={<Transactions/>}></Route>
   <Route path="/Settings" exact element={<Settings/>}></Route>
   <Route path="/home1" exact element={<HomeApp />}></Route>
   
   </Routes>
    </BrowserRouter>
    </>
  
  );
}


