require('dotenv').config();
module.exports.datastores = {
  default: {
    adapter: 'sails-mongo',
    url:process.env.MONGO_URL || 'mongodb://localhost:27017/growhardware',
  },
};
