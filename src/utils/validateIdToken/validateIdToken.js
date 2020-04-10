import { firebase } from '../../services/services';

const validate = async ({ headers }, res, next) => {
  const { auth } = firebase;

  if (!headers['x-auth-token']) {
    return res.status(422).send('Invalid user');
  }
  try {
    const { uid } = await auth.verifyIdToken(headers['x-auth-token']);
    res.locals.uid = uid;
    return next();
  } catch (e) {
    return res.status(403).send('Invalid user');
  }
};

export default validate;
