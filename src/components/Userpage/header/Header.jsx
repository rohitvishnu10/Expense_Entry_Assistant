import React, { useState } from "react";
import "./header.css";
import Head from "../head/Head";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import InvertColorsOutlinedIcon from "@mui/icons-material/InvertColorsOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import SupportOutlinedIcon from "@mui/icons-material/SupportOutlined";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Header = ({ dark, setMode }) => {
  const [Mobile, setMobile] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setMobile(false);
  };

  return (
    <>
      <aside className={Mobile ? "sidebar open" : "sidebar"} style={{ backgroundColor: "#F39F5A" }}>
        <Head dark={dark} setMode={setMode} />
        <div className="sidebar-menu" >
          <ul>
            <li>
              <a href='/home' className={selectedItem === 'Dashboard' ? 'navIcon active' : 'navIcon'} onClick={() => handleItemClick('Dashboard')}>
                <DashboardOutlinedIcon className='navIcon' />
                Dashboard
              </a>
            </li>
            <li>
              <a href='/bot' className={selectedItem === 'Chat Bot' ? 'navIcon active' : 'navIcon'} onClick={() => handleItemClick('Chat Bot')}>
                <InvertColorsOutlinedIcon className='navIcon' />
                Chat Bot
              </a>
            </li>
            <li>
              <a href='/dashboard' className={selectedItem === 'Dashboard' ? 'navIcon active' : 'navIcon'} onClick={() => handleItemClick('Dashboard')}>
                <GridViewOutlinedIcon className='navIcon' />
                Dashboard
              </a>
            </li>
            <li>
              <a href='/' className={selectedItem === 'Support' ? 'navIcon active' : 'navIcon'} onClick={() => handleItemClick('Support')}>
                <SupportOutlinedIcon className='navIcon' />
                Support
              </a>
            </li>

          </ul>
        </div>
        <button className='toggle' onClick={() => setMobile(!Mobile)}>
          {Mobile ? <CloseIcon /> : <MenuIcon />}
        </button>
      </aside>
    </>
  );
};

export default Header;