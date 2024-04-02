import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import AndroidOutlinedIcon from "@mui/icons-material/AndroidOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
const Item = ({ title, to, icon, selected, setSelected }) => {

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: "#ffffff"
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        background: "#333843",
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

              </Box>
              <Box textAlign="center">
              <Typography
                  variant="h5"
                  color="#ffffff"
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {localStorage.getItem("username")}
                </Typography>

              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/home"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />


            <Item
              title="Expense Requests"
              to="/dashboard"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Expense Tracker"
              to="/bot"
              icon={<AndroidOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Logout"
              to="/"
              icon={<ExitToAppOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
