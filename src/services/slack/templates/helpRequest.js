const template = ({
  country,
  category,
  source = '',
  customCategory,
  helpRequestUrl,
  title,
  description }) => ({
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `Mesa called Jar Jar Binks, mesa your humble servant! We got a help request coming in ${country}.`
      }
    },
    {
      type: 'divider'
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `*Source:* ${source}`
        }
      ]
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `*Categories:* ${JSON.stringify(category)} - ${JSON.stringify(customCategory)}`
        }
      ]
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `*Title:* ${title}`
        }
      ]
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `*Description:* ${description}`
        }
      ]
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `*HelpRequestLink:* ${helpRequestUrl}`
        }
      ]
    }
  ]
});

export default template;
