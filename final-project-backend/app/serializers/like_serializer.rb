class LikeSerializer < ActiveModel::Serializer
  attributes :id, :post, :user
  has_one :post
  has_one :user
end
