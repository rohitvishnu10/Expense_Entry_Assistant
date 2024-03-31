// import React from 'react'
// import Sidenav from "../components/Sidenav";
// import Navbar from "../components/Navbar";
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';


// export default function Settings() {
//   return (
//     <>
//     <Navbar />
//     <Box height={30} />
//     <Box sx={{ display: "flex" }}>
//     <Sidenav />
//     <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//     <h1>Settings</h1>
//       </Box>
//     </Box>
//     </>
//   );
// }

import React, { useState, useEffect } from 'react';
import Sidenav from "../components/Sidenav";
import Navbar from "../components/Navbar";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Settings() {
  // Function to handle logout
  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
  };

  // State for theme
  const [themeMode, setThemeMode] = useState('light');

  // Create MUI theme
  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  // Function to toggle theme
  const toggleTheme = () => {
    setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <SettingsContent handleLogout={handleLogout} toggleTheme={toggleTheme} themeMode={themeMode} />
      </Box>
    </ThemeProvider>
  );
}

const SettingsContent = ({ handleLogout, toggleTheme, themeMode }) => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>Settings</Typography>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Theme</Typography>
        <Switch checked={themeMode === 'dark'} onChange={toggleTheme} />
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Feedback</Typography>
        <Button variant="outlined" component={Link} to="/home#feedback">Give Feedback</Button>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Help</Typography>
        <Button variant="outlined" component={Link} to="/home#user-guide">User Guide</Button>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
      </Box>
    </Box>
  );
};
