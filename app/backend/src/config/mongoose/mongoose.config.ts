import { registerAs } from '@nestjs/config';

export default registerAs('mongoose', () => ({
  uri: process.env.MONGODB_URI || 'mongodb://root:root@127.0.0.1:27018/jobify?authSource=admin',
  user: process.env.MONGODB_USER || 'root',
  password: process.env.MONGODB_PASSWORD || 'root',
  host: process.env.MONGODB_HOST || '127.0.0.1',
  port: process.env.MONGODB_PORT || '27018',
  database: process.env.MONGODB_DATABASE || 'jobify',
  authSource: process.env.MONGODB_AUTHSOURCE || 'admin',
}));
