import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Month", "Expenses"],
  ["January", 1000],
  ["February", 1170],
  ["March", 660],
  ["April", 1030],
  ["May", 1000],
  ["June", 1170],
  ["July", 660],
  ["August", 1030],
  ["September", 1000],
  ["October", 1170],
  ["November", 660],
  ["December", 1030],
];

export const options = {
  
  curveType: "function",
  legend: { position: "bottom" }
  
};

export default function LineChart() {
  return (
    <div style={{ marginTop: "-10px" }}> {/* Adjust the margin-top as needed */}
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}

