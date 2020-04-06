import { firebase } from '../services/services';

export default source => ({
  email: source.email,
  radius: source.radius || 30,
  phoneNumber: source.phoneNumber || '',
  language: source.language,
  coordinates: firebase.getLocationEntry(source.location),
  createdAt: new Date(),
  active: true,
  preferences: source.preferences || ['EMAIL'],
  uid: source.uid
});
