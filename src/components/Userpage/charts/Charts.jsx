import React from "react";
import Common from "../../../common/Common";
import "./chart.css";
import ReactApexChart from "react-apexcharts";

const Charts = () => {
  const data = {
    series: [44, 55, 41, 17, 15], // Adding two more data points for a total of 5 categories
    options: {
      chart: {
        type: "donut",
        foreColor: "grey",
      },
      fill: {
        colors: ["#35B8E0", "#6658DD", "#FF8ACC", "#FF5733", "#33FF57"], // Adding colors for the additional data points
      },
      stroke: {
        colors: ["#313844"],
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
              },
            },
          },
        },
      },
      labels: ["X", "Y", "Z", "A", "B"], // Adding labels for the additional data points
      legend: {
        position: "bottom",
      },
    },
    
  };

  const line = {
    series: [
      {
        name: "Monthly Wise Report", // Changing the series name
        data: [50, 60, 10, 60, 80, 30,50, 60, 10, 60, 80, 30], // Using only one line of data
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
        foreColor: "grey",
        width: "110%", // Set the width of the chart
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "category", // Set the x-axis type to category
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","July","Aug","Sept","Oct","Nov","Dec"], // Add the months of the year
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          show: true,
          rotate: -45, // Rotate the x-axis labels for better visibility
          style: {
            colors: "#ffffff", // Set the color of the x-axis labels
          },
        },
      },
      grid: {
        show: false,
      },
      yaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          show: true,
        },
      },
    },
  };

  return (
    <>
      <section className='charts grid2'>
        <div className='cardBox1'>
          <Common title='Category Wise Report' />
          <ReactApexChart options={data.options} series={data.series} type='donut' height={350} />
        </div>
        
        <div className='cardBox1'>
          <Common title='Monthly Wise Report' />
          <ReactApexChart options={line.options} series={line.series} type='line' height={350} />
        </div>
      </section>
    </>
  );
};

export default Charts;