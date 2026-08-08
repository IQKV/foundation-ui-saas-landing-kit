import { motion } from "framer-motion";
import { Icon } from "@/components/Icon";
import {
  GithubIcon,
  SecurityLockIcon,
  CreditCardIcon,
  Globe02Icon,
  Book01Icon,
} from "@hugeicons/core-free-icons";

const APP_URL = import.meta.env.PUBLIC_APP_URL ?? "https://app.iqkv.site";

export function AnimatedHero() {
  return (
    <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(107, 114, 128, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(167, 139, 250, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(52, 211, 153, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(107, 114, 128, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Hybrid Tenancy & Identity Federation
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl mb-4 text-base-content/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                One codebase. Multi-tenant B2B or single-tenant B2C, with OAuth2/OIDC social login
                and tenant-scoped enterprise SSO built in.
              </motion.p>
              <motion.p
                className="text-lg md:text-xl mb-10 text-base-content/60"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Five production-ready services: IAM, Gateway, Billing, CMS and Audit. Two React
                SPAs: Tenant App and Platform Admin. Kubernetes-native with Helm charts and
                selectable Stripe or Lemon Squeezy billing.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <motion.a
                  href="https://github.com/IQKV/microservices-platform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg gap-2 shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon icon={GithubIcon} size={20} />
                  View on GitHub
                </motion.a>
                <motion.a
                  href={`${APP_URL}/signup`}
                  className="btn btn-outline btn-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Live Demo
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Visual side with floating icons */}
          <div className="relative hidden lg:block">
            <motion.div
              className="relative w-full h-96"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {/* Central card */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl border border-primary/30 flex items-center justify-center"
                animate={{ rotate: [0, 2, 0, -2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-center">
                  <span className="block text-4xl mb-2">🏗️</span>
                  <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Start Strong. Scale Faster.
                  </span>
                </div>
              </motion.div>

              {/* Floating service icons */}
              <motion.div
                className="absolute top-4 left-8 w-20 h-20 bg-base-100 rounded-2xl shadow-lg border border-base-300 flex items-center justify-center"
                animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0 }}
              >
                <Icon icon={SecurityLockIcon} size={32} className="text-primary" />
              </motion.div>

              <motion.div
                className="absolute top-4 right-8 w-20 h-20 bg-base-100 rounded-2xl shadow-lg border border-base-300 flex items-center justify-center"
                animate={{ y: [0, 12, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Icon icon={Globe02Icon} size={32} className="text-secondary" />
              </motion.div>

              <motion.div
                className="absolute bottom-8 left-12 w-20 h-20 bg-base-100 rounded-2xl shadow-lg border border-base-300 flex items-center justify-center"
                animate={{ y: [0, 8, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Icon icon={CreditCardIcon} size={32} className="text-accent" />
              </motion.div>

              <motion.div
                className="absolute bottom-8 right-12 w-20 h-20 bg-base-100 rounded-2xl shadow-lg border border-base-300 flex items-center justify-center"
                animate={{ y: [0, -8, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <Icon icon={Book01Icon} size={32} className="text-info" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating background elements */}
      <motion.div
        className="absolute top-20 left-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl"
        animate={{ y: [0, -30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl"
        animate={{ y: [0, 30, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-4 w-16 h-16 bg-accent/10 rounded-full blur-xl"
        animate={{ y: [0, 20, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-4 w-20 h-20 bg-info/10 rounded-full blur-xl"
        animate={{ y: [0, -20, 20, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}
