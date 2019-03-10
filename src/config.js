/* eslint-disable no-process-env */

// Env vars should be casted to correct types
const config = {
  PORT: Number(process.env.PORT) || 9199,
  NODE_ENV: process.env.NODE_ENV,
  LOG_LEVEL: process.env.LOG_LEVEL,
  DEBUG_MODE: process.env.DEBUG_MODE,
  MONGODB_URL: process.env.MONGODB_URL || 'localhost:27017',
  MONGODB_NAME: process.env.MONGODB_NAME || 'scheduler',
  MONGODB_USERNAME: process.env.MONGODB_USERNAME,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD
};

module.exports = config;
