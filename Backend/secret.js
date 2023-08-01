require("dotenv").config();

const ServerPort = process.env.SERVER_PORT
const mongoDB=process.env.MONGODB_URL

module.exports = {ServerPort,mongoDB}