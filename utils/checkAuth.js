import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";

export default function (context) {
  // context = {..., req: {headers}}
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    // Bearer ... Token
    const token = authHeader.split("Bearer ")[1];

    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }

    throw new Error('Authentication token must be "Bearer [token]"');
  }

  throw new Error("Authorization header must be provided");
}
