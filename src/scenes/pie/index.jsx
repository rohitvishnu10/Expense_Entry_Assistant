import { Box } from "@mui/material";
import Header from "../../components/Adminpage/Header";
import PieChart from "../../components/Adminpage/PieChart";

const Pie = () => {
  return (
    <Box m="20px">
      <Header title="Category wise Analytics" subtitle="Based on the categories" />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default Pie;
