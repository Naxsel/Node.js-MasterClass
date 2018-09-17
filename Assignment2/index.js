/*
 * Assignment 2 - Pizza-delivery company API
 * Main Logic
 */

// Dependencies
const server = require('./lib/server');

// Declare the app
const app = {};

// Init function
app.init = () => {
  // Start the server
  server.init();

};

// Self executing
app.init();

// Export the app (optional)
module.exports = app;