import React from 'react'
import {MainSection} from './CustomStyles'
import PostCard from './PostCard'

const PostContainer = props => {

    const renderPosts = () => {
        let liked = false
        return props.posts.map(post => {
            if (props.currentUser) {
                if(post.likes.length !== 0) {
                    let alreadyLiked = post.likes.filter(like => like.user.id === props.currentUser.id)
                    alreadyLiked.length > 0 ? liked = true : liked = false
                }
            }
            return (
                <PostCard key={post.id} post={post} currentUser={props.currentUser} alreadyLiked={liked}/>
            )
        })
    }
    
    return (
        <MainSection>
            <h1>Posts</h1>
            {renderPosts()}
        </MainSection>
    )
}

export default PostContainer