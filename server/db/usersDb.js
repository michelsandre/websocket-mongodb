import createHashAndSalt from "../utils/createHashAndSalt.js";
import { usersCollection } from "./dbConnect.js";

function registerUser({ user, password }) {
  const { saltPass, hashPass } = createHashAndSalt(password);

  return usersCollection.insertOne({ user, hashPass, saltPass });
}

function findUser(user) {
  return usersCollection.findOne({ user });
}
export { registerUser, findUser };
