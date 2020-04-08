export default payload => ({
  title: payload.title,
  description: payload.description,
  country: 'CH',
  community: 'Not defined',
  location: `${payload.location.lat},${payload.location.len}`,
  email: payload.email,
  category: payload.category,
  language: 'de',
  source: 'sms',
  phone: payload.phoneNumber || ''
});
