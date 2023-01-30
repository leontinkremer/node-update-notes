const http = require("http");
const fs = require("fs/promises"); // module to work with files
const path = require("path"); // module to get path
const basePath = path.join(__dirname, "pages"); // create base path

// create server
const server = http.createServer(async (req, res) => {
  const reqMethod = req.method;

  // handle get request
  if (reqMethod === "GET") {
    const content = await fs.readFile(path.join(basePath, "index.html"));

    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end(content);
  } else if (reqMethod === "POST") {
    const body = [];

    res.writeHead(200, {
      // describe Header on code 200
      "Content-Type": "text/plain; charset=utf-8",
    });
    // push data to body arr.
    req.on("data", (data) => {
      body.push(Buffer.from(data));
    });

    // find out when is the process of receiving data complete?
    req.on("end", () => {
      const title = body.toString().split("=")[1].replaceAll("+", " ");
      addNote(title); // add content of title to the db.json
      res.end(chalk.green(`Title = ${title}`)); // provide response on end
    });
  }
  console.log("reqMethod", reqMethod);
  console.log("basePath", basePath);
});
