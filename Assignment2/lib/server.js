/*
 * Server module
 */ 

// Dependencies
const http = require('http');
const https = require('https');
const path = require('path');
const url = require('url');
const fs = require('fs');
const {StringDecoder} = require('string_decoder');

const config = require('./config');
const handlers = require('./handlers');

// Instantiate the server module object
const server = {};

// Instantiate the HTTP/HTTPS servers
server.httpServer = http.createServer((req,res) => {
  server.unifiedServer(req,res);
});
 
server.httpsServerOptions = {
  'key': fs.readFileSync(path.join(__dirname,'../https/key.pem'),'utf-8'),
  'cert': fs.readFileSync(path.join(__dirname,'../https/cert.pem'), 'utf-8')
};

server.httpsServer = https.createServer(server.httpsServerOptions,(req,res) => {
  server.unifiedServer(req,res);
});

// Server logic
server.unifiedServer = (req,res) => {
	
	// Parse the url
	let parsedUrl = url.parse(req.url, true);
	
	// Get the path
	let path = parsedUrl.pathname;
	let trimmedPath = path.replace(/^\/+|\/+$/g, '');
    
	// Get the payload,if any
  let decoder = new StringDecoder('utf-8');
  let buffer = '';
	req.on('data', (data) => {
		buffer += decoder.write(data);
	});
	req.on('end', () => {
		buffer += decoder.end();
		
		// Check the router for a matching path for a handler. If one is not found, use the notFound handler instead.
		const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
		// Route the request to the handler specified in the router
		chosenHandler.then(([statusCode,payload]) => {
			
			// Use the status code returned from the handler, or set the default status code to 200
			statusCode = typeof(statusCode) == 'number' ? statusCode : 200; 
			
			// Use the payload returned from the handler, or set the default payload to an empty object
			payload = typeof(payload) == 'object' ? payload : {};
			
			// Convert the payload to a string
			let payloadString = JSON.stringify(payload);
			
			// Return the response
			res.setHeader('Content-Type', 'application/json');
			res.writeHead(statusCode);
			res.end(payloadString);
			console.log("Returning this response: ",statusCode,payloadString);
		})
		.catch((err) => {console.error(err)})
	});
};

// Define the request router
const router = {
	'hello' : handlers.hello
};

// Init process
server.init = () => {
	// Start the HTTP server
  server.httpServer.listen(config.httpPort,() => {
    console.log('\x1b[36m%s\x1b[0m','The HTTP server is running on port '+config.httpPort);
  });
  
  // Start the HTTPS server
  server.httpsServer.listen(config.httpsPort,() => {
    console.log('\x1b[35m%s\x1b[0m','The HTTPS server is running on port '+config.httpsPort);
  });
};
  
// Export the module
module.exports = server;