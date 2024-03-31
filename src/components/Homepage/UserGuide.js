import React from "react";

const UserGuide = () => {
  return (
    <div id="userGuide" className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">User Guide</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="second-text"> 
        "Welcome to our Expense Management Chatbot User Guide! <br /> 

Our chatbot is designed to streamline expense management for your convenience. Here's how it works: <br /> <br />

1.<b>Input Expenses: </b>    Employees can easily enter their expenses directly into the chatbot interface. Please note that the default currency we accept is Indian Rupees (INR).
 If the expense is in another currency such as Dollars (USD), Dirhams (AED), Euros (EUR), or Pounds (GBP), please mention the currency name along with the amount. 
 The chatbot will automatically convert and store the values in Rupees for you.  <br />
 <br />
2.<b> Request Approval:</b>   Once expenses are entered, employees can request approval through the chatbot, ensuring quick reimbursement. <br />
<br />
3.<b>Dashboard Visualizations: </b>   Our website provides a user-friendly dashboard where you can view summaries and visualizations of expenses, 
offering valuable insights into spending patterns.  <br />
<br />
Enjoy hassle-free expense management with our intuitive chatbot solution. If you have any questions, feel free to reach out to our support team for assistance."
        </p>
      </div>
      {/* <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default UserGuide;