/*
 * Handler module
 */ 

//Custom Responses
const hello = 'Hello world RESTful API!'
const notFound = 'This is not the web page you are looking for.'

//Declare Handlers
let handlers = {};

handlers.hello = new Promise((resolve,reject) => {
  resolve([200,{msg: hello}]);
});

handlers.notFound = new Promise((resolve,reject) => {
  resolve([404,{msg: notFound}])
});

module.exports = handlers;