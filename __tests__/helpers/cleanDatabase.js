import { firebase } from '../../src/services/services';

const deleteCollection = path => {
  const { database } = firebase;
  return database.collection(path).listDocuments().then(val => {
    val.map((doc) => {
      doc.delete();
    });
  });
};

export default deleteCollection;
