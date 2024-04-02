import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const colors = {
  primary: {
    400: '#yourPrimaryColor', // Replace with your primary color value
  },
  grey: {
    100: '#yourGreyColor', // Replace with your grey color value
    300: '#yourGreyColor', // Replace with your grey color value
  },
  greenAccent: {
    500: '#yourGreenAccentColor', // Replace with your green accent color value
  },
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
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
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
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
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                {/* Your logo or user avatar here */}
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {localStorage.getItem("username")}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <MenuItem
              active={selected === "Dashboard"}
              style={{
                color: colors.grey[100],
              }}
              onClick={() => setSelected("Dashboard")}
              icon={<HomeOutlinedIcon />}
            >
              <Typography>Dashboard</Typography>
              <Link to="/app" />
            </MenuItem>

            <MenuItem
              active={selected === "Pending Requests"}
              style={{
                color: colors.grey[100],
              }}
              onClick={() => setSelected("Pending Requests")}
              icon={<ReceiptOutlinedIcon />}
            >
              <Typography>Pending Requests</Typography>
              <Link to="/app/requests" />
            </MenuItem>

            <MenuItem
              active={selected === "Add User"}
              style={{
                color: colors.grey[100],
              }}
              onClick={() => setSelected("Add User")}
              icon={<PersonOutlinedIcon />}
            >
              <Typography>Add User</Typography>
              <Link to="/app/form" />
            </MenuItem>

            <MenuItem
              active={selected === "Delete User"}
              style={{
                color: colors.grey[100],
              }}
              onClick={() => setSelected("Delete User")}
              icon={<PersonOutlinedIcon />}
            >
              <Typography>Delete User</Typography>
              <Link to="/app/form2" />
            </MenuItem>

            <MenuItem
              active={selected === "Bar Chart"}
              style={{
                color: colors.grey[100],
              }}
              onClick={() => setSelected("Bar Chart")}
              icon={<BarChartOutlinedIcon />}
            >
              <Typography>Bar Chart</Typography>
              <Link to="/app/bar" />
            </MenuItem>

            <MenuItem
              active={selected === "Pie Chart"}
              style={{
                color: colors.grey[100],
              }}
              onClick={() => setSelected("Pie Chart")}
              icon={<PieChartOutlineOutlinedIcon />}
            >
              <Typography>Pie Chart</Typography>
              <Link to="/app/pie" />
            </MenuItem>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;