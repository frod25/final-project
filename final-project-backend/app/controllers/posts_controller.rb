class PostsController < ApplicationController
    
    skip_before_action :authorized, only: [:index, :show]

    
    def index
        posts = Post.all
        render json: posts
    end
    
    def show
        post = Post.find_by(id: params[:id])
        if post
            render json: post
        else
            render json: {errors: "Post not found!"}
        end
    end
    
    def create
        post = Post.create(
            title: params[:title],
            body: params[:body],
            user_id: @current_user.id
        )
        if post.valid?
            render json: post
        else
            render json: {errors: post.errors.full_messages}, status: 400
        end
    end

    def update
        
    end

    def destroy
        
    end

    private

    def post_params
       params.require(:post).permit(:title, :body)
    end
end
