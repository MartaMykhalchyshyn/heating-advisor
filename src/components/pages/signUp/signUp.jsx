import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Input, Button } from "antd"
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons"
import http from "@utils/http"

import "./signUp.sass"


const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatedPassword, setRepeatedPassword] = useState("")
    const [message, setMessage] = useState("")

    const isValid = password !== repeatedPassword

    const signUp = (email, password) => {
        http.post("/auth/signup/", { "email": email, "password": password })
            .then(response => {
                response.status === 201 && setMessage(response.data.message)
                console.log(response)
            })
            .catch(error => {
                console.log(error.response.data.message)
                setMessage(error.response.data.message)
            })
    }

    return (
        <div className="sign-up-page">
            <div className="sign-up-page-header">Sign up</div>
            <div className="sign-up-page-label">E-mail</div>
            <Input
                onChange={e => setEmail(e.target.value)}
                value={email}
                placeholder="enter e-mail"
                prefix={<UserOutlined />}
                className="sign-up-page-item"
                style={{ height: "50px", fontSize: "20px" }}
            />
            <div className="sign-up-page-label">Password</div>
            <Input.Password
                onChange={e => setPassword(e.target.value)}
                value={password}
                placeholder="enter password"
                prefix={<LockOutlined />}
                className="sign-up-page-item"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                style={{ height: "50px", fontSize: "20px" }}
            />
            <div className="sign-up-page-label">Password</div>
            <Input.Password
                onChange={e => setRepeatedPassword(e.target.value)}
                value={repeatedPassword}
                placeholder="repeat password"
                prefix={<LockOutlined />}
                className="sign-up-page-item"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                style={{ height: "50px", fontSize: "20px" }}
            />
            <Button
                onClick={() => signUp(email, password)}
                disabled={isValid}
                type="primary"
                size={"large"}
                style={{ width: "350px", fontSize: "25px", height: "50px" }}
            >
                Sign up
            </Button>
            {message}
            <div className="sign-up-page-line"></div>
            <div className="sign-up-page-link">Already have an account?
                <Link to="/signin" style={{ marginLeft: "10px" }}>Sign in</Link>
            </div>
        </div>
    )
}

export default SignUp
