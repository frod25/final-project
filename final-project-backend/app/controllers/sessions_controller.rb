class SessionsController < ApplicationController

    skip_before_action :authorized, only: [:register, :login]

    def register
        user = User.create(
            username: params[:username],
            password: params[:password]
            )
        if user.valid?
            session[:user_id] = user.id
            render json: user
        else
            render json: {errors: user.errors.full_messages}, status: 400
        end
    end

    def login
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user
        else
            render json: {error: "Username not found!"}
        end
    end
    
    def autologin
        render json: @current_user
    end

    def logout
        session.delete(:user_id)
        render json: {message: "Logged Out!"}
    end
end