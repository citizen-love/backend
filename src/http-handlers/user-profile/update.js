/* eslint-disable no-restricted-globals */
import { body as bodyVal } from 'express-validator';

import { validateSchema } from '../../utils/utils';
import { collections } from '../../constants/constants';
import { firebase, fbOps } from '../../services/services';
import { extendedHelpGiverUpdate } from '../../models/models';

const ALLOWED_LANGUAGES = ['en', 'de', 'fr', 'it', 'rm'];
const ALLOWED_PREFERENCES = ['EMAIL', 'SMS'];

const validations = [
  bodyVal('email').not().exists(),
  bodyVal('uid').not().exists(),
  bodyVal('reviews').not().exists(),
  bodyVal('createdAt').not().exists(),
  bodyVal('firstName').optional().isString(),
  bodyVal('lastName').optional().isString(),
  bodyVal('bio').optional().isString(),
  bodyVal('avatar').optional().isString(),
  bodyVal('radius').optional().isNumeric(),
  bodyVal('phoneNumber').optional().isString(),
  bodyVal('language').optional().custom(val => ALLOWED_LANGUAGES.includes(val)),
  bodyVal('coordinates').optional().isLatLong(),
  bodyVal('active').optional().isBoolean(),
  bodyVal('preferences').optional().custom(val => val.every(pref => ALLOWED_PREFERENCES.includes(pref))),
  validateSchema
];

const handler = async ({ body }, res) => {
  const { geoDatabase } = firebase;


  try {
    const profileReference = geoDatabase.collection(collections.SUBSCRIBED_HELPERS).doc(res.locals.uid);
    const profileUpdate = extendedHelpGiverUpdate(body);
    await fbOps.update(profileReference, profileUpdate);
    return res.status(200).send(profileUpdate);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Unexpected Error Happened');

  }

};

export default [...validations, handler];
