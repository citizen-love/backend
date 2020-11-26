import { firebase } from '../services/services';

export default source => ({
  ...!!source.firstName && { firstName: source.firstName },
  ...!!source.lastName && { lastName: source.lastName },
  ...!!source.bio && { bio: source.bio },
  ...!!source.avatar && { avatar: source.avatar },
  ...!!source.radius && { radius: source.radius },
  ...!!source.phoneNumber && { phoneNumber: source.phoneNumber },
  ...!!source.language && { language: source.language },
  ...!!source.coordinates && { coordinates: firebase.getLocationEntry(source.coordinates) },
  ...!!source.active && { active: source.active },
  ...!!source.preferences && { preferences: source.preferences },
  updatedAt: new Date()
});
