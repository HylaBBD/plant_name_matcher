const http = require("http");
const { config } = require("./config/config");
const path = "./db/plants.db";
const { dbHelper } = require("./db/helper/database.helper");
const { usersService } = require("./modules/users/users.service");

const requestListener = (req, res) => {
  const db = "dbHelper.connect(path)";
  res.writeHead(200);
  const routeConfig = config.server.routes.find(
    (route) => req.url === route.url && req.method === route.method
  );

  if (routeConfig) {
    const db = dbHelper.connect("./db/plants.db"); //this will create a connection to our db, easier to do this here and pass as parameters to the service with our sql

    new Promise((resolve, reject) => {
      resolve(routeConfig.function(db));
    }).then((response) => {
      console.log("Data below:"); //just an output to console to view data
      console.log(response);

      // meant to write to a json object for our response
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(response));
    });
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
