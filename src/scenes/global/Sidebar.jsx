import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

const Item = ({ title, to, icon, selected, setSelected, isCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
        marginBottom: "20px",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      {!isCollapsed && <Typography variant="h6" style={{ fontSize: "16px"}}>{title}</Typography>}
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [logoutConfirmationOpen, setLogoutConfirmationOpen] = useState(false);
  const handleLogoutConfirmation = () => {
    setLogoutConfirmationOpen(true);
  };
  useEffect(() => {
    const path = location.pathname;
    if (path === "/app") {
      setSelected("Dashboard");
    } else if (path === "/app/requests") {
      setSelected("Pending Reimbursements");
    } else if (path === "/app/form") {
      setSelected("Add User");
    } else if (path === "/app/bar") {
      setSelected("Department Wise Analytics");
    } else if (path === "/app/pie") {
      setSelected("Category Wise Analytics");
    } else if (path === "/") {
      setSelected("Logout");
    }
  }, [location.pathname]);

  const handleLogout = (confirmed) => {
    setLogoutConfirmationOpen(false);
    if (confirmed) {
      window.location.href = "/"; // Redirect to the home page
    } else {
      setSelected("Dashboard"); // Reset selected item to "Dashboard"
    }
  };
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
            icon={isCollapsed ? <MenuOutlinedIcon  style={{ color: "#ffffff" }}/> : undefined}
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
            <Box mb="10px">
              <Box display="flex" justifyContent="center" alignItems="center">

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

          <Box paddingLeft={isCollapsed ? undefined : "0%"}>
            <Item
              title="Dashboard"
              to="/app"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />


            <Item
              title="Pending Reimbursements"
              to="/app/requests"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />

            <Item
              title="Add User"
              to="/app/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />

            <Item
              title="Department Wise Analytics"
              to="/app/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <Item
              title="Category Wise Analytics"
              to="/app/pie"
              icon={<PieChartOutlineOutlinedIcon />}
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
            onClick={handleLogoutConfirmation}
            />

          </Box>
        </Menu>
      </ProSidebar>
      <Dialog
        open={logoutConfirmationOpen}
        onClose={() => handleLogout(false)}
      >
        <DialogTitle>Logout Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleLogout(false)} color="primary">
            No
          </Button>
          <Button onClick={() => handleLogout(true)} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Sidebar;