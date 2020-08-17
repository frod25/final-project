import React, { useState, useEffect } from 'react'
import {Button, CardBox} from './CustomStyles'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const PostCard = props => {

    const [liked, setLiked] = useState(false)

    const handleLike = () => {
        fetch('http://localhost:3001/like', {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({postId: props.post.id})
        })
        .then(res => res.json())
        .then(response => console.log(response))
        setLiked(!liked)
    }

    const renderLikeButton = () => {
        if(liked) {
            return (
                <LikeButton onClick={handleLike}><span role="img" aria-label="Like">❤️</span></LikeButton>
            )
        } else {
            return (            
                <LikeButton onClick={handleLike}><span role="img" aria-label="Like">♡</span></LikeButton>
            )
        }

    }

    useEffect(() => {
        setLiked(props.alreadyLiked)
    }, [props.alreadyLiked])
    
    return (
        <CardBox>
                <h2>{props.post.title}</h2>
                <h5>postedBy: <NavLink to={`/user/${props.post.user.id}`}>{props.post.user.username}</NavLink></h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla facilisi nullam vehicula ipsum a arcu. Mattis enim ut tellus elementum sagittis vitae. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Tortor consequat id porta nibh venenatis cras.Tortor consequat id porta nibh venenatis</p>
                {/* <Button primary={true}>Edit</Button> */}
                {renderLikeButton()}
        </CardBox>
    )
}

export default PostCard

const LikeButton = styled(Button)`
    border: none;
    float: right;
    font-size: 1.5em;
    margin-top: 0;
    padding-top: 0;
    
    &:hover {
        background-color: Transparent;
        color: #14213dff;
    }

    &:focus {
        outline: none;
        background-color: Transparent;
    }
`