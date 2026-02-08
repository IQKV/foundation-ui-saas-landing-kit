import { useAuthStore } from "@/lib/auth-store";
import { UserMenu } from "./UserMenu";

export function TopNav() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <div className="navbar bg-base-100 border-b">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a href="/features">Platform</a>
            </li>
            <li>
              <a href="/pricing">Pricing</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </div>
        <a href="/" className="btn btn-ghost text-xl">
          IQ Scaffold
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/features">Platform</a>
          </li>
          <li>
            <a href="/pricing">Pricing</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="https://iqkv.com/">Explore Platform</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-2">
        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <>
            <a
              href="https://auth.iqscaffold.com/login"
              className="btn btn-ghost"
            >
              Login
            </a>
            <a
              href="https://auth.iqscaffold.com/register"
              className="btn btn-primary"
            >
              Sign Up
            </a>
          </>
        )}
      </div>
    </div>
  );
}
