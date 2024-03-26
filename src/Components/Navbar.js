import React, { useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import {Box,Drawer,ListItem,ListItemButton,ListItemIcon,ListItemText,List,Divider} from "@mui/material";
import About from './About.js';
import Feedback from "./Feedback.js";
import UserGuide from "./UserGuide.js";


const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const menuOptions = [
      {
        text: "Home",
        link:"home",
      },
      {
        text: "About",
        link:'about',
      },
      {
        text: "User Guide",
        link: "userGuide",
      },
      {
        text: "Feedback",
        link: "feedback",
      },
    ];
    return (
      <nav>
        <div className="nav-logo-container">
          { }
        </div>
        <div className="navbar-links-container">
          <a href="/">Home</a>
          <a href="/#about">About</a>
          <a href="/#userGuide">User Guide</a>
          <a href="/#feedback">Feedback</a>
          <button className="admin-button">Admin Login</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button className="user-button">User Login</button>
        </div>
        
        <div className="navbar-menu-container">
          <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
        </div>
        <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => setOpenMenu(false)}
            onKeyDown={() => setOpenMenu(false)}
          >
            <List>
              {menuOptions.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Box>
        </Drawer>
      </nav>
    );
  };
  
  export default Navbar;