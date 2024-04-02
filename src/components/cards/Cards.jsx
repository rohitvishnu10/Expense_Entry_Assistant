import React from "react";
import ReactApexChart from "react-apexcharts";
import "./cards.css";
import Common from "../../common/Common";

const Cards = () => {
  // Total amounts
  const totalAmountAccepted = 4000;
  const totalAmountPending = 3000;
  const totalSpent = 7000;

  // Calculate percentages
  const percentageAccepted = (totalAmountAccepted / totalSpent) * 100;
  const percentagePending = (totalAmountPending / totalSpent) * 100;

  const data = {
    series: [percentageAccepted],
    options: {
      chart: {
        height: 150,
        type: "radialBar",
        foreColor: "grey",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "58%",
          },
          dataLabels: {
            value: {
              show: false,
            },
          },
        },
      },
      labels: [`${percentageAccepted.toFixed(2)}%`],
      colors: ["#ff5b5b"],
    },
  };
  
  const data1 = {
    series: [percentagePending],
    options: {
      chart: {
        height: 150,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "58%",
          },
          dataLabels: {
            value: {
              show: false,
            },
          },
        },
      },
      labels: [`${percentagePending.toFixed(2)}%`],
      colors: ["#E9B251"],
    },
  };

  const data2 = {
    series: [100], // 100% for total spent
    options: {
      chart: {
        height: 150,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "58%",
          },
          dataLabels: {
            value: {
              show: false,
            },
          },
        },
      },
      labels: ["100%"],
      colors: ["#6DD365"],
    },
  };

  return (
    <>
      <section className='cards grid'>
        <div className='cardBox'>
          <Common title='Total Amount Accepted' />
          <div className='circle'>
            <div className='row'>
              <ReactApexChart options={data.options} series={data.series} type='radialBar' height={150} />
            </div>
            <div className='title row'>
              <h1>{totalAmountAccepted}</h1>
            </div>
          </div>
        </div>
        <div className='cardBox'>
          <Common title='Total Amount Pending' />
          <div className='circle'>
            <div className='row'>
              <ReactApexChart options={data1.options} series={data1.series} type='radialBar' height={150} />
            </div>
            <div className='title row'>
              <h1>{totalAmountPending}</h1>
            </div>
          </div>
        </div>
        <div className='cardBox' >
          <Common title='Total Spent' />
          <div className='circle'>
            <div style={{ marginTop:"40px",display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h1 style={{ color: '#b5c938' }}>{totalSpent}</h1>
            </div>
          </div>
          </div>
      </section>
    </>
  );
};

export default Cards;
