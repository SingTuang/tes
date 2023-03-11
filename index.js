const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  const num = _.random(0, 20);
  console.log(num);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  let path = "./view/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
