import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

interface TypewriterTextProps {
  content: string;
  isComplete?: boolean;
}

export function TypewriterText({ content, isComplete = false }: TypewriterTextProps) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (isComplete) {
      controls.start({
        opacity: 1,
        transition: { duration: 0.2 }
      });
    }
  }, [isComplete, controls]);

  return (
    <div className="relative">
      <motion.p
        initial={{ opacity: 0 }}
        animate={controls}
        className="whitespace-pre-wrap"
      >
        {content}
      </motion.p>
      {!isComplete && (
        <motion.span
          className="absolute -right-3 top-0 h-4 w-0.5 bg-current"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </div>
  );
} 