import { documentsCollection } from "./dbConnect.js";

function getDocuments() {
  const documents = documentsCollection.find().toArray();
  return documents;
}

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

function addDocument(name) {
  const result = documentsCollection.insertOne({
    name,
    text: "",
  });
  return result;
}

function deleteDocument(name) {
  const result = documentsCollection.deleteOne({
    name,
  });

  return result;
}

export {
  findDocument,
  updateDocument,
  getDocuments,
  addDocument,
  deleteDocument,
};
