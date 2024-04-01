import React, { useState } from 'react';
import Sidenav from "../components/Sidenav";
import Navbar from "../components/Navbar";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '@fortawesome/fontawesome-free/css/all.css';
import '../css/bot.css';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    setMessages(prevMessages => [...prevMessages, { text: inputValue, sender: "user" }]);
    setInputValue(""); // Clear the input text message bar

    try {
      // Replace the URL with your actual endpoint
      const response = await fetch('http://localhost:8000/userchatinput', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: inputValue }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      const botResponse = responseData.response;

      setMessages(prevMessages => [...prevMessages, { text: botResponse, sender: "bot" }]);
    } catch (error) {
      console.error("Error sending or receiving response:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Box height={30} sx={{ display: "flex",bgcolor:"#292c37" }}/>
      <Box sx={{ display: "flex",bgcolor:"#292c37" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="chatbot-container">
            <div className="chatbot-messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  {message.sender === 'bot' && <i className="fas fa-robot bot-icon"></i>} {/* Robot icon */}
                  <div className="message-content" style={{ color: message.sender === 'user' ? 'white' : 'black' }}>{message.text}</div>
                  {message.sender === 'user' && <i className="fas fa-user user-icon"></i>} {/* User icon */}
                </div>
              ))}
            </div>

            <form className="chatbot-input-form" onSubmit={handleMessageSubmit}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                style={{ color: 'black' }}
              />
              <button type="submit"> Send</button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
}
