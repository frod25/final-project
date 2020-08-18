class LikesController < ApplicationController

    def like
        like = Like.find_by(
            post_id: params[:postId],
            user_id: @current_user.id
        )
        if like
            like.destroy
            post = Post.find_by(id: params[:postId])
            render json: post
        else
            like = Like.create(
                post_id: params[:postId],
                user_id: @current_user.id
            )
            if like.valid?
                post = Post.find_by(id: like.post.id)
                render json: post
            else
                render json: {error: like.error.full_messages}
            end
        end
    end
end
