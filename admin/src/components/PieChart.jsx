import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the URL using localStorage.getItem("username")
    const fetchCategorySpending = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:9000/cat_spending/${localStorage.getItem("username")}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        // Convert category totals object to array of objects
        const newData = Object.entries(jsonData).map(([id, value]) => ({ id, value }));
        setData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCategorySpending();
  }, []);

  return (
    <ResponsivePie
      data={data}
      theme={{
        textColor: "white",
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: "white", // Set tooltip text color to white
          },
        },
      }}
      tooltip={({ datum }) => `${datum.id}: ${datum.value}%`}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
    />
  );
};

export default PieChart;
