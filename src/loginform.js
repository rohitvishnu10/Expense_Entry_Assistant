import React,{useState} from "react"
import "./loginform.css"
import email_icon from "./Assets/email.png"
import password_icon from "./Assets/password.png"
import person_icon from "./Assets/person.png"
import { useNavigate } from "react-router-dom";


const Login=()=>{
    const [action,setAction] = useState("Login");
    const navigate = useNavigate();
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [password, setPassword] = useState("");
    const [popupStyle, setPopupStyle] = useState("hide");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async () => {

        if (!username || !password) {
            setErrorMessage("Please fill in both username and password fields.");
            return;
        } else{
            setErrorMessage("");
        }

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
                setErrorMessage("Login failed. Please check your username or password.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="login-container">
            <div className="logincontainer">
                <div className="loginheader">
                    <div className="text">{action}</div>
                        <div className="underline"></div>   
                </div>
                <div className="inputs">
                    <div className="input">
                        <img src={person_icon}/>
                        <input type="email" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="input">
                        <img src={password_icon}/>
                        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
                <div className="submit-container" onClick={handleLogin}>
                    <span className="submit">Login</span>
                </div>
                {/* <div className={popupStyle}>
                    <h3>Login Failed</h3>
                    <p>Username or password incorrect</p>
                </div> */}
            </div>
        </div>
    )
}
export default Login;