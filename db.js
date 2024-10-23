const sql = require('mssql/msnodesqlv8');


const config = {
  driver: 'ODBC Driver 18 for SQL Server',   
  server: 'localhost',  
  database: 'LECTOR_QR',  
  options: {
    trustedConnection: true, 
    encrypt: false,         
    trustServerCertificate: true, 
  },
};

const connectDB = async () => {
  try {
    // Intentar la conexión
    return await sql.connect(config);
  } catch (error) {
    console.error('Error al conectar a SQL Server', error);
  }
};

module.exports = { connectDB, sql };
