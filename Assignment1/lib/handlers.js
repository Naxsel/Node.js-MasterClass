let handlers = {};
const hello = 'Hello world RESTful API!'
const notFound = 'This is not the web page you are looking for.'

handlers.hello = (callback) => {
	callback(200,{msg: hello});
};

// Not found handler
handlers.notFound = (callback) => {
	callback(404,{msg: notFound});
};

module.exports = handlers;