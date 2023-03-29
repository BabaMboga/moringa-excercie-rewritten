const http = require("http");
const fs = require("fs");
const path = require("path");

const readFile = fs.readFileSync(__dirname + "/db.json");
const port = 3000;
const host = "localhost";

const static = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PATCH");
  res.setHeader("Access-Control-Max-Age", 2592000);
  if (req.url == "/") {
    console.log(req.url);
    fs.readFile(
      __dirname + "/public/index.html",
      "utf-8",
      function (html, error) {
        // console.log(error)
        res.writeHead(200);
        res.end(html);
      }
    );
  } else if (req.url === "/cars" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(readFile);
  } else if (req.url === "/cars" && req.method === "POST") {
    // console.log({ body:  req.body })
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(Array.from(readFile));
  } else if (req.url === "/cars" && req.params.id && req.method === "GET") {
    const car = Array.from(readFile).find((file) => file.id === req.params.id);
    // console.log({ body:  req.body })
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(car);
  }
};

const handleFileStream = (path, contentType, res) => {
  const createFileStream = fs.createReadStream(path, "utf-8");
  res.writeHead(200, contentType);
  createFileStream.pipe(res);
};

const server = http.createServer(static);

server.listen(port, host, function () {
  console.log("Server Running on Port 3000");
});
