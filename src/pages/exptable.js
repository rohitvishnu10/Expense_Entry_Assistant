import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, Button } from "@mui/material";

function Exptable() {
  const [selectedFilter, setSelectedFilter] = useState('pending');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:7000/pending_requests/${localStorage.getItem("username")}`);
        const data = await response.json();
        setPendingRequests(data);
      } catch (error) {
        console.error("Error fetching pending requests:", error);
      }
    };

    const fetchAcceptedRequests = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:7000/accepted_requests/${localStorage.getItem("username")}`);
        const data = await response.json();
        setAcceptedRequests(data);
      } catch (error) {
        console.error("Error fetching accepted requests:", error);
      }
    };

    const fetchRejectedRequests = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:7000/rejected_requests/${localStorage.getItem("username")}`);
        const data = await response.json();
        setRejectedRequests(data);
      } catch (error) {
        console.error("Error fetching rejected requests:", error);
      }
    };

    // Fetch data on component mount
    fetchPendingRequests();
    fetchAcceptedRequests();
    fetchRejectedRequests();
  }, []);

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
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
      <Select
        value={selectedFilter}
        onChange={handleFilterChange}
        sx={{
          "& .MuiSelect-icon": {
            color: "white", // Set the arrowhead color to white
          },
          "& .MuiSelect-select": {
            borderColor: "white", // Set the border color to white
            color: "white", // Set the text color to white
            "&:focus": {
              borderColor: "white", // Set the border color on focus to white
            },
          },
        }}
      >
        <MenuItem value="pending" style={{ color: "black" }}>Pending Requests</MenuItem>
        <MenuItem value="accepted" style={{ color: "black" }}>Accepted Requests</MenuItem>
        <MenuItem value="rejected" style={{ color: "black" }}>Rejected Requests</MenuItem>
      </Select>

      {selectedFilter === 'pending' && (
        <div style={{ display: "flex", justifyContent: "center", margin: "30px" }}>
          <TableContainer component={Paper} style={{ maxHeight: "100vh", width: "90%" }}>
            <Table>
              <TableHead style={{ backgroundColor: "#365486", opacity: "0.87", color: "white" }}>
                <TableRow >
                  <TableCell style={{ fontSize: "15px", color: "white" }}>Employee ID</TableCell>
                  <TableCell style={{ fontSize: "15px", color: "white" }}>Status</TableCell>
                  <TableCell style={{ fontSize: "15px", color: "white" }}>Date</TableCell>
                  <TableCell style={{ fontSize: "15px", color: "white" }}>Category</TableCell>
                  <TableCell style={{ fontSize: "15px", color: "white" }}>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingRequests.map((row, index) => (
                  <TableRow key={index} style={{ backgroundColor: "#1e1e1e"}}>
                    <TableCell style={{ fontSize: "15px",color: "white" }}>{row["Employee ID"]}</TableCell>
                    <TableCell style={{ fontSize: "15px",color: "#6D67E4" }}>{row.Status}</TableCell>
                    <TableCell style={{ fontSize: "15px",color: "white" }}>{row.Date}</TableCell>
                    <TableCell style={{ fontSize: "15px",color: "white" }}>{row.Category}</TableCell>
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

      {selectedFilter === 'accepted' && (
        <div style={{ display: "flex", justifyContent: "center", margin: "30px" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead style={{ backgroundColor: "#365486", opacity: "0.87", color: "white" }}>
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
                  <TableRow key={index} style={{ backgroundColor: "#1e1e1e"}}>
                    <TableCell style={{ fontSize: "15px" ,color: "white"}}>{row["Employee ID"]}</TableCell>
                    <TableCell style={{ fontSize: "15px",color: "#b5c938" }}>{row.Status}</TableCell>
                    <TableCell style={{ fontSize: "15px",color: "white" }}>{row.Date}</TableCell>
                    <TableCell style={{ fontSize: "15px",color: "white"}}>{row.Category}</TableCell>
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

      {selectedFilter === 'rejected' && (
        <div style={{ display: "flex", justifyContent: "center", margin: "30px" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead style={{ backgroundColor: "#365486", opacity: "0.87", color: "white" }}>
                <TableRow>
                  <TableCell style={{ fontSize: "15px", color: "white" }}>Employee ID</TableCell>
                  <TableCell style={{ fontSize: "15px", color: "white" }}>Status</TableCell>
                  <TableCell style={{ fontSize: "15px", color: "white" }}>Date</TableCell>
                  <TableCell style={{ fontSize: "15px", color: "white" }}>Category</TableCell>
                  <TableCell style={{ fontSize: "15px", color: "white" }}>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rejectedRequests.map((row, index) => (
                  <TableRow key={index} style={{ backgroundColor: "#1e1e1e"}}>
                    <TableCell style={{ fontSize: "15px", color: "white" }}>{row["Employee ID"]}</TableCell>
                    <TableCell style={{ fontSize: "15px", color: "red" }}>Rejected</TableCell>
                    <TableCell style={{ fontSize: "15px", color: "white" }}>{row.Date}</TableCell>
                    <TableCell style={{ fontSize: "15px", color: "white" }}>{row.Category}</TableCell>
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
          <Button style={{ color: "black", paddingLeft: "10px" }} onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Exptable;
