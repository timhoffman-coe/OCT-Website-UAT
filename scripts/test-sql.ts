import * as dotenv from 'dotenv';
import * as process from 'node:process';
import { getPool } from '../lib/mssql';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

async function testConnection() {
  console.log('Connecting to SQL Server...');
  console.log(`Server: ${process.env.MSSQL_SERVER || '(not set)'}`);
  console.log(`Database: ${process.env.MSSQL_DATABASE || '(not set)'}`);
  
  if (!process.env.MSSQL_SERVER || !process.env.MSSQL_USER) {
    console.error('❌ Error: MSSQL_SERVER or MSSQL_USER is not defined in .env.local');
    return;
  }

  try {
    const pool = await getPool();
    console.log('✅ Successfully connected to the connection pool!');

    // Run a basic test query
    const result = await pool.request().query('SELECT @@VERSION as version');
    console.log('\n✅ Query executed successfully. SQL Server Version:');
    console.log(result.recordset[0].version);

    // Close the pool when done
    await pool.close();
    console.log('\nConnection closed.');
  } catch (error) {
    console.error('❌ Failed to connect or execute query:');
    console.error(error);
  }
}

testConnection();
