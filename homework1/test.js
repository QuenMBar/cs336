const http = require("http");
const http_status = require("http-status-codes");


const HOST = "localhost";
const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === "/people") {
        res.writeHead(http_status.OK, {"Content-Type": "text/plain"});
        res.end("Hello, Nde.js!");
    } else if (req.url === "/people/id") {
        res.writeHead(http_status.OK, {"Content-Type": "text/plain"});
        res.end("Hello, Noe.js!");
    } else if (req.url === "/people/id/name") {
        res.writeHead(http_status.OK, {"Content-Type": "text/plain"});
        res.end("Hello, Nod.js!");
    } else if (req.url === "/people/id/years") {
        res.writeHead(http_status.OK, {"Content-Type": "text/plain"});
        res.end("Hello, Nodejs!");
    } else {
        res.writeHead(http_status.NOT_FOUND, {"Content-Type": "text/plain"});
        res.end();
    }
});

server.listen(PORT, HOST, () => {
    console.log("Server running on " + HOST + ":" + PORT + ".");
});