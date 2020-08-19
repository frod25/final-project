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
                <PostCard
                    {...props} 
                    key={post.id} 
                    post={post} 
                    alreadyLiked={liked} 
                />
            )
        })
    }

    const loadingPosts = () => {
        if(props.posts.length > 0) {
            return renderPosts()
        } else {
            return <h1>Loading Posts...</h1>
        }
    }

    return (
        <MainSection>
            <h1>Posts</h1>
            {loadingPosts()}
        </MainSection>
    )
}

export default PostContainer