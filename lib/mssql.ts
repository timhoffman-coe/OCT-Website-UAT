import sql from 'mssql';

const globalForMssql = globalThis as unknown as { _mssqlPool?: sql.ConnectionPool };

const config: sql.config = {
  server: process.env.MSSQL_SERVER || '',
  database: process.env.MSSQL_DATABASE || '',
  port: parseInt(process.env.MSSQL_PORT || '1433'),
  authentication: {
    type: 'ntlm',
    options: {
      domain: process.env.MSSQL_DOMAIN || '',
      userName: process.env.MSSQL_USER || '',
      password: process.env.MSSQL_PASSWORD || '',
    },
  },
  options: {
    encrypt: process.env.MSSQL_ENCRYPT !== 'false', // default: true (TLS enabled)
    trustServerCertificate: process.env.MSSQL_TRUST_CERT === 'true', // default: false (require valid CA cert)
    readOnlyIntent: true,
  },
  pool: {
    min: 2,
    max: 10,
    idleTimeoutMillis: 30000,
  },
  connectionTimeout: 15000,
  requestTimeout: 30000,
};

export async function getPool(): Promise<sql.ConnectionPool> {
  if (globalForMssql._mssqlPool) {
    return globalForMssql._mssqlPool;
  }

  const pool = new sql.ConnectionPool(config);
  await pool.connect();
  globalForMssql._mssqlPool = pool;
  return pool;
}

export { sql };
