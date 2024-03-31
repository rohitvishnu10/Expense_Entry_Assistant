import React from "react";
import BannerBackground from "../../Assets/home-banner-background.png";
import BannerImage from "../../Assets/chatbot2.png";
import Navbar from "./Navbar";
// import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div id='home' className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Your Expense Tracker & Assistant
          </h1>
          <p className="primary-text">
          Effortlessly manage expenses with our intuitive Expense Entry Assistance Tracker.
          Say goodbye to manual data entry hassles and simplify your financial record-keeping. <br/> <br/>
          Explore our user guide to know about our expense tracking chatbot and kickstart your journey towards financial organization.
          </p>
          {/* <button className="secondary-button">
            Order Now <FiArrowRight />{" "}
          </button> */}
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt=""/>
        </div>
      </div>
    </div>
  );
};

export default Home;