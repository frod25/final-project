import React, { useState, useEffect } from 'react'
import {Button, CardBox, CommentForm, DeleteButton, EditPostForm, LikeButton, LikeLabel, CommentButton, CommentDeleteButton, EditButton} from './CustomStyles'
import { NavLink } from 'react-router-dom'

const PostCard = props => {

    const [liked, setLiked] = useState(false)
    const [post, setPost] = useState(null)
    const [showComments, setShowComments] = useState(false)
    const [newComment, setNewComment] = useState("")
    const [showEditForm, setShowEditForm] = useState(false)

    const handleLike = () => {
        fetch('http://localhost:3001/like', {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({postId: post.id})
        })
        .then(res => res.json())
        .then(response => {
            setLiked(!liked)
            props.updatePost(response)
        })
        
    }

    const handleCommentInput = (e) => {
        setNewComment(e.target.value)
    }

    const handlePostInput = (e) => {
        const { name , value} = e.target
        setPost(prevPost => {
            return {...prevPost, [name]: value}
        })
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:3001/comments", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: newComment,
                postId: post.id
            })
        })
        .then(res => res.json())
        .then(updatedPost => {
            props.updatePost(updatedPost)
            setNewComment("")
        
        })
    }

    const handleSaveChanges = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3001/posts/${post.id}`, {
            credentials: "include",
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title: post.title, 
                body: post.body,
                postId: post.id
            })
        })
        .then(res => res.json())
        .then(updatedPost => {
            props.updatePost(updatedPost)
            toggleEditForm()
        })
    }

    const handleDeletePost = () => {
        fetch(`http://localhost:3001/posts/${post.id}`, {
            credentials: "include",
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            props.removePost(post)
        })
    }

    const handleDeleteComment = (comment) => {
        fetch(`http://localhost:3001/comments/${comment.id}`, {
            credentials: "include",
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(updatedPost => {
            console.log(updatedPost)
            props.updatePost(updatedPost)
        })
    }

    const renderLikeButton = () => {
        if(props.currentUser) {
            if(liked) {
                return (
                    <>
                    <LikeButton onClick={handleLike}><span role="img" aria-label="Like">❤️</span></LikeButton>
                    <LikeLabel>{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}</LikeLabel>
                    </>
                )
            } else {
                return (
                    <>            
                    <LikeButton onClick={handleLike}><span role="img" aria-label="Like">♡</span></LikeButton>
                    <LikeLabel>{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}</LikeLabel>
                    </>
                )
            }
        } else {
            return (
                <>
                    <LikeButton/>
                    <LikeLabel>{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}</LikeLabel>
                </>
            )
        }

    }

    const renderCommentForm = () => {
        if(props.currentUser) {
            return (
                <CommentForm onSubmit={handleCommentSubmit}>
                    <input type="text" name="newComment" value={newComment} placeholder="Enter Comment Here" onChange={handleCommentInput}/>
                    <Button primary={true} type="submit">Post Comment</Button>
                </CommentForm>
            )
        }
    }

    const renderCommentButton = () => {
        if(showComments) {
            return (<CommentButton primary={true} onClick={toggleComments}>Hide Comments</CommentButton>)
        } else {
            return (<CommentButton primary={true} onClick={toggleComments}>{post.comments.length} Comments</CommentButton>)
        }
    }

    const renderCommentDelete = (comment) => {
        if(props.currentUser) {
            if(props.currentUser.id === comment.user.id) {
                return (
                    <CommentDeleteButton onClick={() => {handleDeleteComment(comment)}}>X</CommentDeleteButton>
                )
            }
        } 
    }

    const renderComments = () => {
        const reversedComments = [...props.post.comments].reverse()
        if(showComments) {
            return (
                <>
                    {renderCommentForm()}
                    {
                        reversedComments.map(comment => {
                            return (
                                <div key={comment.id}>
                                    <NavLink to={`/user/${comment.user.id}`}><b>{comment.user.username}:</b></NavLink> {comment.message}
                                    {renderCommentDelete(comment)}
                                    <br/><br/>
                                </div>
                            )
                        })
                    }
                </>
            )
        }
    }

    const toggleComments = () => {
         setShowComments(!showComments)
    }

    const toggleEditForm = () => {
        setShowEditForm(!showEditForm)
    }

    const renderEditButton = () => {
        if(props.currentUser) {
            if(props.currentUser.id === post.user.id) {
                return (
                    <>
                    <EditButton onClick={toggleEditForm} primary={true}>Edit Post</EditButton>
                    <DeleteButton onClick={handleDeletePost} primary={true}>Delete</DeleteButton>
                    </>
                )
            }
        }
    }

    const renderCard = () => {
        if(post){
            if(showEditForm) {
                return (
                    <CardBox>
                        <EditPostForm onSubmit={handleSaveChanges}>
                            <label>Title: </label>
                            <input type="text" name="title" value={post.title} onChange={handlePostInput}/>
                            <label>Content: </label>
                            <input type="text" name="body" value={post.body} onChange={handlePostInput}/>
                            <Button primary={true} onClick={toggleEditForm}>Cancel</Button>
                            <Button primary={true} type="submit">Save Changes</Button>
                        </EditPostForm>
                    </CardBox>
                )
            } else {
                return (
                    <CardBox>
                            <h2>{post.title}</h2>
                            <h5>postedBy: <NavLink to={`/user/${post.user.id}`}>{post.user.username}</NavLink></h5>
                            <p>{post.body}</p>
                            {renderLikeButton()}
                            {renderCommentButton()}
                            {renderEditButton()}
                            {renderComments()}
                    </CardBox>
                )
            }
        } else {
            return null
        }
    }

    useEffect(() => {
        setLiked(props.alreadyLiked)
        setPost(props.post)
    }, [props.alreadyLiked, props.post])

    return renderCard()
}

export default PostCard