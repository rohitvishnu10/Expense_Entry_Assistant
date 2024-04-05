import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../../theme";
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
              fontSize: 20,
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
            fontSize: 15, // Increase the legend text size
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
      }}
      enableArcLinkLabels={false}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 10,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        { match: { id: 'ruby' }, id: 'dots' },
        { match: { id: 'c' }, id: 'dots' },
        { match: { id: 'go' }, id: 'dots' },
        { match: { id: 'python' }, id: 'dots' },
        { match: { id: 'scala' }, id: 'lines' },
        { match: { id: 'lisp' }, id: 'lines' },
        { match: { id: 'elixir' }, id: 'lines' },
        { match: { id: 'javascript' }, id: 'lines' },
      ]}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#ffffff',
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
