/*
    Configures the api key and base url based on the mode you set in the .env file
*/

import dotenv from "dotenv";

dotenv.config();

const config = {
  MODE: process.env.CAMBER_MODE,
  API_BASE_URL:
    process.env.CAMBER_MODE === "test"
      ? "https://test.camber.so/v1"
      : "https://api.camber.so/v1",
  API_KEY:
    process.env.CAMBER_MODE === "test"
      ? process.env.CAMBER_TEST_API_KEY
      : process.env.CAMBER_LIVE_API_KEY,
};
console.dir(config, { depth: null }); // DO NOT LOG THIS IN PRODUCTION

export default config;
