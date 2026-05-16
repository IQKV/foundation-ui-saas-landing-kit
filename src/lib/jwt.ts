/**
 * Minimal JWT utilities for the landing kit.
 * Decodes the payload without verifying the signature — verification is
 * handled server-side by the API gateway and the IAM service.
 */

export interface JwtPayload {
  sub: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  tenant_id: string | null;
  authorities: string[];
  email_verified: boolean;
  exp: number;
  iat: number;
}

/**
 * Decode a JWT and return its payload, or null if the token is malformed.
 * Does NOT verify the signature.
 */
export function decodeJwt(token: string): JwtPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    // Base64url → base64 → decode
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const json = atob(padded);
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

/** True if the payload represents a valid tenant session. */
export function isTenantSession(payload: JwtPayload): boolean {
  return payload.tenant_id !== null && payload.authorities.length > 0;
}

/** True if the token has not yet expired (with a 10-second buffer). */
export function isTokenFresh(payload: JwtPayload): boolean {
  return payload.exp * 1000 > Date.now() + 10_000;
}
