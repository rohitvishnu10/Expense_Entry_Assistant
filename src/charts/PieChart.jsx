import React from "react";
import Chart from "react-apexcharts";
import Typography from '@mui/material/Typography';

export default function PieChart() {
    return (
        <React.Fragment>
            <div className="container-fluid">
                <Typography variant="h2" sx={{ fontSize: "17px", marginLeft: "15px", position: "relative", top: "-75px", color: "#eee" }}>
                    Expense Categorization
                </Typography>
                <Typography variant="h4" sx={{ fontSize: "14px", marginLeft: "15px", position: "relative", top: "-70px", color: "#ccc" }}>
                    Total Expense over each Category
                </Typography>
                <Chart
                    type="pie"
                    width={"400"}
                    height={"400"}
                    series={[23, 43, 50, 54, 65]}
                    options={{
                        labels: ["Food", "Accommodation", "Miscellaneous", "Travel", "Personal"],
                        colors: ["#FFC107", "#FF5722", "#2196F3", "#4CAF50", "#9C27B0"], // Adjusted colors for dark mode
                    }}
                />
            </div>
        </React.Fragment>
    );
}
