import logo from '../logo.svg';
import './site.scss';
import React, { useState, useRef } from 'react';


const Login = (props) => {
    const [loginFailed, setLoginFailed] = useState(false);

    var model = {
        UserName: useRef(),
        NickName: useRef(),
        Password: useRef(),
    }

    const login = (register) => {
        setLoginFailed(false);
        var http = new XMLHttpRequest();
        var params = `Register=${register}&NickName=${model.NickName.current.value}&Password=${model.Password.current.value}&UserName=${model.UserName.current.value}`;
        http.open('POST', `${window.location.origin}/api/Queues`, true);

        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function () {//Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                var clientId = Number(http.responseText);
                if (clientId > 0) {
                    //document.cookie=`ClientId=${clientId}`;
                    sessionStorage.setItem("clientId", clientId);
                    props.history.push("queues");
                }
                else setLoginFailed(true);
            }
        }
        http.send(params);
    }

    return (
        <div className="App">
            <div className="title" >{props.isLogin != 0 ? "כניסה" : "הרשמה"}</div>
            <div className="container">
                <div className="flex">

                    <input className="base-input" ref={model.NickName} />
                    <div className="label">שם משתמש:</div>
                </div>
                {
                    props.isLogin == 0 ?
                        <div className="flex">

                            <input className="base-input" ref={model.UserName} />
                            <div className="label"> שם פרטי:</div>
                        </div> : ""
                }

                <div className="flex">

                    <input className="base-input" placeholder="סיסמה" type="password" ref={model.Password} />
                    <div className="label">סיסמא:</div>
                </div>
                <button onClick={props.isLogin ? () => login(0) : () => login(1)}>אשור</button>
                {loginFailed ? < div className="error"> שם או סיסמא לא נכונים</div> : ""}
                {props.isLogin ? <a href="register">לא רשום? הרשם</a> : <a href="login">רשום כבר? התחבר</a>}
            </div>
        </div>
    );
}

export default Login;


