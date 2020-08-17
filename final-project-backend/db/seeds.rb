User.destroy_all
Follow.destroy_all
Post.destroy_all
Comment.destroy_all
Like.destroy_all
Message.destroy_all

ActiveRecord::Base.connection.reset_pk_sequence!('users')
ActiveRecord::Base.connection.reset_pk_sequence!('follows')
ActiveRecord::Base.connection.reset_pk_sequence!('posts')
ActiveRecord::Base.connection.reset_pk_sequence!('comments')
ActiveRecord::Base.connection.reset_pk_sequence!('likes')
ActiveRecord::Base.connection.reset_pk_sequence!('messages')

u1 = User.create(username: 'user1', password: '123', location: 'Queens', img: "https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder.jpg")
u2 = User.create(username: 'user2', password: '123', location: 'Brooklyn', img: "https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder.jpg")
u3 = User.create(username: 'user3', password: '123', location: 'Bronx', img: "https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder.jpg")
u4 = User.create(username: 'user4', password: '123', location: 'Manhattan', img: "https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder.jpg")
u5 = User.create(username: 'user5', password: '123', location: 'Staten Island', img: "https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder.jpg")

Follow.create(follower_id: u2.id, followed_id: u1.id)
Follow.create(follower_id: u3.id, followed_id: u1.id)
Follow.create(follower_id: u4.id, followed_id: u1.id)

Follow.create(follower_id: u1.id, followed_id: u2.id)
Follow.create(follower_id: u3.id, followed_id: u2.id)
Follow.create(follower_id: u4.id, followed_id: u2.id)

Follow.create(follower_id: u2.id, followed_id: u3.id)
Follow.create(follower_id: u1.id, followed_id: u3.id)
Follow.create(follower_id: u4.id, followed_id: u3.id)

Follow.create(follower_id: u2.id, followed_id: u4.id)
Follow.create(follower_id: u3.id, followed_id: u4.id)
Follow.create(follower_id: u1.id, followed_id: u4.id)

p1 = Post.create(
    title: "Lorem ipsum dolor sit amet", 
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla facilisi nullam vehicula ipsum a arcu. Mattis enim ut tellus elementum sagittis vitae. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Tortor consequat id porta nibh venenatis cras.Tortor consequat id porta nibh venenatis",
    user_id: u1.id
)
p2 = Post.create(
    title: "Lorem ipsum dolor sit amet", 
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla facilisi nullam vehicula ipsum a arcu. Mattis enim ut tellus elementum sagittis vitae. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Tortor consequat id porta nibh venenatis cras.Tortor consequat id porta nibh venenatis",
    user_id: u2.id
)
p3 = Post.create(
    title: "Lorem ipsum dolor sit amet", 
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla facilisi nullam vehicula ipsum a arcu. Mattis enim ut tellus elementum sagittis vitae. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Tortor consequat id porta nibh venenatis cras.Tortor consequat id porta nibh venenatis",
    user_id: u3.id
)
p4 = Post.create(
    title: "Lorem ipsum dolor sit amet", 
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla facilisi nullam vehicula ipsum a arcu. Mattis enim ut tellus elementum sagittis vitae. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Tortor consequat id porta nibh venenatis cras.Tortor consequat id porta nibh venenatis",
    user_id: u4.id
)
p5 = Post.create(
    title: "Lorem ipsum dolor sit amet", 
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla facilisi nullam vehicula ipsum a arcu. Mattis enim ut tellus elementum sagittis vitae. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Tortor consequat id porta nibh venenatis cras.Tortor consequat id porta nibh venenatis",
    user_id: u5.id
)

Comment.create(message: "Lorem ipsum dolor sit amet", post_id: p1.id, user_id: u3.id)
Comment.create(message: "Lorem ipsum dolor sit amet", post_id: p1.id, user_id: u5.id)
Comment.create(message: "Lorem ipsum dolor sit amet", post_id: p3.id, user_id: u2.id)
Comment.create(message: "Lorem ipsum dolor sit amet", post_id: p3.id, user_id: u4.id)
Comment.create(message: "Lorem ipsum dolor sit amet", post_id: p5.id, user_id: u1.id)
Comment.create(message: "Lorem ipsum dolor sit amet", post_id: p5.id, user_id: u3.id)

Like.create(post_id: p1.id, user_id: u3.id)
Like.create(post_id: p1.id, user_id: u5.id)
Like.create(post_id: p3.id, user_id: u2.id)
Like.create(post_id: p3.id, user_id: u4.id)
Like.create(post_id: p5.id, user_id: u1.id)
Like.create(post_id: p5.id, user_id: u3.id)

Message.create(body: "Lorem ipsum dolor sit amet", sender_id: p1.id, recipient_id: u3.id)
Message.create(body: "Lorem ipsum dolor sit amet", sender_id: p1.id, recipient_id: u5.id)
Message.create(body: "Lorem ipsum dolor sit amet", sender_id: p3.id, recipient_id: u2.id)
Message.create(body: "Lorem ipsum dolor sit amet", sender_id: p3.id, recipient_id: u4.id)
Message.create(body: "Lorem ipsum dolor sit amet", sender_id: p5.id, recipient_id: u1.id)
Message.create(body: "Lorem ipsum dolor sit amet", sender_id: p5.id, recipient_id: u3.id)

puts 'Seeded!'