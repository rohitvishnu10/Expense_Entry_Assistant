import React, { useEffect, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

const Head = ({ dark, setMode }) => {
  // Retrieve username from local storage
  const [username, setUsername] = useState(localStorage.getItem("username") || "");

  useEffect(() => {
    // Update the username state if it changes in local storage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername !== username) {
      setUsername(storedUsername || "");
    }
  }, [username]);

  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          <div className='left'>
            <div className='logo'>

            </div>
          </div>
          <div className='right flexCenter'>
            <div className='search flexCenter'>
              <input type='text' placeholder='Search...' />
              <SearchOutlinedIcon className='iconHead' />
            </div>
            <NotificationsNoneOutlinedIcon className='iconHead' />
            <div className='profile flexCenter'>
              <img className='imageCircle' src='https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/user.png' alt='' />

              <span>{username}</span> {/* Display username here */}
              <KeyboardArrowDownOutlinedIcon className='iconHead' />
            </div>
            <button onClick={() => setMode(!dark)}>
              <SettingsIcon className='iconHead' />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Head;
