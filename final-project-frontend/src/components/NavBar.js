import React from 'react'
import {Button, NavBarContainer, RightSideDiv} from './CustomStyles'
import { NavLink } from 'react-router-dom'

const NavBar = props => {

    const renderNav = () => {
        if(props.currentUser) {
            return (
                <NavBarContainer>
                    <NavLink to="/"><Button left={true}>Home</Button></NavLink>
                    <h2>Welcome {props.currentUser.username}</h2>
                    <RightSideDiv>
                        <NavLink to="/new-post"><Button>New Post</Button></NavLink>
                        <NavLink to={`/user/${props.currentUser.id}`}><Button>Profile</Button></NavLink>
                        <Button onClick={props.handleLogout}>Logout</Button>
                    </RightSideDiv>
                </NavBarContainer>
            )
        } else {
            return (
                <NavBarContainer>
                    <NavLink to="/"><Button left={true}>Home</Button></NavLink>
                    <h2>Welcome</h2>
                    <RightSideDiv>
                        <NavLink to="/login"><Button>Login</Button></NavLink>
                        <NavLink to="/register"><Button>Register</Button></NavLink>
                    </RightSideDiv>
                </NavBarContainer>
            )
        }
    }
    
    return renderNav()
}

export default NavBar