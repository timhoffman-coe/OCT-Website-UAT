# Secret Management

Production secrets are stored in **Google Secret Manager** and fetched at container startup by `entrypoint.js` before the Next.js server starts. The only secret remaining on the production server is `POSTGRES_PASSWORD` in a `.env` file (required by Docker Compose for postgres container initialization).

## How It Works

```
Container starts
  → entrypoint.js runs
  → Authenticates via GCE metadata server (no credentials file needed)
  → Fetches secrets from Secret Manager REST API
  → Populates process.env
  → Writes service-account.json to /tmp/
  → require('./server.js') — Next.js starts with all secrets loaded
```

The `entrypoint.js` script checks for `GCP_PROJECT_ID` in the environment. If set (production), it fetches secrets. If not (development), it starts `server.js` immediately.

## Managed Secrets

| Secret Manager Name | Env Variable | Description |
|---|---|---|
| `coe-website-gemini-api-key` | `GEMINI_API_KEY` | Google Gemini AI API key |
| `coe-website-admin-password` | `ADMIN_PASSWORD` | CMS admin password (pre-IAP fallback) |
| `coe-website-servicehealth-iap-client-id` | `SERVICEHEALTH_IAP_CLIENT_ID` | IAP OAuth client ID for Service Health API |
| `coe-website-hr-policies-folder-id` | `HR_POLICIES_FOLDER_ID` | Google Drive folder ID |
| `coe-website-service-desk-folder-id` | `SERVICE_DESK_FOLDER_ID` | Google Drive folder ID |
| `coe-website-mssql-user` | `MSSQL_USER` | On-prem SQL Server username |
| `coe-website-mssql-password` | `MSSQL_PASSWORD` | On-prem SQL Server password |
| `coe-website-service-account-json` | *(file)* | Google service account key (written to `/tmp/service-account.json`) |

**Non-secret config** (set in `docker-compose.prod.yml`): `MSSQL_SERVER`, `MSSQL_DATABASE`, `MSSQL_PORT`, `MSSQL_DOMAIN`, `MSSQL_ENCRYPT`, `MSSQL_TRUST_CERT`, `SERVICEHEALTH_API_BASE_URL`, `LOG_LEVEL`.

**Not in Secret Manager:** `POSTGRES_PASSWORD` and `DATABASE_URL` are provided by Docker Compose via the `.env` file on the server. Docker Compose needs these values before containers start, so they cannot be fetched from inside a container.

## What's on the Production Server

```
~/apps/nextjs-site/
  docker-compose.prod.yml   # references ${POSTGRES_PASSWORD}, sets GCP_PROJECT_ID
  nginx.conf                # nginx reverse proxy config
  .env                      # contains only POSTGRES_PASSWORD=<value>
```

No `.env.local`, no `service-account.json`. All other secrets are in Secret Manager.

## First-Time Setup

Run these commands from wherever you have `gcloud` access (Cloud Shell, the VM, etc.).

### 1. Enable the Secret Manager API

```bash
gcloud services enable secretmanager.googleapis.com --project=ops-data-technology-dev
```

### 2. Create each secret

```bash
for secret in \
  coe-website-gemini-api-key \
  coe-website-admin-password \
  coe-website-servicehealth-iap-client-id \
  coe-website-hr-policies-folder-id \
  coe-website-service-desk-folder-id \
  coe-website-mssql-user \
  coe-website-mssql-password \
  coe-website-service-account-json; do
  gcloud secrets create "$secret" \
    --replication-policy="automatic" \
    --project=ops-data-technology-dev
done
```

### 3. Add values to each secret

All current secret values live in `.env.local` on the prod server (`~/apps/nextjs-site/.env.local`). Open that file to get the values for each secret below.

The easiest way to add values is through the **GCP Console UI**: go to **Security > Secret Manager**, click the secret name, click **New Version**, and paste the value.

Alternatively, from **Cloud Shell** in the GCP Console:

