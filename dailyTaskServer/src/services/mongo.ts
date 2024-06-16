import mongoose from 'mongoose';

require('dotenv').config();

// it'll only get triggered once due to "once" instead of "on"
mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err: Error) => {
  console.log(`Mongo Error: ${err}`);
});

async function mongoConnect(test: boolean = false) {
  try {
    if (process.env.MONGO_URL_TEST && process.env.MONGO_URL) {
      await mongoose.connect(
        test ? process.env.MONGO_URL_TEST : process.env.MONGO_URL
      );
    }
  } catch (err) {
    throw new Error(`mongoConnect: ${err}`);
  }
}

async function mongoDisconnect() {
  try {
    await mongoose.disconnect();
  } catch (err) {
    throw new Error(`mongoDisconnect: ${err}`);
  }
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
