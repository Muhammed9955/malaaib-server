const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server-express");
const checkAuth = require("../../util/check-auth");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");
const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");
const Post = require("../../models/Post");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      phone: user.phone,
      userImgUrl: user.userImgUrl,
      createdAt: user.createdAt,
    },
    SECRET_KEY,
    { expiresIn: "30d" }
  );
}

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find();
        // console.log({ users });
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getUser(_, { userId }) {
      try {
        console.log({userId})
        const user = await User.findById(userId);
        if (user) {
          return user;
        } else {
          throw new Error("User not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async login(_, { email, password }) {
      const { errors, valid } = validateLoginInput(email, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ email });

      if (!user) {
        errors.general = "المستخدم غير موجود ";
        // errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "البيانت خاطئة برجاء اعادة المحاولة مره اخري";
        // errors.general = "Wrong crendetials";
        throw new UserInputError("Wrong crendetials", { errors });
      }

      const token = generateToken(user);
      // console.log({user})
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword, phone } }
    ) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword,
        phone
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // TODO: Make sure user doesnt already exist
      const user = await User.findOne({ username });
      // if (user) {
      //   throw new UserInputError("Username is taken", {
      //     errors: {
      //       general: "This username is taken",
      //       // username: "This username is taken",
      //     },
      //   });
      // }
      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);
      let userImgUrl =
        "https://seasidevolleyball.com/Images/profile/profile.png";

      const newUser = new User({
        email,
        username,
        password,
        phone,
        userImgUrl,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    async updateUser(_, { username, phone, bio, userImgUrl }, context) {
      const user = checkAuth(context);
      // console.log({ user });
      // const { errors, valid } = validateLoginInput(email, password);

      // if (!valid) {
      //   throw new UserInputError("Errors", { errors });
      // }

      const updatedUser = User.findOneAndUpdate(
        { _id: user.id },
        { username, phone, bio, userImgUrl }
      );

      return updatedUser;
    },
  },
};
