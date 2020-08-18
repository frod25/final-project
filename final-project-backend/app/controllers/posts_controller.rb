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
            render json: {error: "Post not found!"}
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
        post = Post.find_by(id: params[:id])
        if post
            post.update(title: params[:title], body: params[:body])
            render json: post
        else
            render json: {error: "Post Not Found!"}
        end
    end

    def destroy
        post = Post.find_by(id: params[:id])
        post.destroy
        render json: {msg: "Post Deleted!"}
    end

    private

    def post_params
       params.require(:post).permit(:title, :body)
    end
end
