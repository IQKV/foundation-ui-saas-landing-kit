import { useAuthStore } from "@/lib/auth-store";

export function UserMenu() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  if (!user) {
    return null;
  }

  const initials =
    `${user.firstName?.[0] ?? user.username[0]}${user.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {user.avatarUrl ? (
            <img alt={user.username} src={user.avatarUrl} />
          ) : (
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content w-10 rounded-full">
                <span className="text-sm">{initials}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        <li className="menu-title">
          <div className="flex flex-col">
            <span className="font-medium">
              {user.firstName} {user.lastName}
            </span>
            <span className="text-xs opacity-60">{user.email}</span>
          </div>
        </li>
        <li>
          <button onClick={() => logout()} className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
