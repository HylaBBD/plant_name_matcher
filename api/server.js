const http = require("http");
const { config } = require("./config/config");
const url = require("url");
const { buildResponse } = require("./modules/response/responseUtils");

const requestListener = (req, res, callback) => {
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

        callback(null, response);
      })
      .catch((error) => {
        console.log(error);
        callback(null, buildResponse(500, error));
      });
  } else {
    callback(null, buildResponse(404, { message: "route not found" }));
  }
};

module.exports.handler = requestListener;
