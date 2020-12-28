const postsResolvers = require("./posts");
const usersResolvers = require("./users");
const commentsResolvers = require("./comments");
const playGroundResolvers = require("./playGround");
const reservationsResolvers = require("./reservations");

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...postsResolvers.Query,
    ...usersResolvers.Query,
    ...playGroundResolvers.Query,
    ...reservationsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...playGroundResolvers.Mutation,
    ...reservationsResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  },
};
