class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :location, :img, :followers, :following

  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy

  has_many :received_follows, foreign_key: :followed_id, class_name: "Follow", dependent: :destroy
  has_many :followers, through: :received_follows, source: :follower
  has_many :given_follows, foreign_key: :follower_id, class_name: "Follow", dependent: :destroy
  has_many :following, through: :given_follows, source: :following

  has_many :messages, foreign_key: :recipient_id, class_name: "Message", dependent: :destroy
  has_many :sent_messages, foreign_key: :sender_id, class_name: "Message", dependent: :destroy
end
