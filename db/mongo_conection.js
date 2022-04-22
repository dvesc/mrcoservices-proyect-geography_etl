const mongoose = require('mongoose'),
  config = require('config');

const init_mongo = async () => {
  let inital_conection_flag = false;
  await mongoose
    .connect(
      `mongodb+srv://${config.get('db.username')}:${config.get(
        'db.password'
      )}@${config.get('db.host')}/${config.get('db.name')}`
    )
    .then(() => {
      console.log('[MONGO] Success initial connection to the MongoDB server ');
      inital_conection_flag = true;
    })
    .catch(err => {
      console.log(`[MONGO] ${err}`);
    });

  mongoose.connection
    .on('error', err => console.error(`[MONGO] ${err.message}`))
    .on('open', () => console.log('[MONGO] Back online'))
    .on('disconnected', () =>
      console.log('[MONGO] Connection lost, reconnecting to MongoDB server...')
    )
    .on('reconnected', () => console.log('[MONGO] Establishing connection...'));

  return inital_conection_flag;
};

module.exports = init_mongo;
