import * as functions from 'firebase-functions';


export default functions.database.ref('help-requests/{helpRequestId}').onCreate((change, context) => {
  console.log('database signature works, document has been created');
  console.log(change);
  console.log(context);
  return null;
});
