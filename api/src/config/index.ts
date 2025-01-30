import { config as conf } from 'dotenv';
conf();
const config = {
  host: process.env.HOST,
  port: process.env.PORT,
  production: process.env.PRODUCTION,
  jwtSecret: process.env.JWTSECRET,
};

export default config;
