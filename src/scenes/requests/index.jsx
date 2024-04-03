import React, { useState, useEffect } from "react";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem } from "@mui/material";
import Header from "../../components/Adminpage/Header";

function Request() {
  // const [showTable1, setShowTable1] = useState(false);
  // const [showTable2, setShowTable2] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('pending');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  useEffect(() => {
    // Fetch pending requests
    const fetchPendingRequests = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:9000/pending_requests/${localStorage.getItem("username")}`);
        const data = await response.json();
        setPendingRequests(data);
      } catch (error) {
        console.error("Error fetching pending requests:", error);
      }
    };

    // Fetch accepted requests
    const fetchAcceptedRequests = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:9000/accepted_requests/${localStorage.getItem("username")}`);
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

  // const handleShowTable1Click = () => {
  //   setShowTable1(true);
  //   setShowTable2(false);
  // };

  // const handleShowTable2Click = () => {
  //   setShowTable2(true);
  //   setShowTable1(false);
  // };

  const handleStatusButtonClick = async (row) => {
    // Show a confirmation alert before approving the request
    const confirmApproval = window.confirm("Are you sure you want to approve this request?");
    if (!confirmApproval) {
      return; // If user cancels, do nothing
    }
  
    try {
      // Send PUT request to approve the request
      const response = await fetch(`http://127.0.0.1:9000/approve_request/${row._id}`, {
        method: "PUT",
      });
      if (response.ok) {
        // If request is successful, update the 'accepted' field in the local state
        const updatedPendingRequests = pendingRequests.map((req) =>
          req._id === row._id ? { ...req, accepted: true } : req
        );
        setPendingRequests(updatedPendingRequests);
        // Show success message
        window.alert("Request approved successfully");
      } else {
        console.error("Failed to approve request");
        window.alert("Failed to approve request. Please try again later.");
      }
    } catch (error) {
      console.error("Error approving request:", error);
      window.alert("An error occurred while approving the request. Please try again later.");
    }
  };

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
        style={{ margin: "20px" }}
      >
        <MenuItem value="pending">Pending Requests</MenuItem>
        <MenuItem value="accepted">Accepted Requests</MenuItem>
        <MenuItem value="Rejected">Rejected Requests</MenuItem>
      </Select>

      {selectedFilter === 'pending' && (
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
                    <TableCell style={{ fontSize: "15px" }}>
                      <Button style={{ fontSize: "15px", color: "#35374B", backgroundColor: "#94d5be" }} onClick={() => handleStatusButtonClick(row)}>
                        Approve
                      </Button>
                    </TableCell>

                    <TableCell>
                      <Button style={{ marginLeft: "20px",fontSize: "15px", color: "#f5f5f5", backgroundColor: "#dd3f32" }} onClick={() => handleStatusButtonClick(row)}>
                        Reject
                      </Button>
                    </TableCell>

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

      {/* {showTable2 && ( */}
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

      {selectedFilter === 'Rejected' && (
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
                    <TableCell style={{ fontSize: "15px" }}>Rejected</TableCell>
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

export default Request;
