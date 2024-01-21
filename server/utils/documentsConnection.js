const documentsConnection = [];

function findConnection(documentName, username) {
  return documentsConnection.find((connection) => {
    return (
      connection.documentName === documentName &&
      connection.username === username
    );
  });
}

function addConnection(connection) {
  documentsConnection.push(connection);
}

function getUsersDocument(documentName) {
  return documentsConnection
    .filter((connection) => connection.documentName === documentName)
    .map((connection) => connection.username);
}

function removeConnection(documentName, username) {
  const index = documentsConnection.findIndex((connection) => {
    return (
      connection.documentName === documentName &&
      connection.username === username
    );
  });

  if (index !== -1) {
    documentsConnection.splice(index, 1);
  }
}
export { addConnection, getUsersDocument, removeConnection, findConnection };
