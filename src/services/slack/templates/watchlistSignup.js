
const template = (email) => ({
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `Hmm... yousa point is well seen. Dis way, hurry! New signup for the local watchlist: ${email}`
      }
    }
  ]
});


export default template;
