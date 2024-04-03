import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginform.css";

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [password, setPassword] = useState("");
    const [popupStyle, setPopupStyle] = useState("hide");

    const handleLogin = async () => {
        try {
            const response = await fetch("http://127.0.0.1:7000/login", {
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
                navigate("/dashboard"); // Redirect to home page after successful login
            } else {
                setPopupStyle("login-popup");
                setTimeout(() => setPopupStyle("hide"), 3000);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const onSuccess = (response) => {
        alert("User signed in");
        console.log(response);
        navigate("/dashboard"); // Redirect to home page after successful login
    };

    const onFailure = (error) => {
        console.error("Google login failed:", error);
    };

    return (
        <div className="cover">
            <h1>Login</h1>
            <input
                className="input-login"
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className="input-login"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <div className="login-btn" onClick={handleLogin}>
                Login
            </div>

            <div className={popupStyle}>
                <h3>Login Failed</h3>
                <p>Username or password incorrect</p>
            </div>
        </div>
    );
};

export default LoginForm;