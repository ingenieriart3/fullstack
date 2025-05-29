// require('dotenv').config();
import { configDotenv } from 'dotenv';

module.exports.datastores = {
  default: {
    adapter: 'sails-mongo',
    // url:'mongodb+srv://ingenieriart3:ItzeFBGGcCe8wA5g@growhardware.3oe3ko6.mongodb.net/growhardware?retryWrites=true&w=majority&appName=growhardware',//process.env.MONGO_URL,
    url:process.env.MONGO_URL,
  },
};