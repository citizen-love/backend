import * as functions from 'firebase-functions';
import { collections, urls } from '../../constants/constants';
import { notifications } from '../../middlewares/middlewares';
import { firebase, emailService, twillioService } from '../../services/services';

const EMAIL_TEMPLATE_ID = 'notifySubscribersOnHelp';
const SMS_BODY_ID = 'notifySubscribersOnHelp';

export default functions.firestore
  .document('help-requests/{helpRequestId}')
  .onCreate(async (snap) => {

    const { geoDatabase } = firebase;
    const { coordinates, status, description } = snap.data().d;
    const { getUniqueURL } = urls;

    if (status !== 'started') {
      return null;
    }
    try {
      const helpGiversSnaphot = await geoDatabase.collection(collections.HELPGIVER_CONTACT).near({
        center: coordinates,
        radius: 30
      }).get();

      const emailRec = helpGiversSnaphot.map(givers => notifications.sendEmailFilter(givers.data())).filter(n => n);
      const smsRec = helpGiversSnaphot.map(givers => notifications.sendSmsFilter(givers.data())).filter(n => n);

      const smsPromises = smsRec.map(subscriber => {
        const smsBody = twillioService.getVariables(
          subscriber.language, SMS_BODY_ID
        ).replace('{{helpRequestUrl}}', getUniqueURL(snap.id, 'help'));
        return twillioService.sendSms(subscriber.phoneNumber, smsBody);
      });

      const emailPromises = emailRec.map(subscriber => {
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

      const allPromises = [...smsPromises, ...emailPromises];
      await Promise.all(allPromises.map(p => p.catch(e => e)));

      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  });
