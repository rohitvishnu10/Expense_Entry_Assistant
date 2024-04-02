import React from "react";
// import Chart from "react-apexcharts";
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
        // <React.Fragment>
        //     <div className="container-fluid">
        //     <Typography variant="h2" sx={{ fontSize: "17px",marginLeft: "15px",position:"relative",top:"-75px",color:"#434545"
        // }}>Expense Categorization</Typography>
        
        // <Typography variant="h4" sx={{ fontSize: "14px",marginLeft: "15px",position:"relative",top:"-70px",color:"#ccd1d1"
        // }}>Total Expense over each Category</Typography>               
        //      <Chart
        //         type="pie"
        //         width={"400"}
        //         height={"400"}
        //         series={[23,43,50,54,65]}
        //         options={
        //             {
        //                 labels:["Food","Accomodation","Miscellaneous","Travel","Personal"]
        //             }
        //         }
        //         >

        //         </Chart>

        //     </div>
        //     </React.Fragment>

        <React.Fragment style={{ backgroundColor: '#333742' }}>
            <div className="container-fluid" style={{ backgroundColor: '#333742' }}>             
            <Common title='Category Wise Report' />
            <ReactApexChart options={data.options} series={data.series} type='donut' height={350} />
            </div>
        </React.Fragment>
    )
}
