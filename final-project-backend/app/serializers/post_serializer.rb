class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body
  
  has_one :user

  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
end
