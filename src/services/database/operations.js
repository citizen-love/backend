export const get = async ref => {
  const snapshot = await ref.get();
  const data = snapshot.data();

  if (!data) {
    return null;
  }
  return data;
};

export const getQuery = async (ref, { condition, operator, value }) => {
  const data = [];
  const snapshot = await ref.where(condition, operator, value);
  await snapshot.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      data.push(doc.data());
    });
  });
  return data;
};

export const update = (ref, details) => ref.update(details);

export const create = (ref, details) => ref.set(details);


export default {
  get, getQuery, update, create
};
