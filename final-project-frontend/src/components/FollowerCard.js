import React, {useState, useEffect} from 'react'
import {FollowerCardBox, FollowDiv, FollowButton, FollowerLink} from './CustomStyles'

const FollowerCard = props => {

    const [user, setUser] = useState({})
    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)
    
    useEffect(() => {
        setUser(props.user)
    }, [props.user])

    const renderFollowerCard = () => {
        if(props.userLoaded) {
            return (
                <FollowerCardBox>
                    <FollowDiv>
                        <h2>{followerCount()}</h2>
                    </FollowDiv>
                    <FollowDiv>
                        <h2>{user.following.length} Following</h2>
                    </FollowDiv>
                    {renderFollowButton()}
                </FollowerCardBox>
            )
        } else {
            return (
                <FollowerCardBox>
                    <h1>User not found!</h1>
                </FollowerCardBox>
            )
        }
    }

    // const renderFollowers = () => {
    //     if(showFollowers) {
    //         if(user.followers.length > 0) {
    //             user.followers.map(follower => {
    //                 return (
    //                     <div key={follower.id}>
    //                         <FollowerLink href="#" onClick={props.fetchUser(follower.id)}>{follower.username}</FollowerLink>
    //                     </div>
    //                 )
    //             })
    //         } else {
    //             return <div>No followers</div>
    //         }
    //     }
    // }
    
    // const renderFollowing = () => {

    // }

    const followerCount = () => {
        if(user.followers.length === 1) {
            return `1 Follower`
        } else {
            return `${user.followers.length} Followers`
        }
    }

    const handleClick = (e, followingId) => {
        if(e.target.innerHTML === "Follow") {
            handleFollow(followingId, "follow")
            e.target.innerHTML = "Unfollow"
        } else {
            handleFollow(followingId, "unfollow")
            e.target.innerHTML = "Follow"
        }
    }

    const handleFollow = (followingId, action) => {
        fetch("http://localhost:3001/" + action, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                follower: props.currentUser.id,
                following: followingId
            })
        })
        .then(res => res.json())
        .then(followedUser => {
            props.updateUser(followedUser)
        })
    }

    const renderFollowButton = () => {
        if(props.currentUser) {
            if(props.currentUser.id !== user.id ) {
                let following = user.followers.filter(follower => {
                    return follower.id === props.currentUser.id
                })
            return following.length > 0 ? <FollowButton primary={true} onClick={(event) => {handleClick(event, user.id)}}>Unfollow</FollowButton> : <FollowButton primary={true} onClick={(event) => {handleClick(event, user.id)}}>Follow</FollowButton>
            }
        }
    }

    return (renderFollowerCard())
}

export default FollowerCard