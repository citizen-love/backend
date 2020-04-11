
const assignEmail = (email) => email !== 'INVALID';

export default payload => ({
  title: payload.title,
  description: payload.description,
  country: 'CH',
  community: 'Not defined',
  location: `${payload.location.lat},${payload.location.lng}`,
  ...(assignEmail(payload.email) && { email: payload.email }),
  category: payload.category,
  language: payload.language,
  preferences: ['sms', assignEmail(payload.email) && 'email'].filter(p => p),
  source: 'sms',
  phone: payload.phoneNumber || ''
});
