const http = require("http");

//Separating app file from the core files
const routes = require("./routes");

const server = http.createServer(routes)
//const server = http.createServer(routes.handler);

server.listen(3000);