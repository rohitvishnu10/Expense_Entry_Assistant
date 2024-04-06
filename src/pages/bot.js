import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './bot.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';


export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [expenseData, setExpenseData] = useState(null);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    setMessages(prevMessages => [...prevMessages, { text: inputValue, sender: "user" }]);
    setInputValue(""); // Clear the input text message bar

    try {
      const response = await fetch(`http://127.0.0.1:7000/userchatinput/${localStorage.getItem("username")}`, {
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

      // Check if bot response contains expense data
      const jsonStart = botResponse.indexOf("{");
      if (jsonStart !== -1) {
        const jsonEnd = botResponse.lastIndexOf("}");
        const jsonPart = botResponse.substring(jsonStart, jsonEnd + 1);
        const expenses = JSON.parse(jsonPart).expenses;
        setExpenseData(expenses);
        // Display only the textual part of the response without the JSON part
        const textualResponse = botResponse.substring(0, jsonStart);
        setMessages(prevMessages => [...prevMessages, { text: textualResponse, sender: "bot" }]);
      } else {
        // If the response does not contain expense data, display the entire response
        setMessages(prevMessages => [...prevMessages, { text: botResponse, sender: "bot" }]);
      }

    } catch (error) {
      console.error("Error sending or receiving response:", error);
    }
  };

  return (
    <>
      <div className='heading flexSB'>
        <h1><FontAwesomeIcon icon={faRobot} className="icon" />     Create your new expense</h1>
      </div>
      <Box height={30} sx={{ display: "flex", bgcolor: "#131417" }} />
      <Box sx={{ display: "flex", bgcolor: "#131417" }}>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="chatbot-container">
            <div className="chatbot-messages" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  {message.sender === 'bot' && <i className="fas fa-robot bot-icon"></i>}
                  <div className="message-content" style={{ color: message.sender === 'user' ? 'white' : 'black' }}>{message.text}</div>
                  {message.sender === 'user' && <i className="fas fa-user user-icon"></i>}
                </div>
              ))}
              {expenseData && (
                <div className="expense-table" style={{ border: '1px solid white', maxWidth: '70%', margin: '10px 0',fontFamily: 'Source Sans Pro, sans-serif' }}>
                  <table style={{ width: '100%', color: 'white', fontFamily: 'Source Sans Pro, sans-serif'}}>
                    <thead style={{ backgroundColor: '#e6e6e6', color: 'black',fontFamily: 'Source Sans Pro, sans-serif' }}>
                      <tr>
                        <th>Category</th>
                        <th>Location</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenseData.map((expense, index) => (
                        <tr key={index}>
                          <td>{expense.category}</td>
                          <td>{expense.location}</td>
                          <td>{expense.amount}</td>
                          <td>{expense.date}</td>
                          <td>{expense.purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <form className="chatbot-input-form" onSubmit={handleMessageSubmit}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                style={{ color: 'white' }}
              />
              <button type="submit"> Send</button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
}
