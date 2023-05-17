const http = require("http");
const { config } = require("./config/config");
const path = "./db/plants.db";
const { dbHelper } = require("./db/helper/database.helper");
const url = require("url");

const requestListener = async (req, res) => {
  requestDataBuilder(req)
    .then((data) => {
      const selectedRoute =
        data.urlData && data.urlData.filePath
          ? config.server.routes.find(
              (route) => data.urlData.filePath[0] === route.url
            )
          : undefined;

      if (selectedRoute) {
        const routeConfig = selectedRoute.childRoutes.find(
          (route) =>
            JSON.stringify(route.queryParams) ===
              JSON.stringify(Object.keys(data.queryParams)) &&
            route.method === data.urlData.method &&
            JSON.stringify(route.url) === JSON.stringify(data.urlData.filePath)
        );

        console.log("routeConfig_____________");
        console.log(routeConfig);
        console.log("routeConfig-------------");

        if (routeConfig) {
          const db = dbHelper.connect(path);
          routeConfig
            .function({
              ...data.body,
              ...data.queryParams,
              connection: db,
            })
            .then((response) => {
              res.writeHead(200, { "Content-Type": "application/json" });

              res.write(JSON.stringify(response));
              res.end();
            })
            .catch((err) => {
              res.writeHead(500, { "Content-Type": "application/json" });

              res.write(JSON.stringify(err));
              res.end();
            });

          // serverHelper.responses.success(response, res);
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.write("this will hapen if no params found");
          res.end();
        }
      } else {
        res.write("failed");
        res.end();
      }
    })
    .catch((err) => {
      res.write(JSON.stringify(err));
      res.end();
    });
};

const requestDataBuilder = async (req) => {
  //should return a body with any data that we need

  const body = [];
  let requestObject;
  return new Promise((resolve, reject) => {
    req.on("data", async (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      try {
        let baseURI = url.parse(req.url, true);
        let filePath = baseURI.pathname.split("/");
        filePath.splice(0, 1);

        let queryParam = baseURI.query;
        let parsedBody = Buffer.concat(body).toString();
        let requestBody = parsedBody ? JSON.parse(parsedBody) : undefined;
        const queryObj = queryParam ? buildJSONObject(queryParam) : undefined;
        requestObject = {
          queryParams: queryObj,
          body: requestBody,
          urlData: { filePath: filePath, method: req.method },
        };
        resolve(requestObject);
      } catch (error) {
        requestObject = {};
        reject(requestObject);
      }
    });
  }).then(() => {
    return requestObject;
  });
};

const buildJSONObject = (data) => {
  return Object.keys(data).reduce((queryObj, paramKey) => {
    queryObj = { ...queryObj, [paramKey]: data[paramKey] };
    return queryObj;
  }, {});
};

const server = http.createServer(requestListener);
server.listen(config.server.port, config.server.host, () => {
  // will open the server for us and keep it running.
  console.log(
    `Server is running on http://${config.server.host}:${config.server.port}`
  );
});
