## Assignment 1 - Hello World API
### Requirements:
* RESTful JSON API that listen on a port of choice
* Returns JSON message on /hello 

### Solution Overview: 

* Server listen on port specified in the config.js file
* Endpoint /hello returns a JSON message "Hello world RESTful API"
* Rest of endpoints returns a 404 not Found with a message.
* Fully migrated to ES6 syntax
* Modular Design & Promises
* Ports: Staging 5000/5001 HTTP(S) | Production 9000/9001 HTTP(S)

### Usage:
#### Staging
```shell
$ node index.js
```
#### Production 
```shell
$ NODE_ENV='production' node index.js
```
