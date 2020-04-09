import { firebase } from '../services/services';

export default source => ({
  email: source.email,
  firstName: source.displayName || '',
  lastName: '',
  bio: '',
  reviews: [],
  avatar: source.photoURL || '',
  radius: 30,
  phoneNumber: source.phoneNumber || '',
  language: 'de',
  coordinates: firebase.getLocationEntry('0,0'),
  createdAt: new Date(),
  active: false,
  preferences: ['EMAIL'],
  uid: source.uid
});
