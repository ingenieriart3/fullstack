module.exports.datastores = {
  default: {
    adapter: 'sails-mongo',
    url: process.env.MONGO_URL,
    ssl: true,
    mongoClientOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true
    }
  },
};