const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { withFilter } = require("apollo-server-express");
const PlayGround = require("../../models/PlayGround");
const checkAuth = require("../../util/check-auth");
const { validatePlayGroundInput } = require("../../util/validators");

module.exports = {
  Query: {
    async getPlaygrounds(_, { limit, skip }) {
      try {
        const playgrounds = await PlayGround.find()
          .sort({ createdAt: -1 })
          .limit(limit)
          .skip(skip)
          .exec();
        // console.log({ playgrounds });
        return playgrounds;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPlayground(_, { playgroundId }) {
      try {
        const playGround = await PlayGround.findById(playgroundId);
        if (playGround) {
          return playGround;
        } else {
          throw new Error("PlayGround not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPlayGround(
      _,
      {
        playGroundInput: {
          name,
          city,
          location,
          price,
          contactNumber,
          amenities,
          avaliable_hours_start,
          avaliable_hours_end,
          playground_Images,
        },
      },
      context
      //   { playGroundInput: data },context
    ) {
      //   console.log({ data });
      const user = checkAuth(context);
      //   console.log({ user });

      // validate playGround data inputs
      const { valid, errors } = validatePlayGroundInput(
        name,
        city,
        location,
        price,
        contactNumber,
        amenities,
        avaliable_hours_start,
        avaliable_hours_end,
        playground_Images
      );
      console.log({ valid });
      console.log({ errors });
      // if (!valid) {
      //   throw new UserInputError("Errors", { errors });
      // }
      const newPlayGround = new PlayGround({
        name,
        city,
        location,
        price,
        contactNumber,
        amenities,
        avaliable_hours_start,
        avaliable_hours_end,
        playground_Images,
        owner: user.username,
        ownerId: user.id,
        ownerPhone: user.phone,
        ownerImgUrl: user.userImgUrl,
        ownerCreatedAt: user.createdAt,
        createdAt: new Date().toISOString(),
      });
      const playGroundRes = await newPlayGround.save();
      return playGroundRes;
    },
    async updatePlayGround(_, { updateInput: data, playgroundId }, context) {
      const user = checkAuth(context);
      //   console.log({ user });
      // console.log(data);
      console.log(playgroundId);

      // validate playGround data inputs
      // const { valid, errors } = validatePlayGroundInput(
      //   name,
      //   location,
      //   price,
      //   contactNumber,
      //   amenities,
      //   avaliable_hours_start,
      //   avaliable_hours_end,
      //   playground_Images
      // );
      // console.log({ valid });
      // console.log({ errors });
      // if (!valid) {
      //   throw new UserInputError("Errors", { errors });
      // }
      // PlayGround.updateOne({ _id: playgroundId }, data);
      const playground = PlayGround.findOneAndUpdate(
        { _id: playgroundId },
        data
      );

      // const newPlayground = await PlayGround.findById(playgroundId);
      // console.log({ newPlayground });
      return playground;
    },
    async deletePlayGround(_, { playgroundId }, context) {
      const user = checkAuth(context);
      console.log({ user });
      console.log({ playgroundId });
      try {
        const playground = await PlayGround.findById(playgroundId);
        console.log({ playground });
        if (user.id === playground.ownerId.toString()) {
          await playground.delete();
          return "PlayGround deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    // async likePost(_, { postId }, context) {
    //   const { username } = checkAuth(context);

    //   const post = await Post.findById(postId);
    //   if (post) {
    //     if (post.likes.find((like) => like.username === username)) {
    //       // Post already likes, unlike it
    //       post.likes = post.likes.filter((like) => like.username !== username);
    //     } else {
    //       // Not liked, like post
    //       post.likes.push({
    //         username,
    //         createdAt: new Date().toISOString(),
    //       });
    //     }

    //     await post.save();
    //     return post;
    //   } else throw new UserInputError("Post not found");
    // },
  },
  //   Subscription: {
  //     newPost: {
  //       subscribe: async (root, args, { pubsub }) => {
  //         return pubsub.asyncIterator("NEW_POST");
  //       },
  //     },
  //   },
  // Subscription: {
  //   newPost: {
  //     subscribe: withFilter(
  //       (root, args, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
  //       async (payload, variables) => {
  //         const newPost = payload.payload;
  //         console.log({ payload });

  //         return payload.newPost.username !== payload.user.username;
  //       }
  //     ),
  //   },
  // },
};
