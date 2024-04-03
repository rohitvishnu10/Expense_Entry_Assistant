import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faEye } from '@fortawesome/free-solid-svg-icons';
import "./Home.css";

const Home = () => {
  return (
    <section className='home'>
      <div className='contain'>
        <div className='heading flexSB'>
          <h1>Welcome back!</h1> {/* Updated heading size */}
        </div>
        <div className='buttonGrid'> {/* New grid container for the buttons */}
          <Link to="/bot" className="fullWidthButton">
            <FontAwesomeIcon icon={faRobot} className="icon" />
            Quick start an expense ... 
          </Link>
          <Link to="/tabledata" className="fullWidthButton1" >
            <FontAwesomeIcon icon={faEye} className="icon" />
            View expenses 
          </Link>
        </div>
        <div className='spacer'></div> {/* Add space between components */}
        <div className='grid'>
          <div className='card'>
            <div className="recentExpenses">
              <h3 class="text1">Recent Expenses</h3>
              <p class="text2">Latest 5 expenses </p> {/* New description below the heading */}
              <table>
                <thead>
                  <tr>
                    <th style={{ color: 'black' }}>Date</th>
                    <th style={{ color: 'black' }}>Category</th>
                    <th style={{ color: 'black' }}>Amount (₹)</th> {/* Updated text */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2024-03-01</td>
                    <td>Food</td>
                    <td>₹50.00</td> {/* Updated currency symbol */}
                  </tr>
                  <tr>
                    <td>2024-03-05</td>
                    <td>Travel</td>
                    <td>₹120.00</td> {/* Updated currency symbol */}
                  </tr>
                  <tr>
                    <td>2024-03-10</td>
                    <td>Accommodation</td>
                    <td>₹80.00</td> {/* Updated currency symbol */}
                  </tr>
                  <tr>
                    <td>2024-03-15</td>
                    <td>Food</td>
                    <td>₹45.00</td> {/* Updated currency symbol */}
                  </tr>
                  <tr>
                    <td>2024-03-20</td>
                    <td>Miscellaneous</td>
                    <td>₹30.00</td> {/* Updated currency symbol */}
                  </tr>
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
