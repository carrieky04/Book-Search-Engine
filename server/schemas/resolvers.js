const { Book, User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, { _id, username }) => {
      const params = _id ? { _id } : {};
      return User.find(params);
    },
  },
  Mutation: {
    createUser: async (parent, { body }) => {
      const user = await User.create({ body });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new GraphQLError("No profile with this email found!", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new GraphQLError("Incorrect credentials", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { user, body }) => {
      return Book.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      );
    },
    deleteBook: async (parent, { user, params }) => {
      return Book.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: params.bookId } } },
        { new: true }
      );
    },
  },
};
 module.exports = resolvers;