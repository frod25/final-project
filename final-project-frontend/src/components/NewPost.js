import React, {useState} from 'react'
import {StyledForm, Button} from './CustomStyles'

const NewPost = props => {
    const [post, setPost] = useState({})

    const handleStateChange = (e) => {
        const { name , value} = e.target
        setPost(prevPost => {
            return {...prevPost, [name]: value}})
        }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:3001/posts", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
        .then(res => res.json())
        .then(post => props.renderNewPost(post))
    }

    return (
        <div>
            <StyledForm onSubmit={handleSubmit}>
                <h1>Create a New Post</h1>
                <input type="text" name="title" placeholder="Title" onChange={handleStateChange}/>
                <input type="text-area" name="body" placeholder="Contents" onChange={handleStateChange}/>
                <Button primary={true} type="submit">Post</Button>
            </StyledForm>
        </div>    
    )
}

export default NewPost