const http = require("http");
const { config } = require("./config/config");
const path = "./db/plants.db";
const { dbHelper } = require("./db/helper/database.helper");
const { parse } = require("querystring");

const getBodyData = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      resolve(parse(body));
    });
  });
};

const requestListener = async (req, res) => {
  const data = getBodyData(req);
  const routeConfig = config.server.getRouteFunction(req.url, req.method);

  if (routeConfig) {
    const db = dbHelper.connect(path); //this will create a connection to our db, easier to do this here and pass as parameters to the service with our sql
    const response = await routeConfig.function({
      connection: db,
      requestContext: await data,
    }); //the function should be an object of no specification other than the connection parameter as we will not know for certain what we are getting from the fe, thsi way we can handle the object input everywhere and the obj can vary easily
    console.log(5);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(response));
    res.end();

    console.log(response);

    console.log(6);
  } else {
    res.write("this will hapen if no params found");
  }
  // sends the response at the end of all the above code
  res.end();
};

const server = http.createServer(requestListener);
server.listen(config.server.port, config.server.host, () => {
  // will open the server for us and keep it running.
  console.log(
    `Server is running on http://${config.server.host}:${config.server.port}`
  );
});
