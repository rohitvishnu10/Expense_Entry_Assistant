import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginform.css";
//import { AdminLogin } from "./adminlogin.js";


const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [password, setPassword] = useState("");
    const [popupStyle, setPopupStyle] = useState("hide");

    const handleLogin = async () => {
        try {
            const response = await fetch("http://127.0.0.1:9000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.success) {
                console.log("Login successful");
                localStorage.setItem("username", username);
                navigate("/app"); // Redirect to home page after successful login
            } else {
                setPopupStyle("login-popup");
                setTimeout(() => setPopupStyle("hide"), 3000);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <div className="container">
        <div className="screen">
        <div className="screen__content">
            <form className="login">
            <h2 className="login__header">LOG IN</h2>

            <div className="login__field">
            <i className="login__icon fas fa-user"></i>
            <input className="login__input" type="text" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>

            <div className="login__field">
            <i className="login__icon fas fa-lock"></i>
            <input className="login__input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <button className="button login__submit" onClick={handleLogin}>
              <span className="button__text">Log In Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
            

            <div className={popupStyle}>
                <h3>Login Failed</h3>
                <p>Username or password incorrect</p>
            </div>
        </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
        </div>
        </div>
    );
};

export default LoginForm;