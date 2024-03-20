import React, {useEffect, useState} from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import "./loginform.css"

const LoginForm = () => {
    const navigate = useNavigate();

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: "79474543031-tmjo35916ufn421ej3u1i2ljao2apr4s.apps.googleusercontent.com",
                scope: ""
            })
        }
        gapi.load('client: auth2', start)
    },[])

    const [popupStyle, showPopup] = useState("hide")

    const popup = () => {
        showPopup("login-popup")
        setTimeout(() => showPopup("hide"), 3000)
    }

    const onSuccess = (response) => {
        alert("User signed in")
        console.log(response)
        navigate("/home")
    }

    const onFailure = (error) => {
        alert("User sign in Failed")
        console.log(error)
        navigate("/home")
    }

    return (
        <div className="cover">
            <h1>Login</h1>
            <input class="input-login" type="text" placeholder="username" />
            <input class="input-login" type="password" placeholder="password" />

            <div className="login-btn" onClick={popup}>Login</div>

            <p className="text">Or login using</p>

            <div className="alt-login">
                <div className="facebook"></div>
                <div className="google">
                    <GoogleLogin className="blue"
                        clientId="79474543031-tmjo35916ufn421ej3u1i2ljao2apr4s.apps.googleusercontent.com"
                        buttonText=""
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={false} // alternative is true, which keeps the user signed in
                        icon={false}    // alt is true, and this puts the google logo on your button, but I don't like it
                        theme="dark"  // alternative is light, which is white
                    />
                </div>
            </div>

            <div className={popupStyle}>
                <h3>Login Failed</h3>
                <p>Username or password incorrect</p>
            </div>
            
        </div>
    )
}

export default LoginForm