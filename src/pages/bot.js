
import React, { useState } from 'react';
import './bot.css'; 

const Bot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");


  
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    try {
        
        await fetch('http://localhost:8000/userchatinput', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_input: inputValue }), 
        });

        setMessages(prevMessages => [...prevMessages, { text: inputValue, sender: "user" }]);
    
    setTimeout(() => {
      handleBotResponse(inputValue);
    }, 500);

    setInputValue("");
    } catch (error) {
        console.error("Error sending POST request:", error);
    }
};


  
  

const handleBotResponse = async (userInput) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/userchatinput', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_input: userInput }), 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    const botResponse = responseData.response;

    setMessages(prevMessages => [...prevMessages, { text: botResponse, sender: "bot" }]);
  } catch (error) {
    console.error("Error fetching bot response:", error);
  }
};


  return (

    <div className="chatbot-container" >
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.sender === 'bot' &&  <i className="fas fa-robot bot-icon"></i>}
            <div>{message.text}</div>    
          </div>
        ))}

      </div>

      <form className="chatbot-input-form" onSubmit={handleMessageSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."/>
        <button type="submit"><i className="fas fa-paper-plane"></i>  Send</button>
      </form>
    </div>
  );
};

export default Bot;
