import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

function Exptable() {
  const [showTable1, setShowTable1] = useState(false);
  const [showTable2, setShowTable2] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  useEffect(() => {
    // Fetch pending requests
    const fetchPendingRequests = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:7000/pending_requests/${localStorage.getItem("username")}`);
        const data = await response.json();
        setPendingRequests(data);
      } catch (error) {
        console.error("Error fetching pending requests:", error);
      }
    };

    // Fetch accepted requests
    const fetchAcceptedRequests = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:7000/accepted_requests/${localStorage.getItem("username")}`);
        const data = await response.json();
        setAcceptedRequests(data);
      } catch (error) {
        console.error("Error fetching accepted requests:", error);
      }
    };

    // Fetch data on component mount
    fetchPendingRequests();
    fetchAcceptedRequests();
  }, []);

  const handleShowTable1Click = () => {
    setShowTable1(true);
    setShowTable2(false);
  };

  const handleShowTable2Click = () => {
    setShowTable2(true);
    setShowTable1(false);
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
    <div style={{ margin: "20px" }}>
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
              <TableHead style={{ backgroundColor: "#365486", opacity: "0.87", color: "white" }}>
                <TableRow>
                  <TableCell style={{ fontSize: "15px", color: "white" }}>Employee ID</TableCell>
                  <TableCell style={{ fontSize: "15px", color: "white" }}>Status</TableCell>
                  <TableCell style={{ fontSize: "15px", color: "white" }}>Date</TableCell>
                  <TableCell style={{ fontSize: "15px", color: "white" }}>Category</TableCell>
                  <TableCell style={{ fontSize: "15px", color: "white" }}>Action</TableCell>
                  <TableCell style={{ fontSize: "15px", color: "white" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingRequests.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ fontSize: "15px" }}>{row["Employee ID"]}</TableCell>
                    <TableCell style={{ fontSize: "15px" }}>{row.Status}</TableCell>
                    <TableCell style={{ fontSize: "15px" }}>{row.Date}</TableCell>
                    <TableCell style={{ fontSize: "15px" }}>{row.Category}</TableCell>
                    <TableCell style={{ fontSize: "15px" }}></TableCell>
                    <TableCell>
                      <Button style={{ fontSize: "15px", color: "#40A2E3" }} onClick={() => handlePopUpClick(row)}>
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
                  <TableCell style={{ fontSize: "15px", color: "white" }}>Employee ID</TableCell>
                  <TableCell style={{ fontSize: "15px", color: "white" }}>Status</TableCell>
                  <TableCell style={{ fontSize: "15px", color: "white" }}>Date</TableCell>
                  <TableCell style={{ fontSize: "15px", color: "white" }}>Category</TableCell>
                  <TableCell style={{ fontSize: "15px", color: "white" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {acceptedRequests.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ fontSize: "15px" }}>{row["Employee ID"]}</TableCell>
                    <TableCell style={{ fontSize: "15px" }}>{row.Status}</TableCell>
                    <TableCell style={{ fontSize: "15px" }}>{row.Date}</TableCell>
                    <TableCell style={{ fontSize: "15px" }}>{row.Category}</TableCell>
                    <TableCell>
                      <Button style={{ fontSize: "15px", color: "#40A2E3" }} onClick={() => handlePopUpClick(row)}>
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
              <div style={{ paddingLeft: "10px" }}>{selectedRow["Employee ID"]}</div>

              <div style={{ fontWeight: "bold" }}>Category:</div>
              <div style={{ paddingLeft: "10px" }}>{selectedRow.Category}</div>

              <div style={{ fontWeight: "bold" }}>Location:</div>
              <div style={{ paddingLeft: "10px" }}>{selectedRow.location}</div>

              <div style={{ fontWeight: "bold" }}>City:</div>
              <div style={{ paddingLeft: "10px" }}>{selectedRow.city}</div>

              <div style={{ fontWeight: "bold" }}>Amount:</div>
              <div style={{ paddingLeft: "10px" }}>{selectedRow.amount}</div>

              <div style={{ fontWeight: "bold" }}>Date:</div>
              <div style={{ paddingLeft: "10px" }}>{selectedRow.Date}</div>

              <div style={{ fontWeight: "bold" }}>Day:</div>
              <div style={{ paddingLeft: "10px" }}>{selectedRow.day}</div>

              <div style={{ fontWeight: "bold" }}>Purpose:</div>
              <div style={{ paddingLeft: "10px" }}>{selectedRow.purpose}</div>

              <div style={{ fontWeight: "bold" }}>Status:</div>
              <div style={{ paddingLeft: "10px" }}>{selectedRow.Status}</div>
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
}

export default Exptable;
