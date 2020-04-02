import * as functions from 'firebase-functions';
import distanceCalc from 'geo-distance';
import { collections, urls } from '../../constants/constants';
import { firebase, emailService, twillioService } from '../../services/services';

const EMAIL_TEMPLATE_ID = 'notifySubscribersOnHelp';
const SMS_BODY_ID = 'notifySubscribersOnHelp';

export default functions.firestore
  .document('help-requests/{helpRequestId}')
  .onCreate(async (snap) => {

    const { geoDatabase } = firebase;
    const { coordinates, status, description } = snap.data().d;
    const { getUniqueURL } = urls;

    const emailHelpers = [];
    const smsHelpers = [];

    if (status !== 'started') {
      return null;
    }
    try {
      const helpGiversSnaphot = await geoDatabase.collection(collections.HELPGIVER_CONTACT).near({
        center: coordinates,
        radius: 30
      }).get();

      helpGiversSnaphot.forEach(givers => {
        const { notifyBySMS, ...giverObject } = givers.data();
        return notifyBySMS ? smsHelpers.push(giverObject) : emailHelpers.push(giverObject);

        /* const from = { lat: giverObject.coordinates.latitude, lon: giverObject.coordinates.longitude };
        const to = { lat: coordinates.latitude, lon: coordinates.longitude };
        const distance = distanceCalc.between(from, to);
        if (distance.human_readable() < giverObject.radius + 1) {
          helpGivers.push(giverObject);
        } */
      });

      const smsPromises = smsHelpers.map(subscriber => {
        const smsBody = twillioService.getVariables(
          subscriber.language, SMS_BODY_ID
        ).replace('{{helpRequestUrl}}', getUniqueURL(snap.id, 'help'));
        return twillioService.sendSms(subscriber.phoneNumber, smsBody);
      });

      const emailPromises = emailHelpers.map(subscriber => {
        const emailVariables = {
          ...emailService.getVariables(subscriber.language, EMAIL_TEMPLATE_ID),
          description,
          helpRequestUrl: getUniqueURL(snap.id, 'help')
        };
        return emailService.sendEmail({
          receiver: subscriber.email,
          templateId: emailService.templateIds[EMAIL_TEMPLATE_ID]
        }, emailVariables);
      });

      const allPromises = [...emailPromises];
      await Promise.all(allPromises.map(p => p.catch(e => e)));

      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  });
