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
import CurrencyRupeeTwoToneIcon from '@mui/icons-material/CurrencyRupeeTwoTone';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { colors } from '@mui/material';
import BarChart from '../charts/LineChart';
import PieChart from '../charts/PieChart';
export default function Home() {
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
  <Card sx={{ minWidth: 49 + "%",height:150 }} className="gradient">
      <CardContent>
      <div className="iconstyle">
            <CreditCardIcon/>
        </div>
        <Typography gutterBottom variant="h5" component="div" sx={{color: 'white'}}>
          $500.00
        </Typography>
        <Typography 
        gutterBottom 
        variant="body2" 
        component="div" 
        sx={{ color: "#ccd1d1" }}>
          Amount Spent in a Day 
        </Typography>
      </CardContent>
    </Card>
    <Card sx={{ minWidth: 49 + "%",height:150}} className="gradientlight">
      <CardContent>
        <div className="iconstyle">
            <ReceiptLongIcon/>
        </div>
        <Typography gutterBottom variant="h5" component="div" sx={{color: 'white'}}>
          $900.00
        </Typography>
        <Typography gutterBottom variant="body2" component="div" sx={{ color: "#ccd1d1" }}>
          Recent Transaction 
        </Typography>
       
      </CardContent>
    </Card> 
    </Stack>
  </Grid>
  <Grid item xs={4}>
  <Stack spacing={2} >
    <Card className="gradientlight">
      <Stack spacing={2} direction={"row"} alignItems={"center"} >
      <div className="iconstyle" style={{ marginLeft: '20px' }}>
        <CurrencyRupeeTwoToneIcon />
        </div>
        <div className="paddingall">
        <span className='pricetitle'style={{color:'white'}}>$203K</span>
        <br />
        <span className='pricesubtitle' style={{color:'white'}}>Total Amount Alloted</span>
        </div>
        </Stack>
    </Card>
    <Card >
      <Stack spacing={2} direction={"row"} alignItems={"center"}>
      <div  style={{ marginLeft: '20px' }}>
        <AccountBalanceWalletIcon />
        </div>
        <div className='paddingall'>
        <span className='pricetitle'>$203K</span>
        <br />
        <span className='pricesubtitle'>Balance Amount</span>
        </div>
        </Stack>
    </Card>
    </Stack>
  </Grid>
</Grid>
<Box height={20} />
<Grid container spacing={2}>
  <Grid item xs={8}>
  <Card sx={{ height:60+"vh",alignItems: "center"}}>
      <CardContent>
      <BarChart />
      </CardContent>
    </Card>
  </Grid>
  <Grid item xs={4}>
        <Card sx={{ height: "60vh", display: "flex", justifyContent: "center", alignItems: "center",margin:0 }}>
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
