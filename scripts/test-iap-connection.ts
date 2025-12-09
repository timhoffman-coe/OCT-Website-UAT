import { GoogleAuth } from 'google-auth-library';

async function main() {
    const targetUrl = process.argv[2];
    const targetAudience = process.argv[3] || targetUrl; // Use URL as audience if Client ID not provided

    if (!targetUrl) {
        console.error('Usage: npx tsx scripts/test-iap-connection.ts <TARGET_URL> [TARGET_CLIENT_ID]');
        process.exit(1);
    }

    console.log(`Testing connection to: ${targetUrl}`);
    console.log(`Using Audience: ${targetAudience}`);

    try {
        const auth = new GoogleAuth();
        console.log('Acquiring identity token...');

        // Create an identity client to get the ID token
        const client = await auth.getIdTokenClient(targetAudience);

        // We can use the client to request request, which automatically adds the token
        // But to be explicit and debug, let's get the token and use fetch (or just use client.request)
        // client.request will automatically add the Authorization header

        console.log('Making authenticated request...');
        const res = await client.request({
            url: targetUrl,
            method: 'GET',
        });

        console.log(`\nResponse Status: ${res.status} ${res.statusText}`);
        console.log('Response Headers:', res.headers);

        // Try to print a snippet of the body to confirm we got real content
        if (res.data) {
            const body = typeof res.data === 'string' ? res.data : JSON.stringify(res.data);
            console.log('\nResponse Snippet:', body.substring(0, 500));
        }

        if (res.status === 200) {
            console.log('\n✅ SUCCESS: Successfully authenticated and retrieved content.');
        } else {
            console.log('\n❌ FAILED: Did not receive a 200 OK response.');
        }

    } catch (error: any) {
        console.error('\n❌ ERROR:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
        console.log('\nTroubleshooting Tips:');
        console.log('1. Ensure you are authenticated (run "gcloud auth application-default login").');
        console.log('2. Ensure your account/service account has the "IAP-Secured Web App User" role on the target project/resource.');
        console.log('3. If the target expects a specific Audience (IAP Client ID), provide it as the second argument.');
    }
}

main().catch(console.error);
