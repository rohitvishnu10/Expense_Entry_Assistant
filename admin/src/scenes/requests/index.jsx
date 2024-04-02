import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem } from "@mui/material";
import Header from "../../components/Header";

function Request() {
  const [selectedFilter, setSelectedFilter] = useState('pending');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]); 

  useEffect(() => {
    fetchData(selectedFilter); // Fetch data on component mount
  }, [selectedFilter]);

  const fetchData = async (filter) => {
    try {
      const response = await fetch(`http://127.0.0.1:9000/${filter}_requests/${localStorage.getItem("username")}`);
      const data = await response.json();
      switch (filter) {
        case 'pending':
          setPendingRequests(data);
          break;
        case 'accepted':
          setAcceptedRequests(data);
          break;
        case 'rejected':
          setRejectedRequests(data);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Error fetching ${filter} requests:`, error);
    }
  };

  const handleStatusButtonClick = async (row, action) => {
    const confirmAction = window.confirm(`Are you sure you want to ${action} this request?`);
    if (!confirmAction) {
      return;
    }
  
    try {
      const response = await fetch(`http://127.0.0.1:9000/${action}_request/${row._id}`, {
        method: "PUT",
      });
      if (response.ok) {
        fetchData(selectedFilter); // Fetch updated data after action
        if (action === 'approve') {
          window.alert("Request approved successfully");
        } else {
          window.alert("Request rejected successfully");
        }
      } else {
        console.error(`Failed to ${action} request`);
        window.alert(`Failed to ${action} request. Please try again later.`);
      }
    } catch (error) {
      console.error(`Error ${action}ing request:`, error);
      window.alert(`An error occurred while ${action}ing the request. Please try again later.`);
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
      <Header title="Requests" subtitle="Pending and Accepted Requests" />
      <Select
        value={selectedFilter}
        onChange={handleFilterChange}
        style={{ margin: "20px" }}
      >
        <MenuItem value="pending" onClick={() => fetchData('pending')}>Pending Requests</MenuItem>
        <MenuItem value="accepted" onClick={() => fetchData('accepted')}>Accepted Requests</MenuItem>
        <MenuItem value="rejected" onClick={() => fetchData('rejected')}>Rejected Requests</MenuItem>
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
                      <Button style={{ fontSize: "15px", color: "#35374B", backgroundColor: "#94d5be" }} onClick={() => handleStatusButtonClick(row, 'approve')}>
                        Approve
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button style={{ marginLeft: "20px",fontSize: "15px", color: "#f5f5f5", backgroundColor: "#dd3f32" }} onClick={() => handleStatusButtonClick(row, 'reject')}>
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
                  <TableCell style={{ fontSize: "15px", color: "white" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rejectedRequests.map((row, index) => (
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

export default Request;
