class FollowsController < ApplicationController
    
    def follow
        follow = Follow.find_by(
            follower_id: params[:follower],
            followed_id: params[:following]
        )
        if follow
            render json: {msg: "User already followed!"}
        else
            follow = Follow.create(
                follower_id: params[:follower],
                followed_id: params[:following]
            )
            if follow.valid?
                followed_user = User.find_by(id: follow.followed_id)
                render json: followed_user
            else
                render json: {error: follow.error.full_messages}
            end
        end
    end

    def unfollow
        follow = Follow.find_by(
            follower_id: params[:follower],
            followed_id: params[:following]
        )
        if follow 
            if follow.destroy
                unfollowed_user = User.find_by(id: params[:following])
                render json: unfollowed_user
            end
        end
    end
end