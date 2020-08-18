import React, {useState, useEffect} from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import PostContainer from './PostContainer'
import NavBar from './NavBar'
import Login from './Login'
import Register from './Register'
import ProfileContainer from './ProfileContainer'
import NewPost from './NewPost'

const MainPage = props => {
    const [currentUser, setCurrentUser] = useState(null)
    const [posts, setPosts] = useState([])
    
    const fetchPosts = () => {
        let reversedPosts = []
        return fetch('http://localhost:3001/posts', {
            credentials: "include"
        })
        .then(res => res.json())
        .then(postArray => {
            reversedPosts = [...postArray].reverse()
            setPosts(reversedPosts)
        })
    }

    const updatePost = (updatedPost) => {
        const newPostArray = posts.map(post => post.id === updatedPost.id ? updatedPost : post)
        setPosts(newPostArray)
    }

    const removePost = (deletedPost) => {
        const newPostArray = posts.filter(post => post.id !== deletedPost.id)
        setPosts(newPostArray)
    }

    const renderNewPost = (newPost) => {
        setPosts(prevPosts => [newPost, ...prevPosts])
        props.history.push(`/`)
    }
    
    const autoLogin = () => {
        fetch('http://localhost:3001/autologin', {
          credentials: "include"
        })
        .then(res => {
          if(res.ok) {
            return res.json()
          } else {
            throw Error("Not logged in!")
          }
        })
        .then(userObj => handleLogin(userObj))
        .catch(err => console.log(err))
        
    }
    
    const handleLogin = (user) => {
        setCurrentUser(user)
        props.history.push(`/`)
    }
    
    const handleLogout = () => {
        fetch("http://localhost:3001/logout", {
            credentials: "include"
        })
        .then(res => res.json())
        .then((msg) => {
            console.log(msg)
            setCurrentUser(null)
            props.history.push(`/`)
        })
      }
    
    const handleFollow = (followingId, action) => {
        fetch("http://localhost:3001/" + action, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                follower: currentUser.id,
                following: followingId
            })
        })
        .then(res => res.json())
        .then(follow => console.log(follow))
    }
    
    const updateCurrentUser = (updatedUser) => {
        setCurrentUser(updatedUser)
        if(updatedUser === null) {
            props.history.push(`/`)
        } else {
            props.history.push(`/user/${updatedUser.id}`)
        }
    }
    
    useEffect(() => {
        let mounted = true
        if(mounted) {
          autoLogin()
          fetchPosts()
        }
        mounted = false
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        <NavBar currentUser={currentUser} handleLogout={handleLogout}/>
        <Switch>
            <Route path="/user/:id" render={(routeProps) => (
            <ProfileContainer 
                {...routeProps}
                currentUser={currentUser}
                handleFollow={handleFollow}
                updateCurrentUser={updateCurrentUser}
            />
            )}/>
            <Route path="/login">
                <Login handleLogin={handleLogin}/>
            </Route>
            <Route path="/register">
                <Register handleLogin={handleLogin}/>
            </Route>
            <Route path="/new-post">
                <NewPost renderNewPost={renderNewPost}/>
            </Route>
            <Route path="/">
                <PostContainer 
                    posts={posts} 
                    currentUser={currentUser} 
                    updatePost={updatePost}
                    removePost={removePost}
                />
            </Route>
        </Switch>
        </>
    )
}

export default withRouter(MainPage)