module.exports.buildResponse = (code, response) => {
  return {
    statusCode: code,
    body: JSON.stringify(response),
  };
};
