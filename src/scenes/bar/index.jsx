import { Box } from "@mui/material";
import Header from "../../components/Adminpage/Header";
import BarChart from "../../components/Adminpage/BarChart";

const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Expense Distribution " />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default Bar;
