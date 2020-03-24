import * as functions from 'firebase-functions';
import { collections } from '../../constants/constants';
import { firebase, emailService } from '../../services/services';

const EMAIL_TEMPLATE_ID = 'notifySubscribersOnHelp';
const getUniqueURL = hash => `https://citizen.love/help-requests/${hash}`;

export default functions.firestore
  .document('help-requests/{helpRequestId}')
  .onCreate(async (snap) => {

    const { geoDatabase } = firebase;
    const { coordinates, status, description } = snap.data().d;

    const helpGivers = [];

    if (status !== 'started') {
      return null;
    }
    try {
      const helpGiversSnaphot = await geoDatabase.collection(collections.HELPGIVER_CONTACT).near({
        center: coordinates,
        radius: 200
      }).get();

      helpGiversSnaphot.forEach(givers => {
        helpGivers.push(givers.data());
      });

      const emailPromises = helpGivers.map(subscriber => {
        const emailVariables = {
          ...emailService.getVariables(subscriber.language, EMAIL_TEMPLATE_ID),
          description,
          helpRequestUrl: getUniqueURL(snap.id)
        };
        return emailService.sendEmail({
          receiver: subscriber.email,
          templateId: emailService.templateIds[EMAIL_TEMPLATE_ID]
        }, emailVariables);
      });

      await Promise.all(emailPromises.map(p => p.catch(e => e)));

      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  });
