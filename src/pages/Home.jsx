import React from 'react'
import Sidenav from "../components/Sidenav";
import Navbar from "../components/Navbar";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import '../Dash.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { colors } from '@mui/material';
import LineChart from '../charts/LineChart';
import PieChart from '../charts/PieChart';

export default function Home() {
  const currentUser = localStorage.getItem("username");
  return (
    <>
    <div className='bgcolor'>
      
    <Navbar />
    <Box height={70} />
    <Box sx={{ display: "flex" }}>
    <Sidenav />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Stack spacing={2} direction='row'>
          <Card sx={{ minWidth: 49 + "%", height: 150 }} className="gradient custom-card">
            <CardContent>
              <div className="iconstyle">
                <CreditCardIcon />
              </div>
              <Typography gutterBottom variant="h5" component="div" sx={{ color: 'white' }}>
                $500.00
              </Typography>
              <Typography gutterBottom variant="body2" component="div" sx={{ color: "#ccd1d1" }}>
                Amount Spent in a Day 
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 49 + "%", height: 150 }} className="gradientlight custom-card">
            <CardContent>
              <div className="iconstyle">
                <ReceiptLongIcon />
              </div>
              <Typography gutterBottom variant="h5" component="div" sx={{ color: 'white' }}>
                $900.00
              </Typography>
              <Typography gutterBottom variant="body2" component="div" sx={{ color: "#ccd1d1" }}>
                Recent Transaction 
              </Typography>
            </CardContent>
          </Card> 
          <Card sx={{ minWidth: 49 + "%", height: 150 }} className="gradientlight2 custom-card">
            <CardContent>
              <div className="iconstyle">
                <AccountCircleIcon />
              </div>
              <Typography gutterBottom variant="h5" component="div" sx={{ color: 'white' }}>
                {currentUser}
              </Typography>
              <Typography gutterBottom variant="body2" component="div" sx={{ color: "#ccd1d1" }}>
                Current User
              </Typography>
            </CardContent>
          </Card> 
        </Stack>
      </Grid>
    </Grid>
    <Box height={20} />
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Card sx={{ height: 60 + "vh", alignItems: "center" }}>
          <CardContent>
            <Typography variant="h2" sx={{ fontSize: "17px", marginTop: "5px", marginLeft: "15px", marginBottom: "5px", color: "#434545" }}>
              User Expense Statistics
            </Typography>
            <Typography variant="h4" sx={{ fontSize: "14px", marginTop: "5px", marginLeft: "15px", marginBottom: "10px", color: "#ccd1d1" }}>
              Overall Monthly Expense
            </Typography>
            <LineChart />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card sx={{ height: "60vh", display: "flex", justifyContent: "center", alignItems: "center", margin: 0 }} className="custom-card">
          <CardContent>
            <PieChart />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    </Box>
    </Box>
    </div>
    </>
  );
}
