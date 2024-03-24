import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import PieChart from "../../components/PieChart";
import BarChart from "../../components/BarChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
      
      {/* ROW 1 - Display 4 cards in different colors */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        gap="20px"
      >
        <Box className="card" style={{ backgroundColor: "#FB2576" }}>
          <div className="card-inner">
            <h3>EMPLOYEES</h3>
          </div>
          <h1>300</h1>
        </Box>
        <Box className="card" style={{ backgroundColor: "#E3651D" }}>
          <div className="card-inner">
            <h3>CATEGORIES</h3>
          </div>
          <h1>4</h1>
        </Box>
        <Box className="card" style={{ backgroundColor: "#5356FF" }}>
          <div className="card-inner">
            <h3>TOTAL SPENT</h3>
          </div>
          <h1>₹330000</h1>
        </Box>
        <Box className="card" style={{ backgroundColor: "#4CCD99" }}>
          <div className="card-inner">
            <h3>PENDING REQUESTS</h3>
          </div>
          <h1>42</h1>
        </Box>
      </Box>

      {/* ROW 2 - Line Chart, Pie Chart, Bar Chart */}
      <Box display="grid" gridTemplateColumns="1fr 1fr" gap="20px">
        <Box>
          <Box m="20px">
            <Header title="Line Chart" subtitle="" />
            <Box height="40vh">
              <LineChart />
            </Box>
          </Box>
        </Box>
        <Box>
          <Box m="20px">
            <Header title="Pie Chart" subtitle="" />
            <Box height="40vh">
              <PieChart />
            </Box>
          </Box>
        </Box>

      </Box>
      {/*ROW 3 */}
      <Box display="grid" gridTemplateColumns="1fr " gap="20px">
      
        <Box>
          <Box m="20px">
            <Header title="Bar Chart" subtitle="" />
            <Box height="40vh">
              <BarChart />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
