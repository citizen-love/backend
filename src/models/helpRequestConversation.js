import moment from 'moment';

export default phoneNumber => ({
  stage: 'get-title',
  createdAt: new Date(),
  expires: moment().add(15, 'minutes').toDate(),
  phoneNumber
});
