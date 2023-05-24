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

module.exports.dbHelper = {
  connect: async () => {
    return await sql.connect(options);
  },
  executeQuery: async (sqlQuery) => {
    let connection;
    try {
      connection = await this.dbHelper.connect();

      const result = await connection.query(sqlQuery);

      console.dir(result);
      connection.close();
      return result.recordset;
    } catch (err) {
      connection.close();
      console.log(err);
      throw err;
    }
  },
  executeQueryWithTransaction: async (tx, sqlQuery) => {
    const request = new sql.Request(tx);
    console.log(sqlQuery);
    return request.query(sqlQuery, (error, result) => {
      if (error) {
        throw error;
      } else {
        return result;
      }
    });
  },
};
