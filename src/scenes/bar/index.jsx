import { Box } from "@mui/material";
import Header from "../../components/Adminpage/Header";
import BarChart from "../../components/Adminpage/BarChart";

const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Department wise Analytics" subtitle="Based on the categories in each department" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default Bar;
