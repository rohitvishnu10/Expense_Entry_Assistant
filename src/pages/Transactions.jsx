import React from "react";
import Sidenav from "../components/Sidenav";
import Navbar from "../components/Navbar";
import Box from '@mui/material/Box';
import Exptable from "./Exptable"; // Importing Exptable component

function Transaction() {
  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" ,backgroundColor: "#343741"}}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div style={{ height: "92vh", width: "100%", backgroundColor: "#343741", padding: "20px", boxSizing: "border-box" }}>
            {/* Removed the Buttons */}
            {/* Render the Exptable component */}
            <Exptable />
          </div>
        </Box>
      </Box>
    </>
  );
}

export default Transaction;
