import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../theme";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:9000/cats_bar/${localStorage.getItem("username")}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        setCategories(jsonData.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Fetch data from the URL using localStorage.getItem("username")
    const fetchDepartmentData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:9000/department_spending/${localStorage.getItem("username")}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDepartmentData();
  }, []);

  // Sample data for 10 bars with department names
  return (
<ResponsiveBar
      data={data}
      theme={{
        textColor: "white", // Set text color using the colors from theme
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
              fontSize: 15, // Set the font size for axis labels
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
            fontSize: 16,
          },
        },
        tooltip: {
          container: {
            color: "black", // Set tooltip text color to black
          },
        },
        arcLabelsTextColor: {
          from: 'color',
          modifiers: [['darker', 2]],
        },
        arcLabelsTextFontWeight: "bold",
        
      }}
      keys={categories}
      indexBy="department"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "set3" }}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -45,
        legend: isDashboard ? undefined : "",
        legendPosition: "middle",
        legendOffset: 90,
        tickValues: 5, // Example: Set the number of tick values
        tickTextColor: "white", // Set the x-axis tick text color to white
        tickTextFontSize: 14, // Set the x-axis tick text font size
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "",
        legendPosition: "middle",
        legendOffset: -40,
        tickTextColor: "white", // Set the y-axis tick text color to white
        tickTextFontSize: 14, // Set the y-axis tick text font size
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      totalsOffset={29}

      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 110,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 30,
          itemDirection: "left-to-right",
          itemOpacity: 0.9,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: '#ffffff',
                
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return "₹" + e.id + ": " + e.formattedValue + ": " + e.indexValue;
      }}
    />
  );
};

export default BarChart;
