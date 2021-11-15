import React, { useState } from "react"
import { Link } from 'react-router-dom'
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import http from "@utils/http"

import "./signUp.sass"


const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatedPassword, setRepeatedPassword] = useState("")
    const [message, setMessage] = useState("")
    
    const isValid = password != repeatedPassword

    const signUp = (email, password) => {
        console.log('email', email)
        console.log('password', password)

        http.post('/auth/signup/', {'email': email, 'password': password })
            .then(response => {
                response.status == 201 && setMessage(response.data.message)
                console.log(response)
            })
            .catch(error => {
                console.log(error.response.data.message)
                setMessage(error.response.data.message)
            })   
    }


    return (
        <div id="sign-up-page">
            <div>Sign up</div>
            <div>
            <Input 
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    placeholder="enter e-mail" 
                    prefix={<UserOutlined />}
                />
                <Input.Password
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    placeholder="enter password"
                    prefix={<LockOutlined />}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} 
                    />
                <Input.Password
                    onChange={e => setRepeatedPassword(e.target.value)}
                    value={repeatedPassword}
                    placeholder="repeat password"
                    prefix={<LockOutlined />}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} 
                    />
                <Button disabled={isValid} onClick={() => signUp(email, password)}  type="primary" shape="round"size={'large'}>Sign up</Button>
                {message}
                <div>Already have an account? 
                    <Link to="/">Sign in</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp
