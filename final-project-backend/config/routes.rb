Rails.application.routes.draw do
  resources :messages, only: [:create, :show, :update, :destroy]
  resources :comments, only: [:create, :index, :update, :destroy]
  resources :posts, only: [:create, :index, :show, :update, :destroy]
  resources :users, only: [:show, :update, :destroy]

  post "/register", to: "sessions#register"
  post "/login", to: "sessions#login"
  get "/autologin", to: "sessions#autologin"
  get "/logout", to: "sessions#logout"
  
  post "/follow", to: "follows#follow"
  post "/unfollow", to: "follows#unfollow"

  post "/like", to: "likes#like"
  post "/dislike", to: "likes#dislike"
end
