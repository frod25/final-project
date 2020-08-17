class UsersController < ApplicationController

    skip_before_action :authorized, only: [:show]

    def show
        user = User.find_by(id: params[:id])
        if user
            render json: user
        else
            render json: {errors: "User not found!"}
        end
    end

    def update
        @current_user.update(username: params[:username], location: params[:location], img: params[:img])
        render json: @current_user
    end

    def destroy
        @current_user.destroy
        render json: {msg: "Account Deleted"}
    end
end
