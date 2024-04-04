import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = () => {
  const [data, setData] = useState({
    series: [],
    options: {
      chart: {
        type: "pie",
        foreColor: "#ffffff",
        width: 300, // Set the width of the pie chart
        height: 200, // Set the height of the pie chart to 200px
      },
      plotOptions: {
        pie: {
          size: 50, // Set the radius of the pie chart to 50px
        },
      },
      labels: [],
    },
  });

  useEffect(() => {
    // Fetch data from the URL using localStorage.getItem("username")
    const fetchCategorySpending = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:9000/cat_spending/${localStorage.getItem("username")}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        const seriesData = Object.values(jsonData);
        const categoryLabels = Object.keys(jsonData);
        setData({
          series: seriesData,
          options: {
            chart: {
              type: "pie",
              foreColor: "#ffffff",
              width: 300, // Set the width of the pie chart
              height: 200, // Set the height of the pie chart to 200px
            },
            plotOptions: {
              pie: {
                size: 50, // Set the radius of the pie chart to 50px
              },
            },
            labels: categoryLabels,
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategorySpending();
  }, []);

  return <ReactApexChart options={data.options} series={data.series} type="pie" />;
};

export default PieChart;
