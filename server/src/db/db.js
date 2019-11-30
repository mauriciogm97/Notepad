const mongoose = require('mongoose')

if (process.env.NODE_ENV == 'production') {
  var connectionURL = process.env.MONGOOSE_CONNECTION_URL;
} else {
  const credentials = require('../credentials');
  var connectionURL = credentials.MONGOOSE_CONNECTION_URL;
}

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true, // crear indexes
  useUnifiedTopology: true
})