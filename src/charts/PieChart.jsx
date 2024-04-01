import React from "react";

import Common from "./Common";
import "./chart.css";
import Typography from '@mui/material/Typography';
import ReactApexChart from "react-apexcharts";


export default function PieChart(){
    const data = {
        series: [44, 55, 41],
        options: {
          chart: {
            type: "donut",
            foreColor: "grey",
          },
          fill: {
            colors: ["#35B8E0", "#6658DD", "#FF8ACC"],
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
          labels: ["X", "Y", "Z"],
          legend: {
            position: "bottom",
          },
        },
      };
    return(
        <React.Fragment style={{ backgroundColor: '#333742' }}>
            <div className="container-fluid" style={{ backgroundColor: '#333742' }}>             
            <Common title='Category Wise Report' />
            <ReactApexChart options={data.options} series={data.series} type='donut' height={350} />
            </div>
        </React.Fragment>
    )
}
