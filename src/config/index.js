import dotenv from 'dotenv';

dotenv.config();

const common = {
  NODE_ENV: process.env.NODE_ENV,
};

const config = Object.freeze({
  test: {
    ...common,
    PORT: process.env.TEST_PORT,
    DATABASE_URL: process.env.TEST_DATABASE_URL,
  },
  local: {
    ...common,
    PORT: process.env.LOCAL_PORT,
    DATABASE_URL: process.env.LOCAL_DATABASE_URL,
  },
  production: {
    ...common,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.PRODUCTION_DATABASE_URL,
  },
});

export default config[process.env.NODE_ENV];
