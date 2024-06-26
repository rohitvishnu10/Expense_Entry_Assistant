import { useState, useEffect } from 'react';
import { Box,Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Adminpage/Header";
import LineChart from "../../components/Adminpage/LineChart";
import PieChart from "../../components/Adminpage/PieChart";
import BarChart from "../../components/Adminpage/BarChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faListAlt, faTasks } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [employeesCount, setEmployeesCount] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [maxSpender, setMaxSpender] = useState({});
  const [minSpender, setMinSpender] = useState({});

  useEffect(() => {
    const fetchEmployeesCount = async () => {
      try {
        const employeesResponse = await fetch(`http://127.0.0.1:9000/employees_count/${localStorage.getItem("username")}`);
        if (!employeesResponse.ok) {
          throw new Error('Failed to fetch employees count');
        }
        const employeesData = await employeesResponse.json();
        setEmployeesCount(employeesData.employees_count);
      } catch (error) {
        console.error('Error fetching employees count:', error);
      }
    };

    const fetchPendingRequests = async () => {
      try {
        const pendingRequestsResponse = await fetch(`http://127.0.0.1:9000/total_expenses_count/${localStorage.getItem("username")}`);
        if (!pendingRequestsResponse.ok) {
          throw new Error('Failed to fetch pending requests count');
        }
        const pendingRequestsData = await pendingRequestsResponse.json();
        setPendingRequests(pendingRequestsData.total_expenses_count);
      } catch (error) {
        console.error('Error fetching pending requests count:', error);
      }
    };


    const fetchMaxSpender = async () => {
      try {
        const maxSpenderResponse = await fetch(`http://127.0.0.1:9000/get_max_spender/${localStorage.getItem("username")}`);
        if (!maxSpenderResponse.ok) {
          throw new Error('Failed to fetch maximum spender');
        }
        const maxSpenderData = await maxSpenderResponse.json();
        setMaxSpender(maxSpenderData);
      } catch (error) {
        console.error('Error fetching maximum spender:', error);
      }
    };

    const fetchMinSpender = async () => {
      try {
        const minSpenderResponse = await fetch(`http://127.0.0.1:9000/get_min_spender/${localStorage.getItem("username")}`);
        if (!minSpenderResponse.ok) {
          throw new Error('Failed to fetch minimum spender');
        }
        const minSpenderData = await minSpenderResponse.json();
        setMinSpender(minSpenderData);
      } catch (error) {
        console.error('Error fetching minimum spender:', error);
      }
    };

    fetchMaxSpender();
    fetchMinSpender();

    fetchEmployeesCount();
    fetchPendingRequests();
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Welcome To Your Dashboard" subtitle="Admin Dashboard" />
      </Box>
      
      {/* ROW 1 - Display 4 cards in different colors */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(150px, 1fr))"
        gap="20px"
      >
        {/* <Box className="card" style={{ backgroundColor: "#FB2576", marginTop:"20px",padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
          <div className="card-inner">
            <h3 style={{ margin: 0, fontSize: "1.5rem" }} >EMPLOYEES</h3>
          </div>
          <h1 style={{ fontSize: "1.2rem" }}>{employeesCount}</h1>
        </Box> */}

        <Box className="card" style={{ backgroundColor: "#d8aa50", marginTop:"20px",padding: "15px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FontAwesomeIcon icon={faUser} style={{ fontSize: "24px",marginRight: "10px",marginBottom: "20px", color: "white" }} />
          <Typography variant="h6" style={{ color: "white",height: "60px", fontSize:"24px",fontWeight: "bold" }}>Employees</Typography>
        </div>
          <Typography variant="h4" style={{ fontSize: "1.5rem", color: "white" }}>{employeesCount}</Typography>
        </Box>


        {/* <Box className="card" style={{ backgroundColor: "#E3651D", marginTop:"20px",padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }} >
          <div className="card-inner">
            <h3 style={{ margin: 0, fontSize: "1.5rem" }}>CATEGORIES</h3>
          </div>
          <h1>5</h1>
        </Box> */}

        <Box className="card" style={{ backgroundColor: "#dec2a4", marginTop:"20px",padding: "15px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }} >

          <div style={{ display: "flex", alignItems: "center" }}>
          <FontAwesomeIcon icon={faListAlt} style={{ fontSize: "24px",marginRight: "10px",marginBottom: "20px", color: "white" }} />
          <Typography variant="h6" style={{ color: "white",height: "60px", fontSize:"24px",fontWeight: "bold" }}>Categories</Typography>
          </div>
          <Typography variant="h4" style={{ fontSize: "1.5rem", color: "white" }}>5</Typography>
        </Box>
        
        {/* <Box className="card" style={{ backgroundColor: "#4CCD99", marginTop:"20px",padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }} >
          <div className="card-inner">
            <h3 style={{ margin: 0, fontSize: "1.5rem" }}>PENDING REQUESTS</h3>
          </div>
          <h1>{pendingRequests}</h1>
        </Box> */}
        <NavLink to="/app/requests">
          <Box className="card" style={{ backgroundColor: "#db7c67", marginTop:"20px",padding: "15px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }} >
            <div style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon icon={faTasks} style={{ fontSize: "24px",marginRight: "10px",marginBottom: "20px", color: "white" }} />
            <Typography variant="h6" style={{ color: "white",height: "60px", fontSize:"24px",fontWeight: "bold" }}>Pending Requests</Typography>
          </div>
            <Typography variant="h4" style={{ fontSize: "1.5rem", color: "white" }}>{pendingRequests}</Typography>
          </Box>
        </NavLink>

      </Box>

{/* 
      <Box display="grid" gridTemplateColumns="1fr 1fr " gap="20px">
        <Box>
          <Box className="user-card" style={{ backgroundColor: "#31363F", marginTop:"20px",padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
            <div className="card-inner" style={{ borderBottom: "2px solid #3AAFA9", paddingBottom: "10px" }}>
              <h3 style={{ margin: 0, fontSize: "1.5rem" }}>Highest Spending User</h3>
            </div>
            <div style={{ marginTop: "10px" }}>
              <h2 style={{ fontSize: "1.2rem" }}>User Details</h2>
              <p style={{ marginBottom: "5px" }}>Email: {maxSpender.max_spender}</p>
              <p style={{ marginBottom: "5px" }}>Total Expense: ₹{maxSpender.total_expenses}</p>
            </div>
          </Box>
        </Box>
        <Box>
          <Box className="user-card" style={{ backgroundColor: "#31363F", marginTop:"20px",padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
            <div className="card-inner" style={{ borderBottom: "2px solid #3AAFA9", paddingBottom: "10px" }}>
              <h3 style={{ margin: 0, fontSize: "1.5rem" }}>Lowest Spending User</h3>
            </div>
            <div style={{ marginTop: "10px" }}>
              <h2 style={{ fontSize: "1.2rem" }}>User Details</h2>
              <p style={{ marginBottom: "5px" }}>Email: {minSpender.min_spender}</p>
              <p style={{ marginBottom: "5px" }}>Total Expense: ₹{minSpender.total_expenses}</p>
            </div>
          </Box>
        </Box>
      </Box> */}


      {/* ROW 2 - Line Chart, Pie Chart, Bar Chart */}
      <Box display="grid" gridTemplateColumns="1fr 1fr" gap="10px">
        <Box>
          <Box m="20px">
            <Header title="Department-wise Expense" subtitle="" />
            <Box height="50vh">
              <BarChart />
            </Box>
          </Box>
        </Box>
        <Box>
          <Box m="20px">
            <Header title="Category-wise Expense" subtitle="" />
            <Box height="50vh">
              <PieChart />
            </Box>
          </Box>
        </Box>

      </Box>
      {/*ROW 3 */}

    </Box>
  );
};

export default Dashboard;
