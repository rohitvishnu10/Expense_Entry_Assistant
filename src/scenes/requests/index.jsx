import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions , TextField } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faEye } from '@fortawesome/free-solid-svg-icons';
import "./requests.css";
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Grid } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

function Request() {
  const [selectedFilter, setSelectedFilter] = useState('pending');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]); 
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState('');  // New state for confirmation dialog
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchValue, setSearchValue] = useState(''); 
  const [categoryFilter, setCategoryFilter] = useState(''); // New state for category filter
  const [dateFilter, setDateFilter] = useState('');

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
  const handleStatusButtonClick = (row, action) => {
    setSelectedRow(row);
    setOpenDialog(false); // Close the details dialog, if open
    setActionToConfirm(action); // Set the action to confirm
    setConfirmationOpen(true); // Open the confirmation dialog
  };
  

  const handleConfirmAction = async () => {
    setConfirmationOpen(false); // Close the confirmation dialog
    try {
      const response = await fetch(`http://127.0.0.1:9000/${actionToConfirm}_request/${selectedRow._id}`, {
        method: "PUT",
      });
      if (response.ok) {
        fetchData(selectedFilter); // Fetch updated data after action
        if (actionToConfirm === 'approve') {
          setSuccessMessage('Approved successfully!');
          setSuccessDialogOpen(true); // Open the success dialog
        } else if (actionToConfirm === 'reject') {
          setSuccessMessage('Rejected successfully!');
          setSuccessDialogOpen(true); // Open the success dialog
        }
      } else {
        console.error(`Failed to ${actionToConfirm} request`);
        window.alert(`Failed to ${actionToConfirm} request. Please try again later.`);
      }
    } catch (error) {
      console.error(`Error ${actionToConfirm}ing request:`, error);
      window.alert(`An error occurred while ${actionToConfirm}ing the request. Please try again later.`);
    } finally {
      setOpenDialog(false); // Close the details dialog
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
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };
  
  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
  };
  const handleDownloadReport = () => {

    const reportUrl = 'http://example.com/download/report';
    window.open(reportUrl, '_blank'); // Open the report in a new tab for download
  };
  

  return (
    <div style={{ margin: "20px" }}>
      <div className='heading flexSB'>
        <h1><FontAwesomeIcon icon={faEye} className="icon" />    Pending Reimbursements</h1> {/* Updated heading size */}
      </div>
      <div>
      <p className="text4" style={{marginRight:"30px"}}>You have the ability to approve or decline requests.</p>
      </div>
      <Grid container alignItems="center" justifyContent="center"> {/* Use Grid for layout */}
        <Grid item>
          <label htmlFor="filter" style={{ color: "white", marginRight: "15px", marginLeft: "30px", fontSize: "20px" }}>Filter:</label>
          <Select
            value={selectedFilter}
            onChange={handleFilterChange}
            style={{ margin: "20px" }}
          >
            <MenuItem value="pending" onClick={() => fetchData('pending')}>Pending Requests</MenuItem>
            <MenuItem value="accepted" onClick={() => fetchData('accepted')}>Accepted Requests</MenuItem>
            <MenuItem value="rejected" onClick={() => fetchData('rejected')}>Rejected Requests</MenuItem>
          </Select>
        </Grid>
        <Grid item>
          <TextField
            label="Search by Employee ID"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            variant="outlined"
            style={{ width: "300px" }}
          />
        </Grid>
        <Grid item>
        <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
          <TextField
            label="Filter by Category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            variant="outlined"
            style={{ width: "300px" }}
          />
        </div>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleDownloadReport}
            style={{ width: "300px", backgroundColor: "#008DDA", color: "#fff",padding:"20px",fontSize:"15px" }}
            startIcon={<CloudDownloadIcon />}
          >
            Download report
          </Button>
        </Grid>
      </Grid>

      {selectedFilter === 'pending' && (
        <div style={{ display: "flex", justifyContent: "center", margin: "30px" }}>
          <TableContainer component={Paper} style={{ border: "2px solid #40A2E3" }}>
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
                {pendingRequests
                  .filter((row) =>
                  row["Employee ID"].toLowerCase().includes(searchValue.toLowerCase()) &&
                  row.Category.toLowerCase().includes(categoryFilter.toLowerCase()) &&
                  row.Date.toLowerCase().includes(dateFilter.toLowerCase())
                )
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ fontSize: "15px" }}>{row["Employee ID"]}</TableCell>
                    <TableCell style={{ fontSize: "15px",color: "#6D67E4" }}>{row.Status}</TableCell>
                    <TableCell style={{ fontSize: "15px" }}>{row.Date}</TableCell>
                    <TableCell style={{ fontSize: "15px" }}>{row.Category}</TableCell>
                    <TableCell style={{ fontSize: "15px" }}>
                      <Button style={{ fontSize: "15px", color: "#35374B", backgroundColor: "#94d5be" }} onClick={() => handleStatusButtonClick(row, 'approve')}>
                        Approve
                      </Button>
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
                {acceptedRequests
                  .filter((row) =>
                  row["Employee ID"].toLowerCase().includes(searchValue.toLowerCase()) &&
                  row.Category.toLowerCase().includes(categoryFilter.toLowerCase()) &&
                  row.Date.toLowerCase().includes(dateFilter.toLowerCase())
                  )
              .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ fontSize: "15px" }}>{row["Employee ID"]}</TableCell>
                    <TableCell style={{ fontSize: "15px",color: "#b5c938" }}>{row.Status}</TableCell>
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
                {rejectedRequests
                .filter((row) =>
                row["Employee ID"].toLowerCase().includes(searchValue.toLowerCase()) &&
                row.Category.toLowerCase().includes(categoryFilter.toLowerCase()) &&
                row.Date.toLowerCase().includes(dateFilter.toLowerCase())
                )
              .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ fontSize: "15px" }}>{row["Employee ID"]}</TableCell>
                    <TableCell style={{ fontSize: "15px",color: "red" }}>{row.Status}</TableCell>
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
      <Dialog
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
      >
        <DialogTitle style={{ fontSize: "2rem" }}></DialogTitle>
        <DialogContent style={{ fontSize: "1.5rem"}}>
          <p style={{ fontWeight: "bold",fontFamily: "Quicksand",color: "white" }}>Are you sure you want to {actionToConfirm === 'approve' ? 'approve' : 'reject'} this request?</p>
        </DialogContent>
        <DialogActions style={{ fontSize: "2rem"}}>
          <Button style={{  paddingLeft: "10px" ,fontSize: "15px", color: "#35374B", marginRight: "20px",backgroundColor: "#90D26D",marginBottom:"30px"}} onClick={handleConfirmAction} color="primary">
          <FontAwesomeIcon icon={faCheck} style={{ marginRight: "5px" }} /> Yes 
          </Button>
          <Button style={{ color: "white", paddingLeft: "10px",backgroundColor:"#E72929",fontSize: "15px",marginRight: "20px",marginBottom:"30px"}} onClick={() => setConfirmationOpen(false)} color="primary">
          <FontAwesomeIcon icon={faTimes} style={{ marginRight: "5px" }} /> No 
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
      >
        <DialogTitle style={{ fontSize: "2rem" }}>Success</DialogTitle>
        <DialogContent style={{ fontSize: "1.5rem"}}>
          <p style={{ fontWeight: "bold", fontFamily: "Quicksand" }}>{successMessage}</p>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "white", paddingLeft: "10px" }} onClick={() => setSuccessDialogOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Request;
