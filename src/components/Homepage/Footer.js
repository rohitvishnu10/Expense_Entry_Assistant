import React from "react";
import Logo from "../../Assets/Logo.png";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container">
          <img src={Logo} alt="" />
        </div>
        <div className="footer-icons">
          <BsTwitter />
          <SiLinkedin />
          <BsYoutube />
          <FaFacebookF />
        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
        <span><a href="/" style={{color: "hsl(217, 12%, 63%)"}}>Home</a></span>
        <span><a href="/#about" style={{color: "hsl(217, 12%, 63%)"}}>About</a></span>
        <span><a href="/#userGuide" style={{color: "hsl(217, 12%, 63%)"}}>User Guide</a></span>
        <span><a href="/#feedback" style={{color: "hsl(217, 12%, 63%)"}}>Feedback</a></span>
        </div>
        <div className="footer-section-columns">
          <span><a href="https://www.amrita.edu" target="_blank" style={{color: "hsl(217, 12%, 63%)"}}>Contact Us</a></span>
          <span><a href="/adminlogin" style={{color: "hsl(217, 12%, 63%)"}}>Admin login</a></span>
          <span><a href="/login" style={{color: "hsl(217, 12%, 63%)"}}>User login</a></span>
        </div>
        <div className="footer-section-columns">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;