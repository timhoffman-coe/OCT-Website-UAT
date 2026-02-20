import { GoogleAuth } from 'google-auth-library';

let cachedAuth: GoogleAuth | null = null;

function getAuth(): GoogleAuth {
  if (!cachedAuth) {
    cachedAuth = new GoogleAuth();
  }
  return cachedAuth;
}

/**
 * Make an authenticated request to an IAP-protected service.
 * Acquires an OIDC identity token using the service account
 * (via GOOGLE_APPLICATION_CREDENTIALS or GCE metadata server).
 */
export async function fetchFromIAPService(
  url: string,
  options?: { timeout?: number }
): Promise<Response> {
  const targetClientId = process.env.SERVICEHEALTH_IAP_CLIENT_ID;
  if (!targetClientId) {
    throw new Error('SERVICEHEALTH_IAP_CLIENT_ID environment variable is not set');
  }

  const auth = getAuth();
  const client = await auth.getIdTokenClient(targetClientId);
  const headers = await client.getRequestHeaders();

  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    options?.timeout ?? 10000
  );

  try {
    return await fetch(url, {
      headers: {
        ...headers,
        Accept: 'application/json',
      },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}
