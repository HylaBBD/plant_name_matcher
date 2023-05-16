module.exports.serverHelper = {
  responses: {
    success: (data, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(data));
      res.end();
    },
  },
};
