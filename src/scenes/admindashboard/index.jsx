import { useState, useEffect } from 'react';
import { Box,Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Adminpage/Header";
import LineChart from "../../components/Adminpage/LineChart";
import PieChart from "../../components/Adminpage/PieChart";
import BarChart from "../../components/Adminpage/BarChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faListAlt, faTasks } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [employeesCount, setEmployeesCount] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [maxSpender, setMaxSpender] = useState({});
  const [minSpender, setMinSpender] = useState({});
  const [categoryCount, setCategoryCount] = useState(0);

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

    const fetchCatCount = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:9000/cat_count/${localStorage.getItem("username")}`);
        if (!response.ok) {
          throw new Error('Failed to fetch category count');
        }
        const data = await response.json();
        setCategoryCount(data);
      } catch (error) {
        console.error('Error fetching category count:', error);
      }
    };

    fetchCatCount();
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
          <Typography variant="h4" style={{ fontSize: "1.5rem", color: "white" }}>{categoryCount}</Typography>
        </Box>
        
        {/* <Box className="card" style={{ backgroundColor: "#4CCD99", marginTop:"20px",padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }} >
          <div className="card-inner">
            <h3 style={{ margin: 0, fontSize: "1.5rem" }}>PENDING REQUESTS</h3>
          </div>
          <h1>{pendingRequests}</h1>
        </Box> */}

        <Box className="card" style={{ backgroundColor: "#db7c67", marginTop:"20px",padding: "15px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }} >
          <div style={{ display: "flex", alignItems: "center" }}>
          <FontAwesomeIcon icon={faTasks} style={{ fontSize: "24px",marginRight: "10px",marginBottom: "20px", color: "white" }} />
          <Typography variant="h6" style={{ color: "white",height: "60px", fontSize:"24px",fontWeight: "bold" }}>Pending Requests</Typography>
        </div>
          <Typography variant="h4" style={{ fontSize: "1.5rem", color: "white" }}>{pendingRequests}</Typography>
        </Box>

      </Box>

      {/* ROW 2 - Line Chart, Pie Chart, Bar Chart */}
      <Box display="grid" gridTemplateColumns="1fr 1fr" gap="10px">
        <Box>
          <Box m="20px">
            <Header title="Department-wise Expense" subtitle="" />
            <Box height="45vh">
              <BarChart />
            </Box>
          </Box>
        </Box>
        <Box>
          <Box m="20px">
            <Header title="Category-wise Expense" subtitle="" />
            <Box height="45vh">
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
