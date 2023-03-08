const fs = require("fs");

const requestHandler = (request, response) => {
    const url = request.url;
    const method = request.method;

    if (url === "/") {
        response.setHeader("Content-Type", "text/html");
        response.write("<html>");
        response.write("<head><title>First Page</title></head>");
        response.write("<body><form action='/message' method='POST'><input type='text' name='message'/><button type='submit'>Send</button></form></body>");
        response.write("</html>");
        return response.end();
    }
    if (url === "/message" && method === "POST") {
        const body = [];
        request.on("data", (chunk) => {
            body.push(chunk);
        });
        request.on("end", () => {
            const parsedData = Buffer.concat(body).toString();
            const message = parsedData.split("=")[0];
            fs.writeFile("message.txt", message, error => {
                response.statusCode = 200;
                response.setHeader("Location", "/");
                return response.end();
            });
        })
    }
}

module.exports = requestHandler;


//Way 2
// module.exports = {
//     handler: requestHandler,
//     //Another function which we want to can be exported here as a KV pair
// }

//Similar to way 2
// module.exports.handler = requestHandler;

//Way 3
//exports.handler = requestHandler;

