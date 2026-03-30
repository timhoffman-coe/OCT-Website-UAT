import sql from 'mssql';

const globalForMssql = globalThis as unknown as { _mssqlPool?: sql.ConnectionPool };

// Helper to parse named instances (e.g. server\\instance)
function parseServer(serverString: string) {
  if (!serverString) return { server: '' };
  const parts = serverString.split('\\');
  if (parts.length > 1) {
    return {
      server: parts[0],
      options: { instanceName: parts[1] }
    };
  }
  return { server: serverString };
}

function getConfig(): sql.config {
  const serverConfig = parseServer(process.env.MSSQL_SERVER || '');
  
  // Handle DOMAIN\user in the MSSQL_USER variable
  let domain = process.env.MSSQL_DOMAIN || '';
  let userName = process.env.MSSQL_USER || '';
  
  if (userName.includes('\\')) {
    const parts = userName.split('\\');
    domain = parts[0];
    userName = parts[1];
  }

  return {
    server: serverConfig.server,
    database: process.env.MSSQL_DATABASE || '',
    // Only use the port if we are NOT using an instance name, as instance name relies on dynamic ports
    ...(serverConfig.options?.instanceName ? {} : { port: parseInt(process.env.MSSQL_PORT || '1433') }),
    authentication: domain 
      ? {
          type: 'ntlm',
          options: {
            domain: domain,
            userName: userName,
            password: process.env.MSSQL_PASSWORD || '',
          },
        }
      : {
          type: 'default',
          options: {
            userName: userName,
            password: process.env.MSSQL_PASSWORD || '',
          },
        },
    options: {
      encrypt: process.env.MSSQL_ENCRYPT !== 'false', // default: true (TLS enabled)
      trustServerCertificate: process.env.MSSQL_TRUST_CERT === 'true', // default: false (require valid CA cert)
      readOnlyIntent: true,
      ...(serverConfig.options || {}),
    },
    pool: {
      min: 2,
      max: 10,
      idleTimeoutMillis: 30000,
    },
    connectionTimeout: 15000,
    requestTimeout: 30000,
  };
}

export async function getPool(): Promise<sql.ConnectionPool> {
  if (globalForMssql._mssqlPool) {
    return globalForMssql._mssqlPool;
  }

  const config = getConfig();
  const pool = new sql.ConnectionPool(config);
  await pool.connect();
  globalForMssql._mssqlPool = pool;
  return pool;
}

export { sql };

