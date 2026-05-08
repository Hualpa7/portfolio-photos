import { motion } from "motion/react";
import { memo } from "react";

interface SkeletonLoaderProps {
  count?: number;
  columns?: 1 | 2 | 3;
}

export const SkeletonLoader = memo(({ count = 6, columns = 3 }: SkeletonLoaderProps) => {
  return (
    <div className={`grid grid-cols-${columns} gap-4`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={`bg-muted rounded-sm ${
            i % 5 === 0 && columns === 3 ? "sm:col-span-2 sm:row-span-2 aspect-square" : "aspect-[4/5]"
          }`}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
});

SkeletonLoader.displayName = "SkeletonLoader";

export default SkeletonLoader;
