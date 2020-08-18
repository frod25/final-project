class CommentSerializer < ActiveModel::Serializer
  attributes :id, :message, :user
  has_one :post
  has_one :user
end