```bash
# Each secret needs its actual value from the prod server's .env.local file.
# Replace the quoted value with the real value for each one.

echo -n "<value>" | gcloud secrets versions add coe-website-gemini-api-key \
  --data-file=- --project=ops-data-technology-dev

echo -n "<value>" | gcloud secrets versions add coe-website-admin-password \
  --data-file=- --project=ops-data-technology-dev

echo -n "<value>" | gcloud secrets versions add coe-website-servicehealth-iap-client-id \
  --data-file=- --project=ops-data-technology-dev

echo -n "<value>" | gcloud secrets versions add coe-website-hr-policies-folder-id \
  --data-file=- --project=ops-data-technology-dev

echo -n "<value>" | gcloud secrets versions add coe-website-service-desk-folder-id \
  --data-file=- --project=ops-data-technology-dev

echo -n "<value>" | gcloud secrets versions add coe-website-mssql-user \
  --data-file=- --project=ops-data-technology-dev

echo -n "<value>" | gcloud secrets versions add coe-website-mssql-password \
  --data-file=- --project=ops-data-technology-dev
```

**For the service account JSON** (one-time migration — the file currently exists on the prod server at `~/apps/nextjs-site/service-account.json`):

1. From Cloud Shell: `gcloud compute ssh datatech-dev-crewai --command "cat ~/apps/nextjs-site/service-account.json"`
2. Copy the JSON output
3. In Secret Manager UI, open `coe-website-service-account-json`, click **New Version**, paste the JSON
4. After verifying the app works with Secret Manager, delete the file from the prod server

### 4. Grant the VM service account access

```bash
SA="404748270648-compute@developer.gserviceaccount.com"

for secret in \
  coe-website-gemini-api-key \
  coe-website-admin-password \
  coe-website-servicehealth-iap-client-id \
  coe-website-hr-policies-folder-id \
  coe-website-service-desk-folder-id \
  coe-website-mssql-user \
  coe-website-mssql-password \
  coe-website-service-account-json; do
  gcloud secrets add-iam-policy-binding "$secret" \
    --member="serviceAccount:$SA" \
    --role="roles/secretmanager.secretAccessor" \
    --project=ops-data-technology-dev \
    --quiet
done
```

## Adding a New Secret

1. Create the secret and add a value:
   ```bash
   gcloud secrets create coe-website-new-secret \
     --replication-policy="automatic" \
     --project=ops-data-technology-dev
   echo -n "value" | gcloud secrets versions add coe-website-new-secret \
     --data-file=- --project=ops-data-technology-dev
   ```

2. Grant the VM service account access:
   ```bash
   gcloud secrets add-iam-policy-binding coe-website-new-secret \
     --member="serviceAccount:404748270648-compute@developer.gserviceaccount.com" \
     --role="roles/secretmanager.secretAccessor" \
     --project=ops-data-technology-dev
   ```

3. Add the mapping in `entrypoint.js`:
   ```javascript
   'coe-website-new-secret': 'NEW_ENV_VAR',
   ```

4. Build, push, and deploy the new image.

## Rotating a Secret

1. Add a new version:
   ```bash
   echo -n "new-value" | gcloud secrets versions add coe-website-gemini-api-key \
     --data-file=- --project=ops-data-technology-dev
   ```

2. Restart the app container to pick up the new value:
   ```bash
   docker compose -f docker-compose.prod.yml restart app
   ```

3. (Optional) Disable the old version:
   ```bash
   gcloud secrets versions disable OLD_VERSION_NUMBER \
     --secret=coe-website-gemini-api-key \
     --project=ops-data-technology-dev
   ```

## Local Development

Local development does **not** use Secret Manager. The `GCP_PROJECT_ID` env var is not set, so `entrypoint.js` skips secret fetching and starts `server.js` directly. Secrets come from `.env.local` (gitignored). See [development-setup.md](development-setup.md) for details.

## Security Notes

- `.env*` files are in `.gitignore` and were never committed to git history
- The service account JSON exists only in container memory (`/tmp/`) — not on the host disk
- The app authenticates to Secret Manager via the GCE metadata server — no credentials file on disk
- The only secret on the production server disk is `POSTGRES_PASSWORD` in the `.env` file
