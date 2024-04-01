import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Sidenav from "../components/Sidenav";
import Navbar from "../components/Navbar";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Transaction() {
  const [showTable1, setShowTable1] = useState(false);
  const [showTable2, setShowTable2] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  useEffect(() => {
    // This is where you can fetch the actual data and update the state
    // For now, we'll keep the initial state as empty arrays
  }, []);

  const handleShowTable1Click = () => {
    setShowTable1(true);
    setShowTable2(false);
  };

  const handleShowTable2Click = () => {
    setShowTable2(true);
    setShowTable1(false);
  };

  const handleStatusButtonClick = async (row) => {
    // ... (handleStatusButtonClick logic remains unchanged)
  };

  const handlePopUpClick = (row) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRow(null);
  };

  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" ,backgroundColor: "#343741"}}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div style={{ height: "92vh", width: "100%", backgroundColor: "#343741", padding: "20px", boxSizing: "border-box" }}>
            <Button style={{ textAlign: "center", background: "#EE4266", color: "white", margin: "20px", padding: "20px" }} onClick={handleShowTable1Click}>
              Show Pending Requests
            </Button>
            <Button style={{ textAlign: "center", background: "#FFD23F", padding: "20px" }} onClick={handleShowTable2Click}>
              Show Accepted Requests
            </Button>
            {showTable1 && (
              <div style={{ display: "flex", justifyContent: "center", margin: "30px" }}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead style={{ backgroundColor: "#365486", opacity: "0.87" }}>
                      <TableRow>
                        <TableCell style={{ fontSize: "15px", color: "white" }}>Employee ID</TableCell>
                        <TableCell style={{ fontSize: "15px", color: "white" }}>Status</TableCell>
                        <TableCell style={{ fontSize: "15px", color: "white" }}>Date</TableCell>
                        <TableCell style={{ fontSize: "15px", color: "white" }}>Category</TableCell>
                        <TableCell style={{ fontSize: "15px", color: "white" }}>Action</TableCell>
                        <TableCell style={{ fontSize: "15px", color: "white" }}>Details</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pendingRequests.map((row, index) => (
                        <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white" }}>
                          <TableCell style={{ fontSize: "15px" }}>{row["Employee ID"]}</TableCell>
                          <TableCell style={{ fontSize: "15px" }}>{row.Status}</TableCell>
                          <TableCell style={{ fontSize: "15px" }}>{row.Date}</TableCell>
                          <TableCell style={{ fontSize: "15px" }}>{row.Category}</TableCell>
                          <TableCell style={{ fontSize: "15px" }}>
                            <Button style={{ fontSize: "12px", color: "white", backgroundColor: "#54E346" }} onClick={() => handleStatusButtonClick(row)}>
                              Approve
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button style={{ fontSize: "12px", color: "#40A2E3" }} onClick={() => handlePopUpClick(row)}>
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}

            {showTable2 && (
              <div style={{ display: "flex", justifyContent: "center", margin: "30px" }}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead style={{ backgroundColor: "#365486", opacity: "0.87" }}>
                      <TableRow>
                        <TableCell style={{ fontSize: "15px", color: "white" }}>Employee ID</TableCell>
                        <TableCell style={{ fontSize: "15px", color: "white" }}>Status</TableCell>
                        <TableCell style={{ fontSize: "15px", color: "white" }}>Date</TableCell>
                        <TableCell style={{ fontSize: "15px", color: "white" }}>Category</TableCell>
                        <TableCell style={{ fontSize: "15px", color: "white" }}>Details</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {acceptedRequests.map((row, index) => (
                        <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white" }}>
                          <TableCell style={{ fontSize: "15px" }}>{row["Employee ID"]}</TableCell>
                          <TableCell style={{ fontSize: "15px" }}>{row.Status}</TableCell>
                          <TableCell style={{ fontSize: "15px" }}>{row.Date}</TableCell>
                          <TableCell style={{ fontSize: "15px" }}>{row.Category}</TableCell>
                          <TableCell>
                            <Button style={{ fontSize: "12px", color: "#40A2E3" }} onClick={() => handlePopUpClick(row)}>
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}

            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              fullWidth
              maxWidth="md"
            >
              <DialogTitle style={{ fontSize: "2rem" }}>Details</DialogTitle>
              <DialogContent style={{ fontSize: "1.2rem" }}>
                {selectedRow && (
                  <div style={{ display: "grid", gridTemplateColumns: "max-content auto", gap: "30px" }}>
                    {/* ... (Details content remains unchanged) */}
                  </div>
                )}
              </DialogContent>
              <DialogActions>
                <Button style={{ color: "white", paddingLeft: "10px" }} onClick={handleCloseDialog} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default Transaction;
