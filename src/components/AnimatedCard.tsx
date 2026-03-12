import { motion } from "framer-motion";
import { IconBox } from "./IconBox";

interface AnimatedCardProps {
  icon: any;
  title: string;
  description: string;
  delay?: number;
  size?: number;
}

export function AnimatedCard({
  icon,
  title,
  description,
  delay = 0,
  size = 24,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group"
    >
      <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full border border-base-300/50 hover:border-primary/30">
        <div className="card-body">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <IconBox icon={icon} size={size} />
          </motion.div>
          <h3 className="card-title text-xl mt-4 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-base-content/70">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
