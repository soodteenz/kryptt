import { motion } from "framer-motion";

export function LoadingDots() {
  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          className="h-2 w-2 bg-current rounded-full"
          initial={{ opacity: 0.5, scale: 0.5 }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: dot * 0.2,
          }}
        />
      ))}
    </div>
  );
} 