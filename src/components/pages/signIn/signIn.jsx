import React, { useState } from "react"
import { Link, useHistory } from 'react-router-dom'
import { Input, Button } from 'antd'
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import http from "@utils/http"

import "./signIn.sass"


const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [message, setMessage] = useState("")
    const history = useHistory()

    const signIn = (email, password) => {
        console.log('email', email)
        console.log('password', password)

        http.post('/auth/signin/', {'email': email, 'password': password })
            .then(response => {
                response.status == 200 && setMessage(response.data.message) 
                history.push('/home')
                console.log(response.data.data.access_token)
                window.localStorage.setItem('user-email', email)
                window.localStorage.setItem('access_token', response.data.data.access_token)
                window.localStorage.setItem('access_token_exp', response.data.data.access_token_exp)
                window.localStorage.setItem('refresh_access_token', response.data.data.refresh_access_token)
                window.localStorage.setItem('refresh_access_token_exp', response.data.data.refresh_access_token_exp)
            })
            .catch(error => {
                console.log(error.response.data.message)
                setMessage(error.response.data.message)
            })      
    }

    return (
        <div className="sign-in-page">
            <div className="sign-in-page-header">Sign in</div>
            <div className="sign-in-page-label">E-mail</div>
            <Input 
                onChange={e => setEmail(e.target.value)}
                value={email}
                placeholder="enter e-mail" 
                prefix={<UserOutlined />}
                className="sign-in-page-item"
                style={{height: '50px', fontSize: '20px'}}
            />
            <div className="sign-in-page-label">Password</div>
            <Input.Password
                onChange={e => setPassword(e.target.value)}
                value={password}
                placeholder="enter password"
                prefix={<LockOutlined />}
                className="sign-in-page-item"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} 
                style={{height: '50px', fontSize: '20px'}}
            />
            <Button 
                onClick={() => signIn(email, password)} 
                type="primary" 
                size={'large'}
                style={{width: '350px', fontSize: '25px', height: '50px'}}
                >
                Sign in
            </Button>
            {message}
            <div className="sign-up-page-line"></div>
            <div className="sign-in-page-link">Don’t have an account?
                <Link to="/signup" style={{marginLeft: '10px'}}>Sign up</Link>
            </div>
        </div>
    )
}

export default SignIn
