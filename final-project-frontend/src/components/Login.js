import React, {useState} from 'react'
import {StyledForm, Button} from './CustomStyles'

const Login = props => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleStateChange = (e) => {
        e.target.name === "username" ? setUsername(e.target.value) : setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:3001/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        })
        .then(res => res.json())
        .then(user => props.handleLogin(user))
    }
    
    return (
        <div>
            <StyledForm onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input type="text" name="username" autoComplete="off" placeholder="👤  Username" value={username} onChange={handleStateChange}/>
                <input type="password" name="password" autoComplete="off" placeholder="🔒  Password" value={password} onChange={handleStateChange}/>
                <Button primary={true} type="submit">Login</Button>
            </StyledForm>
        </div>    
    )
}

export default Login