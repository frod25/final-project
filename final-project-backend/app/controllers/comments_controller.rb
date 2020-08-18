class CommentsController < ApplicationController

    def create
        comment = Comment.create(
            message: params[:message],
            post_id: params[:postId],
            user_id: @current_user.id
        )
        if comment.valid?
            post = Post.find_by(id: params[:postId])
            render json: post
        else
            render json: {errors: comment.errors.full_messages}, status: 400
        end
    end

    def destroy
        comment = Comment.find_by(id: params[:id])
        post_id = comment.post.id
        if comment.destroy 
            post = Post.find_by(id: post_id)
            render json: post
        else
            render json: {error: "Comment Not Deleted!"}
        end
    end
end
