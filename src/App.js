// import React, { useState } from 'react';
// import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import Topbar from './scenes/global/Topbar';
// import Sidebar from './scenes/global/Sidebar';
// import Dashboard from './scenes/admindashboard';
// import Bar from './scenes/bar';
// import Form from './scenes/form/index';
// import Line from './scenes/line';
// import Pie from './scenes/pie';
// import Request from './scenes/requests';
// import Form2 from './scenes/form/form2';
// import Signup from './signupform';
// import Home from './pages/Home';
// import Chatbot from './pages/Chatbot';
// import Settings from './pages/Settings';
// import Transaction from './pages/Transactions';
// import HomeApp from './pages/Homepage';
// import { CssBaseline, ThemeProvider } from '@mui/material';
// import { ColorModeContext, useMode } from './theme';

// function App() {
//     const [theme, colorMode] = useMode();
//     const [isSidebar, setIsSidebar] = useState(true);

//     return (
//         <ColorModeContext.Provider value={colorMode}>
//             <ThemeProvider theme={theme}>
//                 <CssBaseline />
//                 <div className="app">
//                     <Routes>
//                         <Route path="/" element={<Signup />} />
//                         <Route path="/login" element={<Home />} />
//                         <Route path="/dashboard" element={<Home />} />
//                         <Route path="/Chatbot" element={<Chatbot />} />
//                         <Route path="/Transactions" element={<Transaction />} />
//                         <Route path="/Settings" element={<Settings />} />
//                         <Route path="/app/*" element={<Sidebar isSidebar={isSidebar} />}>
//                           <Route index element={<Topbar setIsSidebar={true} />} />
//                           <Route element={<main className="content" />}>
//                               <Route index element={<Dashboard />} />
//                               <Route path="requests" element={<Request />} />
//                               <Route path="form" element={<Form />} />
//                               <Route path="form2" element={<Form2 />} />
//                               <Route path="bar" element={<Bar />} />
//                               <Route path="pie" element={<Pie />} />
//                               <Route path="line" element={<Line />} />
//                           </Route>
//                         </Route>
//                     </Routes>
//                 </div>
//             </ThemeProvider>
//         </ColorModeContext.Provider>
//     );
// }

// export default App;

import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import Settings from './pages/Settings';
import Transactions from './pages/Transactions';
import Signup from './signupform';
import HomeApp from './pages/Homepage';
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

export default function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
      <ColorModeContext.Provider value={colorMode}>
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
      </ColorModeContext.Provider>
    // </BrowserRouter>
  );
}
