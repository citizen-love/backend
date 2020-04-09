
const template = (email, profile) => ({
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `AUTH SIGNUP: ${email}`
      }
    }/* , {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: ':selfie: :camera_with_flash: :call_me_hand:'
      },
      accessory: {
        type: 'image',
        image_url: profile,
        alt_text: 'profile picture'
      }
    } */
  ]
});


export default template;
