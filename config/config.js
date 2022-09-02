require("dotenv").config({ path: "./env/.env" });

const config = {
  app: {
    port: process.env.PORT,
  },
};

module.exports = config;
