import { usersCollection } from "./dbConnect.js";

function registerUser({ user, password }) {
  return usersCollection.insertOne({ user, password });
}

export { registerUser };
