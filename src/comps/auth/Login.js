import React, {useContext, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import http from "../plugins/http";
import MyContext from "../../context/MyContext";

const Login = () => {

    const [getError, setError] = useState(null)
    const {getUser, setUser} = useContext(MyContext)
    const nav = useNavigate()


    const ref = {
        username: useRef(),
        password: useRef(),
        pass2: useRef(),
    }

    function login(e) {
        e.preventDefault()
        const user = {
            username: ref.username.current.value,
            password: ref.password.current.value,
        }
        http.post(user, "login").then(res => {
            if (res.success) {
                setUser(res.userObj)
                nav("/profile")
            }
            else {
                setError(res.message)
            }
        })
    }
    return (
        <div className={"d-flex al-center j-center vh100"}>
            <div className={"form d-flex column al-center"}>
                <h1>Login</h1>
                <form onSubmit={login} className={"d-flex column"}>
                    <input type="text" placeholder={"Username"} ref={ref.username}/>
                    <input type="password" placeholder={"Password"} ref={ref.password}/>
                    {getError && <div style={{color: "red"}}>{getError}</div>}
                    <button type={"submit"}>Login</button>
                    <h3>New here? Click <span onClick={() => nav("/register")} style={{cursor: "pointer", color: "#f56722"}}>HERE</span> to register</h3>
                </form>
            </div>

        </div>
    );
};

export default Login;