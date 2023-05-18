const http = require("http");
const { config } = require("./config/config");
const path = "./db/plants.db";
const { dbHelper } = require("./db/helper/database.helper");
const url = require("url");

const requestListener = async (req, res) => {
  requestDataBuilder(req)
  .then((data) => {
    console.log(data.urlData.filePath)
    const selectedRoute = config.server.getRouteFunction(data.urlData.filePath, data.urlData.method);
    if (selectedRoute) {
      const db = dbHelper.connect(path);
    
      selectedRoute.function({
        ...data.body,
        ...data.queryParams,
        url: data.urlData.filePath,
        connection: db
      }).then(({responseCode, response}) => {
        console.log("RESPONSE")
        console.log(JSON.stringify(response))
        console.log(responseCode)
        res.writeHead(responseCode, { "Content-Type": "application/json" });
        res.write(JSON.stringify(response))
        res.end();
      })
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write("this will hapen if no params found");
      res.end();
    }
  }).catch((err) => {
    console.log(err)
    res.writeHead(500, { "Content-Type": "application/json" });
    res.write(JSON.stringify(err))
    res.end();
  })
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

const server = http.createServer(requestListener);
server.listen(config.server.port, config.server.host, () => {
  // will open the server for us and keep it running.
  console.log(
    `Server is running on http://${config.server.host}:${config.server.port}`
  );
});
