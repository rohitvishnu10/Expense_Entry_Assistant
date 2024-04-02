import React from "react";
// import { Chart } from "react-google-charts";
import Common from "./Common";
import "../charts/chart.css";
import ReactApexChart from 'react-apexcharts';


// export const data = [
//   ["Month", "Expenses"],
//   ["January", 1000],
//   ["February", 1170],
//   ["March", 660],
//   ["April", 1030],
//   ["May", 1000],
//   ["June", 1170],
//   ["July", 660],
//   ["August", 1030],
//   ["September", 1000],
//   ["October", 1170],
//   ["November", 660],
//   ["December", 1030],
// ];

// export const options = {
  
//   curveType: "function",
//   legend: { position: "bottom" }
  
// };

export const line = {
  series: [
    {
      name: "X",
      data: [50, 60, 10, 60, 80, 30],
    },
    {
      name: "Y",
      data: [0, 40, 80, 20, 40, 60],
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
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: ["2015", "2016", "2017", "2018", "2019", "2020"],
      // Add other xaxis options here
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

export default function LineChart() {
  return (
    // <div style={{ marginTop: "-10px" }}> {/* Adjust the margin-top as needed */}
    //   <Chart
    //     chartType="LineChart"
    //     width="100%"
    //     height="400px"
    //     data={data}
    //     options={options}
    //   />
    // </div>
    <div style={{ marginTop: "-10px",backgroundColor: '#333742' }}> {/* Adjust the margin-top as needed */}
        <div className='cardBox' style={{ backgroundColor: '#333742' }}>
          <Common title='Overly Monthly expense' />
          <ReactApexChart options={line.options} series={line.series} type='line' height={350} />
        </div>
    </div>
  );
}

