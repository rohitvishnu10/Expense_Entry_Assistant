
import React, { useState } from 'react';
import './bot.css'; // Import your CSS file for styling

const Bot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    setMessages([...messages, { text: inputValue, sender: "user" }, { text: inputValue, sender: "user" }]);
    // Call a function to handle user input and generate bot response
    handleBotResponse(inputValue);
    handleBotResponse(inputValue);
    setInputValue("");
  };

  const handleBotResponse = (userInput) => {
    // Replace this with your logic to generate bot response based on user input
    const botResponse = `Hi there ! You said : ${userInput}`;
    setMessages([...messages, { text: botResponse, sender: "bot" }]);
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
