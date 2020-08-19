import React, {useState, useEffect} from 'react'
import {MainSection} from './CustomStyles'
import ProfileCard from './ProfileCard'
import FollowerCard from './FollowerCard'

const ProfileContainer = props => {

    const [user, setUser] = useState({})
    const [userLoaded, setUserLoaded] = useState(false)
    
    const updateUser = (updatedUser) => {
        setUser(updatedUser)
    }

    const fetchUser = (id) => {
        return fetch(`http://localhost:3001/users/${id}`)
        .then(r => r.json())
        .then(userObj => {
            if(!userObj.errors) {
                setUser(userObj)
                setUserLoaded(true)
            } else {
                console.log("user not loaded")
                setUserLoaded(false)
                setUser({})
            }
        })
    }

    useEffect(() => {
        let mounted = true
        if(mounted) {
            const id = props.match.params.id
            fetchUser(id)
        }
        return () => mounted = false
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userLoaded])
    
    return (
        <MainSection>
            <ProfileCard 
                {...props}
                user={user}
                userLoaded={userLoaded}
            />
            <FollowerCard 
                currentUser={props.currentUser}
                user={user}
                userLoaded={userLoaded}
                updateUser={updateUser}
                fetchUser={fetchUser}
            />
        </MainSection>
    )
}

export default ProfileContainer