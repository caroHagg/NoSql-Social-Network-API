const { connect, connection } = require('mongoose');

connect('mongodb://localhost/social_networkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
