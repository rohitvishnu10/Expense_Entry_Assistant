import React from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/chatbot5.png";
// import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
        Simplify Expense Management with Us
        </h1>
        <p className="primary-text">
        Simplify expense management with our chatbot. 
        Employees can easily input expenses and request approval, ensuring swift reimbursements.
        </p>
        <p className="primary-text">
        Our chatbot offers clear summaries and visualizations, providing valuable insights into company spending.
        </p>
      </div>
    </div>
  );
};

export default About;