const http = require('http');

const routes = require('./routes'); //importing a custom built module

/*when  a request reaaches our server then the callback fn(routes) will be executed */
const server = http.createServer(routes);
// storing the returned server method in a constant.

server.listen(3000); // listening for the the requests
