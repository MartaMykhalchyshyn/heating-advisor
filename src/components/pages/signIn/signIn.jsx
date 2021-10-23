import React, { useState } from "react"
import { Link, useHistory } from 'react-router-dom'
import { Input, Button } from 'antd'
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import axios from "axios"

import "./signIn.sass"


const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [message, setMessage] = useState("")
    const history = useHistory()
    

    const post = (email, password) => {
        const url = 'https://calories-tracker-api-server.herokuapp.com/api/v1/auth/signin/'
        const body = {'email': email, 'password': password}

        const headers =  {
            "Content-Type": "application/json",
            "Content-Lenght": 1111,
            "Host": "asfqwefqwe",
            "Access-Control-Allow-Origin": '*',
        }
        return axios.post(url, body, { headers })
    }

    const signIn = (email, password) => {
        console.log('email', email)
        console.log('password', password)

        post(email, password)
            .then(response => {
                response.status == 200 && setMessage(response.data.message) 
                history.push('/home')
                console.log(response.data.data.access_token)
                window.localStorage.setItem('access_token', response.data.data.access_token)
                window.localStorage.setItem('access_token_exp', response.data.data.access_token_exp)
                window.localStorage.setItem('refresh_access_token', response.data.data.refresh_access_token)
                window.localStorage.setItem('refresh_access_token_exp', response.data.data.refresh_access_token_exp)
            })
            .catch(error => {
                console.log(error.response)
                console.log(error.response.data.message)
                setMessage(error.response.data.message)
            })      
    }


    return (
        <div id="sign-in-page">
            <div>Sign in</div>
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
                <Button onClick={() => signIn(email, password)} type="primary" shape="round"size={'large'}>Sign in</Button>
                {message}
                <div>Don’t have an account?
                    <Link to="/signup">Sign up</Link>
                </div>
        </div>
    )
}

export default SignIn
