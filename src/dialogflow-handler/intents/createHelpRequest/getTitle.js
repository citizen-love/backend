const NAME = 'Default Welcome Intent';


const intent = agent => async ({
  context, query, session
}) => {
  console.log(context);
  console.log(query);
  console.log(session);
  return agent.add('Hi this is citizen.love, we will help You to create a help request. What do You need help of?');
};


export default {
  name: NAME,
  intent
};
