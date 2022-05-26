const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

Comment.hasOne(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { Post, User, Comment };
