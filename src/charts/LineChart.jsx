import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Month","value"],
  ["Jan",10], // Example data for January (0 to 300 at intervals of 100)
  ["Feb",20],
  ["March",40],
  ["April",30],
  ["May",60],
  ["May",70],
  ["June",90],
  ["July",100],
  ["Aug",105],
  ["Sept",45],
  ["Oct",35],
  ["Nov",15],
  ["Dec",30]
  , // Example data for February (0 to 600 at intervals of 200)
  // Add data for other months similarly
];

export const options = {
  chart: {
    title: "User Expenses",
    subtitle: "Monthly Expenses Over a Period",
  },
  hAxis: {
    title: "Expense",
  },
  vAxis: {
    title: "Month",
  },
  colors: ["#013220","rgb(53,138,148)","rgb(37,11,165)","#188310"]
};

export default function LineChart() {
  return (
    <Chart
      chartType="Line"
      width="100%"
      height="350px"
      data={data}
      options={options}
    />
  );
}
