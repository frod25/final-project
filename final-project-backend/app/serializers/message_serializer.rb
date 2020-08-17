class MessageSerializer < ActiveModel::Serializer
  attributes :id, :body, :sender_id, :recipient_id
end
