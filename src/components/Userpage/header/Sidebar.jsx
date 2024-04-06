import React, { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import AndroidOutlinedIcon from "@mui/icons-material/AndroidOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useLocation } from "react-router-dom";

const Item = ({ title, to, icon, selected, setSelected, isCollapsed }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: "#ffffff",
        marginBottom: "20px", // Increase the gap between components
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      {!isCollapsed && <Typography>{title}</Typography>}
      <Link to={to} />
    </MenuItem>
  );
};

const UserSidebar = () => {
  const location = useLocation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  useEffect(() => {
    const path = location.pathname;
    if (path === "/bot") {
      setSelected("Expense Assistant");
    } else if (path === "/tabledata") {
      setSelected("Expense Claims");
    } else if (path === "/dashboard") {
      setSelected("Dashboard");
    } else if (path === "/") {
      setSelected("Logout");
    }
  }, [location.pathname]);

  return (
    <Box
      sx={{
        background: "black", // Changed background color to black
        "& .pro-sidebar-inner": {
          background: "#1F2A40 !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon style={{ color: "#ffffff" }} /> : undefined}
            style={{
              margin: "30px 0 50px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon style={{ color: "#ffffff" }} />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="10px">
              <Box display="flex" justifyContent="center" alignItems="center">
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  color="#ffffff"
                  fontWeight="bold"
                  sx={{ m: "20px 10px 10px 0" }}
                >
                  {localStorage.getItem("username")}
                </Typography>
                <Typography variant="h7" color={colors.greenAccent[500]}>
                  User
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "0%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title="Expense Claims"
              to="/tabledata"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title="Expense Assistant"
              to="/bot"
              icon={<AndroidOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title="Logout"
              to="/"
              icon={<ExitToAppOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default UserSidebar;