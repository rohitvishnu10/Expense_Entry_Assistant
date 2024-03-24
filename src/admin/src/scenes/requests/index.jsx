import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import "../dashboard/Table.css";
import '../dashboard/App.css';

function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}

const rows = [
  createData("Employee 1", 18908424, "2 March 2024", "Approved"),
  createData("Employee 2", 18908424, "2 March 2024", "Pending"),
  createData("Employee 3", 18908424, "2 March 2024", "Approved"),
  createData("Employee 4", 18908421, "2 March 2024", "Credited"),
  createData("Employee 5", 18908421, "2 March 2024", "Credited"),
  createData("Employee 1", 18908424, "2 March 2024", "Approved"),
  createData("Employee 2", 18908424, "2 March 2024", "Pending"),
  createData("Employee 3", 18908424, "2 March 2024", "Approved"),
  createData("Employee 4", 18908421, "2 March 2024", "Credited"),
  createData("Employee 5", 18908421, "2 March 2024", "Credited"),
];

const handleStatusButtonClick = (rowData, action) => {
  // Send the data to the backend
  console.log(`Sending data to the backend: ${action}`, rowData);
};

function Request() {
  return (
    <div className="Table">
      <h2><p className="requests">Requests</p></h2>
      <div className="data-container">
        {rows.map((row, index) => (
          <Paper key={index} elevation={3} className="data-item">
            <div className="data-row">
              <div className="emp">
                <p>{row.name}</p>
              </div>
              <div className="emp">
                <p>{row.trackingId}</p>
              </div>
              <div className="emp">
                <p>{row.date}</p>
              </div>
              <div className="emp">
                <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleStatusButtonClick(row, 'Approved')}>
                  Approve
                </Button>
                <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleStatusButtonClick(row, 'Declined')}>
                  Decline
                </Button>
              </div>
            </div>
          </Paper>
        ))}
      </div>
    </div>
  );
}

export default Request;
