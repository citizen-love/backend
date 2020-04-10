export const get = async (ref, geoDocument = false) => {
  const snapshot = await ref.get();
  const data = snapshot.data();

  if (!data) {
    return null;
  }
  return geoDocument ? data.d : data;
};

export const getQuery = async (ref, { condition, operator, value }, geoDocument = false) => {
  const data = [];
  const snapshot = await ref.where(condition, operator, value);
  await snapshot.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      data.push(geoDocument ? doc.data().d : doc.data());
    });
  });
  return data;
};

export const update = (ref, details) => ref.update(details);

export const create = (ref, details) => ref.set(details);

export const deleteDoc = (ref) => ref.delete();


export default {
  get, getQuery, update, create, deleteDoc
};
