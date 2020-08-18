import React, {useState, useEffect} from 'react'
import {Button, CardBox, ProfileImage, UserEditForm, DeleteButton} from './CustomStyles'
import styled from 'styled-components'

const ProfileCard = props => {
    
    const [user, setUser] = useState({})

    useEffect(() => {
        setUser(props.user)
    }, [props.user])

    const handleInput = e => {
        const { name , value} = e.target
        setUser(prevUser => {
            return {...prevUser, [name]: value}
        })

    }

    const handleSaveChanges = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3001/users/${user.id}`, {
            credentials: "include",
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: user.username, 
                location: user.location,
                img: user.img
            })
        })
        .then(res => res.json())
        .then(updatedUser => {
            props.updateCurrentUser(updatedUser)
            alert("Your changes have been saved!")
        })
    }

    const handleDeleteUser = () => {
        fetch(`http://localhost:3001/users/${user.id}`, {
            credentials: "include",
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            props.updateCurrentUser(null)
        })
    }

    // const followerCount = () => {
    //     if(user.followers.length === 1) {
    //         return `1 Follower`
    //     } else if (user.followers.length < 1) {
    //          return `0 Followers`
    //     } else {
    //         return `${user.followers.length} Followers`
    //     }
    // }

    // const handleClick = (e, followingId) => {
    //     if(e.target.innerHTML === "Follow") {
    //         props.handleFollow(followingId, "follow")
    //         e.target.innerHTML = "Unfollow"
    //         setFollowToggle(true)
    //     } else {
    //         props.handleFollow(followingId, "unfollow")
    //         e.target.innerHTML = "Follow"
    //         setFollowToggle(false)
    //     }
    // }

    // const renderFollowButton = () => {
    //     if (props.currentUser) {
    //         let following = user.followers.filter(follower => {
    //                 return follower.id === props.currentUser.id
    //             })
    //         return following.length > 0 ? <button onClick={(event) => {handleClick(event, user.id)}}>Unfollow</button> : <button onClick={(event) => {handleClick(event, user.id)}}>Follow</button>
    //     }
    // }

    const renderImg = () => {
        if(user.img) {
            return user.img
        } else {
            return "https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder.jpg"
        }
    }

    const renderUserInfo = () => {
        if (props.currentUser) {
            if (props.currentUser.id === user.id) {
                return (
                    <CardBox>
                        <DeleteUser onClick={handleDeleteUser} primary={true}>Delete Account</DeleteUser>
                        <ProfileImage src={renderImg()} alt="profileImage"/>
                        <h1>{user.username}'s Profile</h1>
                        <UserEditForm onSubmit={handleSaveChanges}>
                            <label>Username: </label>
                            <input type="text" name="username" value={user.username} onChange={handleInput}/>
                            <label>Location: </label>
                            <input type="text" name="location" value={user.location} onChange={handleInput}/>
                            <label>Image: </label>
                            <input type="text" name="img" value={user.img} onChange={handleInput}/>
                            <Button primary={true} type="submit">Save Changes</Button>
                        </UserEditForm>
                    </CardBox>
                )
            } else {
                return (
                    <CardBox>
                        <ProfileImage src={renderImg()} alt="profileImage"/>
                        <h1>{user.username}'s Profile</h1>
                        <h2>Username: {user.username}</h2>
                        <h2>Location: {user.location}</h2>
                    </CardBox>
                )
            }
        } else {
            return (
                <CardBox>
                    <ProfileImage src={renderImg()} alt="profileImage"/>
                    <h1>{user.username}'s Profile</h1>
                    <h2>Username: {user.username}</h2>
                    <h2>Location: {user.location}</h2>
                </CardBox>
            )
        }
    }

    const renderPage = () => {
        if(props.userLoaded) {
            return (
                <CardBox>
                    {renderUserInfo()}
                </CardBox>
            )
        } else {
            return (
                <CardBox>
                    <h1>User not found!</h1>
                </CardBox>
            )
        }
    }

    return (
        <div>
            {renderPage()}
        </div>
    )
}

export default ProfileCard

const DeleteUser = styled(DeleteButton)`
    float: right;
    

`