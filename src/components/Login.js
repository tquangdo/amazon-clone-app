import React, { useState } from 'react'
import './Login.css'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../utils/config/firebase'

function Login() {
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onLogin = event => {
        event.preventDefault() // stops the default refreshing
        auth
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                history.push('/')
            })
            .catch(e => alert(e.message))
    }

    const onRegister = (event) => {
        event.preventDefault()
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                history.push('/')

            })
            .catch(e => alert(e.message))
    }

    return (
        <div className="login">
            <Link to='/'>
                <img
                    className="login__logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                    alt=""
                />
            </Link>
            <div className="login__container">
                <h1>Login</h1>
                <form>
                    <h5>E-mail</h5>
                    <input value={email} onChange={event => setEmail(event.target.value)} type="email" />
                    <h5>Password</h5>
                    <input value={password} onChange={event => setPassword(event.target.value)} type="password" />
                    <button onClick={onLogin} type="submit" className="login__signInButton">Login</button>
                </form>
                <p>
                    Tôi đồng ý với [Amazon's Conditions of Use and Privacy Notice].
                </p>
                <button onClick={onRegister} className="login__registerButton">Tạo tài khoản Amazon mới</button>
            </div>
        </div>
    )
}

export default Login
