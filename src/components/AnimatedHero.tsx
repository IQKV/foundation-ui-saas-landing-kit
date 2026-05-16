import { motion } from "framer-motion";
import { Icon } from "@/components/Icon";
import { GithubIcon } from "@hugeicons/core-free-icons";

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
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="badge badge-lg badge-primary gap-2 px-4 py-3">
                🚀 Java 25 · Spring Boot 4 · Apache 2.0
              </span>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Hybrid Tenancy SaaS Foundation
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-4 text-base-content/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              One codebase. Multi-tenant B2B or single-tenant B2C — switch with a config flag.
            </motion.p>

            <motion.p
              className="text-lg md:text-xl mb-10 text-base-content/60"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Production-ready IAM, API Gateway, and Billing services on Kubernetes.
              Schema-per-tenant PostgreSQL isolation. 10-stage CI/CD pipeline included.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
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
                Get Started Free
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl"
        animate={{ y: [0, 20, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}
