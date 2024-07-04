import http from "http";
import fs from "fs";
import path from "path";

const server = http.createServer((req, res) => {
  let filePath = 'D:\\my web\\Coursera\\Coursera-web' + req.url;

  // Replace '/' with '\\'
  filePath = filePath.replace(/\//g, '\\');

  // Set default file to index.html
  if (filePath === 'D:\\my web\\Coursera\\Coursera-web\\') {
    filePath = 'D:\\my web\\Coursera\\Coursera-web\\index.html';
  }

  // Determine content type based on file extension
  const extname = String(path.extname(filePath)).toLowerCase();
  let contentType = 'text/html';
  switch (extname) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.json':
      contentType = 'application/json'; // Set content type for JSON
      break;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data, 'utf-8');
    }
  });

});

const PORT = 5111;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

//Till the end, recomend you to use express.js to create a server.
