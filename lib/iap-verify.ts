import { jwtVerify, createRemoteJWKSet } from 'jose';

const JWKS = createRemoteJWKSet(
  new URL('https://www.gstatic.com/iap/verify/public_key-jwk')
);

export async function verifyIAPJwt(token: string) {
  const { payload } = await jwtVerify(token, JWKS, {
    issuer: 'https://cloud.google.com/iap',
    audience: process.env.IAP_AUDIENCE,
  });
  return {
    email: payload.email as string,
    name: (payload.name as string) || (payload.email as string),
  };
}
