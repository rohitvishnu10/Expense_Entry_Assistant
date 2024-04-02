import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Bot from "./pages/bot";
import Exptable from "./pages/exptable";
import Sidebar from "./components/header/Sidebar"; // Import the Sidebar component

function App() {
  const [dark, setMode] = useState(getMode());

  function getMode() {
    return JSON.parse(localStorage.getItem("mode"));
  }

  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(dark));
  }, [dark]);

  return (
    <div className={dark ? "app" : "light"}>
      <Sidebar dark={dark} setMode={setMode} />
      <div className="main-content">
        {getContentComponent(window.location.pathname)}
      </div>
      <Footer />
    </div>
  );
}

function getContentComponent(pathname) {
  switch (pathname) {
    case "/home":
      return <Home />;
    case "/bot":
      return <Bot />;
    case "/dashboard":
      return <Exptable />;
    default:
      return <div>Page not found</div>;
  }
}

export default App;
