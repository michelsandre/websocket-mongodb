import "dotenv/config";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DB_CONNECTION);

let documentsCollection, usersCollection;

try {
  await client.connect();
  const db = client.db("alura-websockets");

  documentsCollection = db.collection("documents");
  usersCollection = db.collection("users");

  console.log("Data base connected");
} catch (error) {
  console.log(error);
}

export { documentsCollection, usersCollection };
