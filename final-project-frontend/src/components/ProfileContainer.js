import React, {useState, useEffect} from 'react'
import {MainSection} from './CustomStyles'
import ProfileCard from './ProfileCard'
import FollowerCard from './FollowerCard'

const ProfileContainer = props => {

    const [user, setUser] = useState({})
    const [userLoaded, setUserLoaded] = useState(false)
    // const [followToggle, setFollowToggle] = useState(null)

    useEffect(() => {
        let mounted = true
        const id = props.match.params.id
        if(mounted) {
            fetch(`http://localhost:3001/users/${id}`)
            .then(r => r.json())
            .then(userObj => {
                if(!userObj.errors){
                    setUser(userObj)
                    setUserLoaded(true)
                } else {
                    setUserLoaded(false)
                    setUser({})
                }
            })
        }
        mounted = false
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderFollowerCard = () => {
        if (props.currentUser) {
            return <FollowerCard {...props}/>
        }
    }
    
    return (
        <MainSection>
            <ProfileCard 
                {...props}
                user={user}
                userLoaded={userLoaded}
            />
            {renderFollowerCard()}
        </MainSection>
    )
}

export default ProfileContainer