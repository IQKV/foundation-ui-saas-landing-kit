/**
 * Auth store for the landing kit.
 *
 * Session detection strategy:
 * - The foundation-ui-app stores the refresh token + tenant key in sessionStorage
 *   under the keys `iqkv_refresh_token` and `iqkv_tenant_key`.
 * - On mount, `AuthIsland` checks for those keys and, if present, calls the IAM
 *   refresh endpoint to obtain a fresh access token, then decodes the JWT to
 *   populate this store.
 * - The access token is kept in memory only (not persisted) to match the
 *   security model of the main app.
 * - User profile fields are derived from the JWT payload — no separate profile
 *   API call is needed for the nav bar.
 */
import { create } from "zustand";

// ─── Types ────────────────────────────────────────────────────────────────────

/** Subset of the JWT payload used for display in the nav. */
export interface AuthUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  tenantId: string | null;
  authorities: string[];
}

interface AuthStore {
  /** Decoded user info from the JWT, or null when not authenticated. */
  user: AuthUser | null;
  /** In-memory access token — never persisted. */
  accessToken: string | null;
  /** True once a valid tenant session is confirmed. */
  isAuthenticated: boolean;
  /** True while the silent-refresh check is in flight on first mount. */
  isLoading: boolean;
  setAuth: (user: AuthUser, accessToken: string) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true, // start loading until AuthIsland resolves

  setAuth: (user, accessToken) =>
    set({ user, accessToken, isAuthenticated: true, isLoading: false }),

  setLoading: (loading) => set({ isLoading: loading }),

  logout: () => {
    // Clear the session keys written by foundation-ui-app so the main app
    // also considers the user signed out on next visit.
    try {
      sessionStorage.removeItem("iqkv_refresh_token");
      sessionStorage.removeItem("iqkv_tenant_key");
    } catch {
      // ignore storage errors (private browsing, etc.)
    }
    set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false });
  },
}));
