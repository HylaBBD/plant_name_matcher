const http = require("http");
const { config } = require("./config/config");
const url = require("url");
const { buildResponse } = require("./modules/response/responseUtils");

const requestListener = (req, res, callback) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Request-Method", "*");
  // res.setHeader(
  //   "Access-Control-Allow-Methods",
  //   "OPTIONS, GET, DELETE, PATCH, POST"
  // );
  // res.setHeader("Access-Control-Allow-Headers", "*");

  // console.log("config-------------------------1");
  // console.log(req, req.requestContext.http.method);
  // console.log("config-------------------------2");
  const selectedRoute = config.server.getRouteFunction(
    req.requestContext.http.path,
    req.requestContext.http.method
  );
  if (selectedRoute) {
    console.log("selectec", selectedRoute, "selected");
    console.log(req);
    console.log(req.body);
    console.log(req.queryStringParameters);

    selectedRoute
      .function({
        ...(req.body ? JSON.parse(req.body) : {}),
        url: req.requestContext.http.path,
      })
      .then((response) => {
        console.log("RESPONSE");
        console.log(JSON.stringify(response));
        // console.log(responseCode);

        // res.send()

        callback(null, response);

        // res.writeHead(responseCode, { "Content-Type": "application/json" });
        // res.write(JSON.stringify(response));
        // res.end();
      })
      .catch((error) => {
        callback(null, buildResponse(500, error));
      });
  } else {
    callback(null, buildResponse(404, { message: "route not found" }));
    // res.writeHead(404, { "Content-Type": "application/json" });
    // res.write("this will hapen if no params found");
    // res.end();
  }

  // requestDataBuilder(req)
  //   .then((data) => {
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     // res.writeHead(500, { "Content-Type": "application/json" });
  //     // res.write(JSON.stringify(err));
  //     // res.end();
  //   });
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
        let queryParam = baseURI.query;
        let parsedBody = Buffer.concat(body).toString();
        let requestBody = parsedBody ? JSON.parse(parsedBody) : undefined;
        const queryObj = queryParam ? buildJSONObject(queryParam) : undefined;
        requestObject = {
          queryParams: queryObj,
          body: requestBody,
          urlData: { filePath: baseURI.pathname, method: req.method },
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

// const server = http.createServer(requestListener);
// server.listen(config.server.port, config.server.host, () => {
//   // will open the server for us and keep it running.
//   console.log(
//     `Server is running on http://${config.server.host}:${config.server.port}`
//   );
// });

module.exports.handler = requestListener;
