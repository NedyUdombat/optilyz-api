import dotenv from "dotenv";

dotenv.config();

const common = {
  NODE_ENV: process.env.NODE_ENV,
};

const config = Object.freeze({
  test: {
    ...common,
    PORT: process.env.TEST_PORT,
  },
  local: {
    ...common,
    PORT: process.env.LOCAL_PORT,
  },
  development: {
    ...common,
    PORT: process.env.PORT || process.env.DEV_PORT,
  },
  staging: {
    ...common,
    PORT: process.env.PORT || process.env.STAGING_PORT,
  },
  production: {
    ...common,
    PORT: process.env.PORT,
  },
});

export default config[process.env.NODE_ENV];
