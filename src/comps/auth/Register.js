import React, {useRef, useState} from 'react';
import http from "../plugins/http";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [getError, setError] = useState(null)
    const nav = useNavigate()

    const ref = {
        username: useRef(),
        password: useRef(),
        pass2: useRef(),
    }

    function register(e) {
        e.preventDefault()

        const newUser = {
            username: ref.username.current.value,
            password: ref.password.current.value,
            pass2: ref.pass2.current.value
        }
        http.post(newUser, "register").then(res => {
            if (res.success) {
                nav("/login")
            }
            else {
                setError(res.message)
            }
        })
    }
    return (
        <div className={"d-flex al-center j-center vh100"}>
            <div className={"form d-flex column al-center"}>
                <h1>Register</h1>
                <form onSubmit={register} className={"d-flex column"}>
                    <input type="text" placeholder={"Username"} ref={ref.username}/>
                    <input type="password" placeholder={"Password"} ref={ref.password}/>
                    <input type="password" placeholder={"Repeat password"} ref={ref.pass2}/>
                    {getError && <div style={{color: "red"}}>{getError}</div>}
                    <button type="submit">Register</button>
                    <h3>Part of the community? Click <span onClick={() => nav("/login")} style={{cursor: "pointer", color: "#f56722"}}>HERE</span> to login</h3>
                </form>
            </div>


        </div>
    );
};

export default Register;