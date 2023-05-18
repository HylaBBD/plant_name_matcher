const sql = require('mssql')
const options = {
    user: 'root',
    password: 'plantDbWebDev1',
    database: 'PlantsDb',
    port: 1433,
    server: 'plantdb.c554t2pimfma.af-south-1.rds.amazonaws.com',
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true,
      },
}

const x = async () => {
    try {
     // make sure that any items are correctly URL encoded in the connection string
     await sql.connect(options)
     const result = await sql.query`select * from difficulty_settings`
     console.dir(result)
     return result;
    } catch (err) {
        console.log(err)
    }
}
x()