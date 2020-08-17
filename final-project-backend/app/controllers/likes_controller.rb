class LikesController < ApplicationController

    def like
        like = Like.find_by(
            post_id: params[:postId],
            user_id: @current_user.id
        )
        if like
            like.destroy
            render json: {msg: "Unliked!"}
        else
            like = Like.create(
                post_id: params[:postId],
                user_id: @current_user.id
            )
            if like.valid?
                render json: like
            else
                render json: {error: like.error.full_messages}
            end
        end
    end
end
