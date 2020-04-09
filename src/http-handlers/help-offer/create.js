import { body, param } from 'express-validator';
import { collections } from '../../constants/constants';
import { firebase, fbOps, emailService, twillioService } from '../../services/services';
import { validateSchema } from '../../utils/utils';

const EMAIL_TEMPLATE_ID = 'helpNotification';
const SMS_BODY_ID = 'helpNotification';

const validations = [
  param('helpRequestId')
    .exists()
    .isString(),
  body('offerBody')
    .exists()
    .isString(),
  body('email').exists().isEmail(),
  body('phone').optional(),
  validateSchema
];

const handler = async (
  { body: {
    offerBody, email, phone = ''
  }, params: { helpRequestId } },
  res
) => {
  const { database, incrementField } = firebase;
  try {

    const contactDetails = await fbOps.getQuery(
      database.collection(collections.REQUESTER_CONTACT),
      { condition: 'id', operator: '==', value: helpRequestId }
    );

    if (contactDetails[0]) {

      const { language, preferences } = await fbOps.get(
        database.collection(collections.HELP_REQUEST).doc(helpRequestId), true
      );

      const emailVariables = {
        ...emailService.getVariables(language, EMAIL_TEMPLATE_ID),
        offerBody: `${offerBody}. ${email}, ${phone}`
      };

      if (preferences.includes('email')) {
        await emailService.sendEmail({
          receiver: contactDetails[0].email,
          templateId: emailService.templateIds[EMAIL_TEMPLATE_ID]
        }, emailVariables);
      }
      if (preferences.includes('sms')) {
        const smsBody = twillioService.getVariables(language, SMS_BODY_ID);
        await twillioService.sendSms(contactDetails[0].phoneNumber,
          `${smsBody} ${offerBody}. ${email}, ${phone}`);
      }
      await fbOps.update(
        database.collection(collections.HELP_REQUEST).doc(helpRequestId),
        { 'd.counter': incrementField(1) }
      );
      return res.status(200).send({
        helpRequestId,
        offerBody
      });
    }
    return res.status(404).send(' ');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Unexpected Error Happened');
  }
};

export default [...validations, handler];
