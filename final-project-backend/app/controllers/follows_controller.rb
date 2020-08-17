class FollowsController < ApplicationController
    
    def follow
        follow = Follow.find_by(
            follower_id: params[:follower],
            followed_user_id: params[:following]
        )
        if follow
            render json: {msg: "User already followed!"}
        else
            follow = Follow.create(
                follower_id: params[:follower],
                followed_user_id: params[:following]
            )
            if follow.valid?
                render json: follow
            else
                render json: {error: follow.error.full_messages}
            end
        end
    end

    def unfollow
        follow = Follow.find_by(
            follower_id: params[:follower],
            followed_user_id: params[:following]
        )
        if follow 
            follow.destroy
            render json: {msg: "Unfollowed"}
        end
    end
end