import * as functions from 'firebase-functions';
import { collections } from '../../constants/constants';
import { firebase, slackService } from '../../services/services';
import { extendedHelpGiverModel } from '../../models/models';


export default functions.auth.user().onCreate(async (details) => {
  try {
    const { SUBSCRIBED_HELPERS } = collections;
    const { geoDatabase } = firebase;

    await geoDatabase.collection(SUBSCRIBED_HELPERS).doc(details.uid).set(extendedHelpGiverModel(details));
    await slackService.send(slackService.templates.signupAuth(details.email));
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
});
