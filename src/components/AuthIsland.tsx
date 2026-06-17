/**
 * AuthIsland — React island that bootstraps the auth state on every page load.
 *
 * Renders nothing visible. Mounts once (`client:only="react"`) and:
 *
 * 1. Reads `iqkv_refresh_token` + `iqkv_tenant_key` from sessionStorage
 *    (written by foundation-ui-app after sign-in).
 * 2. If present, calls the IAM refresh endpoint to obtain a fresh access token.
 * 3. Decodes the JWT, validates it is a tenant session, and populates the
 *    Zustand auth store so TopNav can show the user menu.
 * 4. If no session exists (or refresh fails), marks loading as done so the
 *    nav renders the Login / Sign Up buttons.
 *
 * This island must be rendered before TopNav so the store is populated before
 * the nav reads it. In BaseLayout it is placed first in <body>.
 */
import { useEffect } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { decodeJwt, isTenantSession, isTokenFresh } from "@/lib/jwt";

const REFRESH_TOKEN_KEY = "iqkv_refresh_token";
const TENANT_KEY_KEY = "iqkv_tenant_key";

const AUTH_URL = import.meta.env.PUBLIC_API_URL ?? "https://api.iqkv.site/api";

export function AuthIsland() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    void bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function bootstrap() {
    try {
      const refreshToken = sessionStorage.getItem(REFRESH_TOKEN_KEY);
      const tenantKey = sessionStorage.getItem(TENANT_KEY_KEY);

      if (!refreshToken || !tenantKey) {
        setLoading(false);
        return;
      }

      // Call the IAM refresh endpoint (same as foundation-ui-app uses).
      const res = await fetch(`${AUTH_URL}/v1/iam/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Tenant-ID": tenantKey,
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) {
        // Refresh failed — clear stale session keys and show logged-out nav.
        sessionStorage.removeItem(REFRESH_TOKEN_KEY);
        sessionStorage.removeItem(TENANT_KEY_KEY);
        setLoading(false);
        return;
      }

      const data = (await res.json()) as {
        accessToken: string;
        refreshToken: string;
        tenantKey: string;
      };

      // Persist the new refresh token so the main app also benefits.
      sessionStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
      sessionStorage.setItem(TENANT_KEY_KEY, data.tenantKey);

      const payload = decodeJwt(data.accessToken);

      if (!payload || !isTenantSession(payload) || !isTokenFresh(payload)) {
        sessionStorage.removeItem(REFRESH_TOKEN_KEY);
        sessionStorage.removeItem(TENANT_KEY_KEY);
        setLoading(false);
        return;
      }

      setAuth(
        {
          userId: payload.userId,
          email: payload.email,
          firstName: payload.firstName,
          lastName: payload.lastName,
          tenantId: payload.tenant_id,
          authorities: payload.authorities,
        },
        data.accessToken,
      );
    } catch {
      // Network error or JSON parse failure — treat as unauthenticated.
      setLoading(false);
    }
  }

  // Renders nothing — pure side-effect island.
  return null;
}
