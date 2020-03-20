import { body, param } from 'express-validator';
import { collections } from '../../constants/constants';
import { firebase, fbOps, emailService } from '../../services/services';
import { validateSchema } from '../../utils/utils';

const EMAIL_TEMPLATE_ID = 'helpNotification';

const validations = [
  param('helpRequestId')
    .exists()
    .isString(),
  body('offerBody')
    .exists()
    .isString(),
  validateSchema
];

const handler = async (
  { body: { offerBody }, params: { helpRequestId } },
  res
) => {
  const { database, incrementField } = firebase;
  try {

    const contactDetails = await fbOps.getQuery(
      database.collection(collections.REQUESTER_CONTACT),
      { condition: 'helpRequestId', operator: '==', value: helpRequestId }
    );

    if (contactDetails[0]) {

      const { language } = await fbOps.get(
        database.collection(collections.HELP_REQUEST).doc(helpRequestId)
      );

      const emailVariables = {
        ...emailService.getVariables(language, EMAIL_TEMPLATE_ID),
        offerBody
      };

      await emailService.sendEmail({
        receiver: contactDetails[0].email,
        templateId: emailService.templateIds[EMAIL_TEMPLATE_ID]
      }, emailVariables);
      await fbOps.update(
        database.collection(collections.HELP_REQUEST).doc(helpRequestId),
        { counter: incrementField(1) }
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
