const sql = require("mssql");
const options = {
  user: "root",
  password: "plantDbWebDev1",
  database: "PlantsDb",
  port: 1433,
  server: "plantdb.c554t2pimfma.af-south-1.rds.amazonaws.com",
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true,
  },
};

module.exports.executeQuery = async (sqlQuery) => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(options);

    const result = await sql.query(sqlQuery);

    console.dir(result);
    return result.recordset;
  } catch (err) {
    console.log(err);
    return err;
  }
};
