const mongoose = require('mongoose');

async function connect(connection) {
  console.log('Connect');
  try {
    const connectionResult = await mongoose.connect(connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connectionResult) console.log('Connected');
  } catch (error) {
    console.log('Connect failed', error);
  }
}

module.exports.connect = connect;
