/**
 * Production entrypoint — fetches secrets from Google Secret Manager
 * before starting the Next.js server.
 *
 * In development (no GCP_PROJECT_ID), this just starts server.js directly.
 *
 * Auth: Uses the GCE VM's attached service account via the metadata server.
 * No credentials file needed — google-auth-library handles this automatically.
 */

const SECRET_MAP = {
  'coe-website-gemini-api-key': 'GEMINI_API_KEY',
  'coe-website-admin-password': 'ADMIN_PASSWORD',
  'coe-website-servicehealth-iap-client-id': 'SERVICEHEALTH_IAP_CLIENT_ID',
  'coe-website-hr-policies-folder-id': 'HR_POLICIES_FOLDER_ID',
  'coe-website-service-desk-folder-id': 'SERVICE_DESK_FOLDER_ID',
  'coe-website-mssql-user': 'MSSQL_USER',
  'coe-website-mssql-password': 'MSSQL_PASSWORD',
};

const SERVICE_ACCOUNT_SECRET = 'coe-website-service-account-json';

async function fetchSecrets() {
  const projectId = process.env.GCP_PROJECT_ID;
  if (!projectId) {
    return;
  }

  console.log(`[entrypoint] Fetching secrets from Google Secret Manager (project: ${projectId})...`);

  const { GoogleAuth } = require('google-auth-library');
  const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
  const client = await auth.getClient();
  const { token } = await client.getAccessToken();

  const baseUrl = `https://secretmanager.googleapis.com/v1/projects/${projectId}/secrets`;

  async function accessSecret(secretName) {
    const url = `${baseUrl}/${secretName}/versions/latest:access`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to fetch secret "${secretName}": ${response.status} ${text}`);
    }

    const data = await response.json();
    return Buffer.from(data.payload.data, 'base64').toString('utf-8');
  }

  // Fetch env var secrets
  for (const [secretName, envVar] of Object.entries(SECRET_MAP)) {
    console.log(`[entrypoint]   ${secretName} → ${envVar}`);
    process.env[envVar] = await accessSecret(secretName);
  }

  // Fetch service account JSON and write to /tmp
  console.log(`[entrypoint]   ${SERVICE_ACCOUNT_SECRET} → /tmp/service-account.json`);
  const serviceAccountJson = await accessSecret(SERVICE_ACCOUNT_SECRET);
  require('fs').writeFileSync('/tmp/service-account.json', serviceAccountJson, { mode: 0o400 });
  process.env.GOOGLE_APPLICATION_CREDENTIALS = '/tmp/service-account.json';

  console.log(`[entrypoint] All secrets loaded successfully.`);
}

fetchSecrets()
  .then(() => {
    require('./server.js');
  })
  .catch((err) => {
    console.error('[entrypoint] Failed to fetch secrets:', err);
    process.exit(1);
  });
