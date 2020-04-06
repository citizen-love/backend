

const projectId = 'Place your dialogflow projectId here';
const phoneNumber = "Place your twilio phone number here";
const accountSid = 'Place your accountSid here';
const authToken = 'Place your authToken here';

const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const sessionClient = new dialogflowSessionClient(projectId);



const integrationHandler = (req, res) => {
  const body = req.body;
  const text = body.Body;
  const id = body.From;
  const dialogflowResponse = await sessionClient.detectIntent(
      text, id, body).fulfillmentText;
  const twiml = new  MessagingResponse();
  const message = twiml.message(dialogflowResponse);
  res.send(twiml.toString());
};


export default integrationHandler;
