class CommentSerializer < ActiveModel::Serializer
  attributes :id, :message
  has_one :post
  has_one :user
end
