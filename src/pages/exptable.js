import React, { useState } from 'react';
import './bot.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const Exptable = () => {
  const [showTable1, setShowTable1] = useState(false);
  const [showTable2, setShowTable2] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const initialRows1 = [
    {
      category: "food",
      location: "mall",
      city: "coimbatore",
      amount: 7000,
      date: "23-03-2024",
      day: "Saturday",
      purpose: "fun",
      accepted: false,
      eid: "rohit@c1.com"
    },
    // Add more initial rows as needed
    {
      category: "travel",
      location: "stn",
      city: "coimbatore",
      amount: 4000,
      date: "24-03-2024",
      day: "Sunday",
      purpose: "travel ticket",
      accepted: false,
      eid: "john@d2.com"
    },
    // Add more rows here...
  ];

  const initialRows2 = [
    {
      category: "travel",
      location: "stn",
      city: "coimbatore",
      amount: 5000,
      date: "22-03-2024",
      day: "Friday",
      purpose: "travel ticket",
      accepted: true,
      eid: "rohit@c1.com"
    },
    // Add more initial rows as needed
    {
      category: "food",
      location: "restaurant",
      city: "chennai",
      amount: 6000,
      date: "25-03-2024",
      day: "Monday",
      purpose: "dinner",
      accepted: true,
      eid: "jane@e3.com"
    },
    // Add more rows here...
  ];

  const handleShowTable1Click = () => {
    setShowTable1(true);
    setShowTable2(false); 
  };

  const handleShowTable2Click = () => {
    setShowTable2(true);
    setShowTable1(false); 
  };

  const handleStatusButtonClick = (rowData, action) => {
    // Send the data to the backend
    console.log(`Sending data to the backend: ${action}`, rowData);
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
    <div className="chatbot-container">
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <Button style={{ fontSize: "12px", padding: "10px", marginRight: "10px", background: "#EE4266", color: "white" }} onClick={handleShowTable1Click}>
          Show Pending Requests
        </Button>
        <Button style={{ fontSize: "12px", padding: "10px", background: "#FFD23F" }} onClick={handleShowTable2Click}>
          Show Accepted Requests
        </Button>
      </div>
      {showTable1 && (
        <div style={{ display: "flex", justifyContent: "center", margin: "30px" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead style={{ backgroundColor: "#365486", opacity: "0.87", color: "white" }}>
                <TableRow>
                  <TableCell style={{ fontSize: "12px", padding: "8px", color: "white" }}>Employee ID</TableCell>
                  <TableCell style={{ fontSize: "12px", padding: "8px", color: "white" }}>Status</TableCell>
                  <TableCell style={{ fontSize: "12px", padding: "8px", color: "white" }}>Date</TableCell>
                  <TableCell style={{ fontSize: "12px", padding: "8px", color: "white" }}>Category</TableCell>
                  <TableCell style={{ fontSize: "12px", padding: "8px", color: "white" }}>Action</TableCell>
                  <TableCell style={{ fontSize: "12px", padding: "8px", color: "white" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {initialRows1.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ fontSize: "12px", padding: "8px" }}>{row.eid}</TableCell>
                    <TableCell style={{ fontSize: "12px", padding: "8px" }}>{row.accepted ? 'Accepted' : 'Pending'}</TableCell>
                    <TableCell style={{ fontSize: "12px", padding: "8px" }}>{row.date}</TableCell>
                    <TableCell style={{ fontSize: "12px", padding: "8px" }}>{row.category}</TableCell>
                    <TableCell style={{ fontSize: "12px", padding: "8px" }}>
                      <Button style={{ fontSize: "10px", padding: "6px", color: "#35374B", backgroundColor: "#54E346" }} onClick={() => handleStatusButtonClick(row, 'someAction')}>
                        Approve
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button style={{ fontSize: "10px", padding: "6px", color: "#40A2E3" }} onClick={() => handlePopUpClick(row)}>
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
              <TableHead style={{ backgroundColor: "#365486", opacity: "0.87", color: "white" }}>
                <TableRow>
                  <TableCell style={{ fontSize: "12px", padding: "8px", color: "white" }}>Employee ID</TableCell>
                  <TableCell style={{ fontSize: "12px", padding: "8px", color: "white" }}>Status</TableCell>
                  <TableCell style={{ fontSize: "12px", padding: "8px", color: "white" }}>Date</TableCell>
                  <TableCell style={{ fontSize: "12px", padding: "8px", color: "white" }}>Category</TableCell>
                  <TableCell style={{ fontSize: "12px", padding: "8px", color: "white" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {initialRows2.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ fontSize: "12px", padding: "8px" }}>{row.eid}</TableCell>
                    <TableCell style={{ fontSize: "12px", padding: "8px" }}>{row.accepted ? 'Accepted' : 'Pending'}</TableCell>
                    <TableCell style={{ fontSize: "12px", padding: "8px" }}>{row.date}</TableCell>
                    <TableCell style={{ fontSize: "12px", padding: "8px" }}>{row.category}</TableCell>
                    <TableCell>
                      <Button style={{ fontSize: "10px", padding: "6px", color: "#40A2E3" }} onClick={() => handlePopUpClick(row)}>
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
              <div style={{ fontWeight: "bold" }}>Email ID:</div>
              <div style={{ paddingLeft: "10px" }}>{selectedRow.eid}</div>

              <div style={{ fontWeight: "bold" }}>Category:</div>
              <div style={{ paddingLeft: "10px" }}>{selectedRow.category}</div>

              <div style={{ fontWeight: "bold" }}>Location:</div>
              <div style={{ paddingLeft: "10px" }}>{selectedRow.location}</div>

              <div style={{ fontWeight: "bold" }}>City:</div>
              <div style={{ paddingLeft: "10px" }}>{selectedRow.city}</div>

              <div style={{ fontWeight: "bold" }}>Amount:</div>
              <div style={{ paddingLeft: "10px" }}>{selectedRow.amount}</div>

              <div style={{ fontWeight: "bold" }}>Date:</div>
              <div style={{ paddingLeft: "10px" }}>{selectedRow.date}</div>

              <div style={{ fontWeight: "bold" }}>Day:</div>
              <div style={{ paddingLeft: "10px" }}>{selectedRow.day}</div>

              <div style={{ fontWeight: "bold" }}>Purpose:</div>
              <div style={{ paddingLeft: "10px" }}>{selectedRow.purpose}</div>

              <div style={{ fontWeight: "bold" }}>Status:</div>
              <div style={{ paddingLeft: "10px" }}>{selectedRow.accepted ? 'Approved' : 'Pending'}</div>
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
  );
};

export default Exptable;
