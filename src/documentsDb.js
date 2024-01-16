import { documentsCollection } from "./dbConnect.js";

function findDocument(name) {
  const document = documentsCollection.findOne({ name: name });
  return document;
}

function updateDocument(name, text) {
  const update = documentsCollection.updateOne(
    { name: name },
    { $set: { text: text } }
  );

  return update;
}

export { findDocument, updateDocument };
