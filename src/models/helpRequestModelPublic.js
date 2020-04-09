import { firebase } from '../services/services';

export default source => ({
  title: source.title,
  description: source.description,
  country: source.country,
  language: source.language,
  community: source.community,
  coordinates: firebase.getLocationEntry(source.location),
  category: source.category,
  customCategory: source.customCategory || '',
  createdAt: new Date(),
  counter: 0,
  status: 'started',
  source: source.source || 'web',
  preferences: source.preferences || ['email']
});
