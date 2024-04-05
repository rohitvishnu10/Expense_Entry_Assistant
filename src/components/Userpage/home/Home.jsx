import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faEye } from '@fortawesome/free-solid-svg-icons';
import "./Home.css";

const Home = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch expenses data from your API
    const fetchExpenses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:7000/last_expenses/' + localStorage.getItem("username"));
        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <section className='home'>
      <div className='contain'>
        <div className='heading flexSB'>
          <h1>Welcome back!</h1>
        </div>
        <div className='buttonGrid'>
          <Link to="/bot" className="fullWidthButton">
            <FontAwesomeIcon icon={faRobot} className="icon" />
            Quick start an expense ... 
          </Link>
          <Link to="/tabledata" className="fullWidthButton1" >
            <FontAwesomeIcon icon={faEye} className="icon" />
            View expenses 
          </Link>
        </div>
        <div className='spacer'></div>
        <div className='grid'>
          <div className='card'>
            <div className="recentExpenses">
              <h3 class="text1">Recent Expenses</h3>
              <p class="text2">Latest 5 expenses </p>
              <table>
                <thead>
                  <tr>
                    <th style={{ color: 'black' }}>Date</th>
                    <th style={{ color: 'black' }}>Category</th>
                    <th style={{ color: 'black' }}>Status</th>
                    <th style={{ color: 'black' }}>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense, index) => (
                    <tr key={index}>
                      <td>{expense.date}</td>
                      <td>{expense.category}</td>
                      <td>{expense.accepted}</td>
                      <td>₹{expense.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="chatbotDescription card">
            <h3 class="text1">How Chatbot Works</h3>
            <p class="text2">
              Welcome to our chatbot expense tracker! With this handy tool, you can easily manage and categorize your expenses. Simply chat with the bot, and it will understand natural language commands like 'I spent 500 Rs on coffee.' Your expenses will be accurately recorded and categorized, making it easy to keep track of your spending. Check out the Expense Requests page to view and manage your recent expenses. Start chatting now to stay on top of your finances effortlessly!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
