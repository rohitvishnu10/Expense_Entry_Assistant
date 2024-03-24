import React, { useEffect, useState } from "react"
import "./App.css"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Bot from "./pages/bot"
import Optional from "./pages/Optional"

function App() {
  
  let component;
switch (window.location.pathname) {
  case "/home":
    component = <Home />;
    break;
  case "/bot":
    component = <Bot />;
    break;
  case "/dashboard":
    component = <Optional />;
    break;
  default:
    // Add a default case to handle unexpected values
    component = <div>Page not found</div>;
    break;
}


  const getMode = () => {
    return JSON.parse(localStorage.getItem("mode"))
  }
  const [dark, setMode] = useState(getMode())
  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(dark))
  }, [dark])
  return (
    <>
      <div className={dark ? "app" : "light"}>
        <Header dark={dark} setMode={setMode} />
        {component}
        <Footer />
      </div>
    </>
  )
}

export default App
