var mongoose = require('mongoose');
var dburl = process.env.MONGO_URI;

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true });

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dburl);
  });
  mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
  });
  mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
  });
  
  function gracefulShutdown(msg, callback) {
    mongoose.connection.close(function() {
      console.log('Mongoose disconnected through ' + msg);
      callback();
    });
  }
  
  // For nodemon restarts
  process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
      process.kill(process.pid, 'SIGUSR2');
    });
  });
  // For app termination
  process.on('SIGINT', function() {
    gracefulShutdown('App termination (SIGINT)', function() {
      process.exit(0);
    });
  });
  // For Heroku app termination
  process.on('SIGTERM', function() {
    gracefulShutdown('App termination (SIGTERM)', function() {
      process.exit(0);
    });
  });

  require('./models/user');