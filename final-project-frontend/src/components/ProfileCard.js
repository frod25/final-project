import React, {useState, useEffect} from 'react'
import {Button, CardBox, ProfileImage, UserEditForm, DeleteUserButton, ProfileCardBox} from './CustomStyles'

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
        if(window.confirm("Are you sure?")) {
            fetch(`http://localhost:3001/users/${user.id}`, {
                credentials: "include",
                method: "DELETE",
                headers: {"Content-Type": "application/json"}
            })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                props.updateCurrentUser(null)
                alert("Your account has been deleted!")
        })}
    }

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
                        <DeleteUserButton onClick={handleDeleteUser} primary={true}>Delete Account</DeleteUserButton>
                    </CardBox>
                )
            } else {
                return (
                    <ProfileCardBox>
                        <ProfileImage src={renderImg()} alt="profileImage"/>
                        <h1>{user.username}'s Profile</h1>
                        <h3>Username: </h3> <p>{user.username}</p>
                        <h3>Location: </h3> <p>{user.location}</p>
                    </ProfileCardBox>
                )
            }
        } else {
            return (
                <ProfileCardBox>
                    <ProfileImage src={renderImg()} alt="profileImage"/>
                    <h1>{user.username}'s Profile</h1>
                    <h3>Username: </h3> <p>{user.username}</p>
                    <h3>Location: </h3> <p>{user.location}</p>
                </ProfileCardBox>
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

    return (renderPage())
}

export default ProfileCard