import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/admindashboard';
import Bar from './scenes/bar';
import Form from './scenes/form/index';
import Line from './scenes/line';
import Pie from './scenes/pie';
import Request from './scenes/requests';
import Form2 from './scenes/form/form2';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import Chatbot from './pages/bot';



import "./App.css";
import Footer from "./components/Userpage/footer/Footer";
import Home from "./components/Userpage/home/Home";
// import Bot from "./pages/bot";
import Exptable from "./pages/Exptable";
import UserSidebar from "./components/Userpage/header/Sidebar"; // Import the Sidebar component

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const shouldRenderAppDiv = window.location.pathname.includes('/app');
  const [dark, setMode] = useState(getMode());

  function getMode() {
    return JSON.parse(localStorage.getItem("mode"));
  }

  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(dark));
  }, [dark]);

  return (
    <div>
      {shouldRenderAppDiv ? (<ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/requests" element={<Request />} />
                <Route path="/form" element={<Form />} />
                <Route path="/form2" element={<Form2 />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>)
      :
      (<div className={dark ? "app" : "app"}>
        <UserSidebar dark={dark} setMode={setMode} />
        <div className="main-content">
          {getContentComponent(window.location.pathname)}
        </div>
        <Footer />
      </div>)}
    </div>
    
  );
}
function getContentComponent(pathname) {
  switch (pathname) {
    case "/dashboard":
      return <Home />;
    case "/bot":
      return <Chatbot />;
    case "/tabledata":
      return <Exptable />;
    default:
      return <div>Page not found</div>;
  }
}

export default App;