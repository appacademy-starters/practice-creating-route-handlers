const http = require('http');

let nextDogId = 1;

function getNewDogId() {
  const newDogId = nextDogId;
  nextDogId++;
  return newDogId;
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  // When the request is finished processing the entire body
  req.on("end", () => {
    // Parsing the body of the request
    if (reqBody) {
      req.body = reqBody
        .split("&")
        .map((keyValuePair) => keyValuePair.split("="))
        .map(([key, value]) => [key, value.replace(/\+/g, " ")])
        .map(([key, value]) => [key, decodeURIComponent(value)])
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
      console.log(req.body);
    }

    // define route handlers here

    // GET /

    // GET /dogs
    
    // GET /dogs/new

    // GET /dogs/:dogId

    // POST /dogs
      // use `getNewDogId` function defined at the top of the file to get the
      // dogId of the newly created dog

    // POST /dogs/:dogId

    // GET /dogs/:dogId/edit

    // No matching endpoint
  });
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));