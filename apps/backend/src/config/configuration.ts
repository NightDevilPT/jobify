export default () => ({
  mongodb: {
    uri: process.env.MONGODB_URI,
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
    host: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT,
    database: process.env.MONGODB_DATABASE,
    authSource: process.env.MONGODB_AUTHSOURCE,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN ?? '3600', 10),
  },
  email: {
    user: process.env.GMAIL_USER,
    password: process.env.GMAIL_PASSWORD,
    provider: process.env.EMAIL_PROVIDER,
    from: process.env.DEFAULT_FROM_EMAIL,
  },
  app: {
    env: process.env.NODE_ENV,
    isRedis: process.env.IS_REDIS === 'true',
  },
});
