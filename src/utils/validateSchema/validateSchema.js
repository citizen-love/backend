import { validationResult } from 'express-validator';


const validate = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (e) {
    return res.status(422).send('Invalid request');
  }
};

export default validate;
