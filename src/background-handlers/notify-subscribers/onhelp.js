import * as functions from 'firebase-functions';
import distanceCalc from 'geo-distance';
import { collections, urls } from '../../constants/constants';
import { firebase, emailService } from '../../services/services';

const EMAIL_TEMPLATE_ID = 'notifySubscribersOnHelp';

export default functions.firestore
  .document('help-requests/{helpRequestId}')
  .onCreate(async (snap) => {

    const { geoDatabase } = firebase;
    const { coordinates, status, description } = snap.data().d;
    const { getUniqueURL } = urls;

    const helpGivers = [];

    if (status !== 'started') {
      return null;
    }
    try {
      const helpGiversSnaphot = await geoDatabase.collection(collections.HELPGIVER_CONTACT).near({
        center: coordinates,
        radius: 30
      }).get();

      helpGiversSnaphot.forEach(givers => {
        const giverObject = givers.data();

        const from = { lat: giverObject.coordinates.latitude, lon: giverObject.coordinates.longitude };
        const to = { lat: coordinates.latitude, lon: coordinates.longitude };
        const distance = distanceCalc.between(from, to);
        if (distance.human_readable() < giverObject.radius + 1) {
          helpGivers.push(giverObject);
        }
      });

      await slackService.send(slackService.templates.nearbyHelpers({
        nearby: helpGiversSnaphot.length,
        sent: helpGivers.length,
        helpRequest: getUniqueURL(snap.id, 'help')
      }));

      const emailPromises = helpGivers.map(subscriber => {
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

      await Promise.all(emailPromises.map(p => p.catch(e => e)));

      return null;
    } catch (e) {
      return null;
    }
  });
