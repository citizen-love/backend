export default {
  LOCAL: 'local',
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  ENVIRONMENT: process.env.APPLIED_ENV || 'development'
};
