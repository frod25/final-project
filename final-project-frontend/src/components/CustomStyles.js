import styled from 'styled-components'

const black = "#000000ff"
// const platinum = "#e5e5e5ff"
const oxfordBlue = "#14213dff"
const orangeWeb = "#fca311ff"
const white = "#ffffffff"
const darkerOrange = "#845301"

export const Button = styled.button`
    background-color: ${props => props.primary ? orangeWeb : "Transparent"};
    color: ${props => props.primary ? oxfordBlue : orangeWeb};
    font-size: 1em;
    padding: 0.25em 1em;
    margin: 0.25em;
    border: 2px solid ${orangeWeb};
    border-radius: 2px;
    text-align: center;
    // font-weight: bold;

    &:hover {
        background-color: ${darkerOrange};
        color: ${oxfordBlue};
    }

    &:focus {
        outline: none;
        background-color: ${darkerOrange};
    }

    ${props => props.right ? "float: right;" : null}
    ${props => props.left ? "float: left;" : null}
`

export const MainSection = styled.section`
    background: ${oxfordBlue};
    postion: relative;
    display: inline-block;
    width: 60%;
    height: auto;
    margin: 1.5em;
    padding: 0.8em;

    h1 {
        text-align:center;
        color: ${white};
    }
`
export const NavBarContainer = styled.nav`
    background: ${oxfordBlue};
    position: relative;
    height: 1em;
    padding: 1em;
    padding-bottom: 25px;
    overflow: hidden;
    text-align:center;
    
    h2 {
        display: inline-block;
        margin-top: 0;
        color: ${white};
    }
    
    button {
        margin-top: 0;
    }
`
export const RightSideDiv = styled.div`
    float: right;
`
export const CardBox = styled.div`
    position: relative;
    background-color: ${white};
    border: none;
    border-radius: 3px;
    margin: 1em auto 1em auto;
    padding: 0.2em 1em;
    height: auto;
    width: 90%;

    a {
        color: ${orangeWeb};
    }

    a:hover {
        color: ${darkerOrange};
    }

    h1 {
        color: ${black};
    }
`
export const StyledForm = styled.form`
    background-color: ${oxfordBlue};
    position: relative;
    color: ${white};
    text-align: center;
    width: 45%;
    height 300px;
    padding: 1em;
    margin: auto;
    margin-top: 1em;
    border-radius: 3px;

    h1 {
        color: ${orangeWeb};
    }

    label {
        display: block;
    }

    input {
        display: block;
        width: 60%;
        height: 40px;
        margin: 1em auto;
        text-align: center;
        border: 2px solid ${orangeWeb};
        border-radius: 2px;
        background-color: Transparent;
        color: ${orangeWeb}
    }

    input:hover {
        border: 2px solid ${darkerOrange};
    }
    
    input:active {
        border: 2px solid ${darkerOrange};
    }
    
    input:focus {
        border: 2px solid ${darkerOrange};
        outline: none;
    }

    input::placeholder {
        color: ${orangeWeb};
        text-align: center;
    }
`
export const ProfileImage = styled.img`
    border: 1px solid ${orangeWeb};
    border-radius: 4px;
    padding: 5px;
    width: 25%;
    height: 25%;
    display:block;
    margin: auto;
`
export const UserEditForm = styled.form`
    position: relative;
    color: ${oxfordBlue};
    text-align: center;
    padding: 1em;
    width: 85%;
    margin: 1em auto;
    border-radius: 3px;

    h1 {
        color: ${orangeWeb};
    }

    label {
        display: block;
    }

    input {
        display: block;
        width: 60%;
        height: 40px;
        margin: 1em auto;
        text-align: center;
        border: 2px solid ${orangeWeb};
        border-radius: 2px;
        background-color: Transparent;
        color: ${orangeWeb}
    }

    input:hover {
        border: 2px solid ${darkerOrange};
    }

    input:active {
        border: 2px solid ${darkerOrange};
    }

    input:focus {
        border: 2px solid ${darkerOrange};
        outline: none;
    }

    input::placeholder {
        color: ${orangeWeb};
        text-align: center;
    }
`
export const DeleteButton = styled(Button)`
    background-color: red;
    color: ${white};
    border: 2px solid red;
`
export const CommentForm = styled(UserEditForm)`
    position: relative;
    width: 90%;
    margin: 1em auto 1em auto;

    input {
        width: 100%;
    }
`
export const EditPostForm = styled(UserEditForm)`
    position: relative;
    width: 90%;
    margin: 1em auto 1em auto;

    label {
        width: 100%;
    }

    input {
        width: 100%;
    }
`
export const DeleteUserButton = styled(DeleteButton)`
    margin-left: 38%;
    margin-right: 38%;
`
export const FollowerCardBox = styled(CardBox)`
    display:flex
`
export const FollowDiv = styled.div`
    flex: 1;
    position: relative;
    width: 100%
    height: auto;
    margin: 1em 1em;
    border: 2px solid #fca311ff;
    text-align: center;
    color: #fca311ff;
`
export const FollowButton = styled(Button)`
    display: block;
    position: relative;
    margin-top: 1em;
    height: 5em;
    width: 6em;
`
export const LikeButton = styled(Button)`
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
export const LikeLabel = styled.p`
    float: right;
    margin: 0.5em -1.5em;
    font-weight: bold;
    color: #fca311ff;
`

export const CommentButton = styled(Button)`
    padding: 0.5em;
`
export const EditButton = styled(Button)`
    padding: 0.5em;
`
export const CommentDeleteButton = styled(DeleteButton)`
    padding: 0.2em 0.2em 0.2em 0.2em;
    height: 2%;
    width: auto;
    margin-left: 0.5em;
    text-align: center;
    background: transparent;
    color: red;
    border: none;
`
export const ProfileCardBox = styled(CardBox)`
    text-align: center;
`
export const FollowerButton = styled.button`
    color: ${orangeWeb}
`