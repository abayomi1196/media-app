import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server";

import User from "../../models/User.js";

import {
  validateRegisterInput,
  validateLoginInput,
} from "../../utils/validators.js";

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
}

export default {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, isValid } = validateLoginInput(username, password);

      if (!isValid) {
        throw new UserInputError("User Input Error", { errors });
      }

      // check if user exists
      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found.", { errors });
      }

      // check if passwords match
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials.", { errors });
      }

      // at this point, user is succesfully validated
      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      // Validate user input
      const { isValid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!isValid) {
        throw new UserInputError("User Input Error", { errors });
      }

      // check if user already exists
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      // hash password and create auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
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
  },
};
