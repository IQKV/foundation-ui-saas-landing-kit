import { motion } from "framer-motion";
import { Icon } from "./Icon";
import { IconBox } from "./IconBox";
import { Tick02Icon } from "@hugeicons/core-free-icons";

interface FeatureCardProps {
  icon: any;
  title: string;
  description: string;
  features: string[];
  delay?: number;
}

export function FeatureCard({ icon, title, description, features, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group"
    >
      <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 h-full border border-base-300/50 hover:border-primary/30">
        <div className="card-body">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <IconBox icon={icon} />
          </motion.div>
          <h2 className="card-title text-2xl mt-4 group-hover:text-primary transition-colors">
            {title}
          </h2>
          <p className="text-base-content/70 mb-4">{description}</p>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.1 + index * 0.05 }}
              >
                <Icon icon={Tick02Icon} size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
