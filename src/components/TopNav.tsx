import { motion } from "framer-motion";
import { useAuthStore } from "@/lib/auth-store";
import { UserMenu } from "./UserMenu";

export function TopNav() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <motion.div
      className="navbar bg-base-100/80 backdrop-blur-lg border-b border-base-300/50 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
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
        <motion.a
          href="/"
          className="btn btn-ghost text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          IQ Key Value
        </motion.a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <motion.a href="/features" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Platform
            </motion.a>
          </li>
          <li>
            <motion.a href="/pricing" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Pricing
            </motion.a>
          </li>
          <li>
            <motion.a href="/about" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              About
            </motion.a>
          </li>
          <li>
            <motion.a
              href="https://iqkv.com/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Platform
            </motion.a>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-2">
        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <>
            <motion.a
              href="https://auth.iqkv.dev/login"
              className="btn btn-ghost"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.a>
            <motion.a
              href="https://auth.iqkv.dev/register"
              className="btn btn-primary shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.a>
          </>
        )}
      </div>
    </motion.div>
  );
}
