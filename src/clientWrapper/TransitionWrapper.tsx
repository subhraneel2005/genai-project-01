// components/PageTransition.tsx
"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <div style={{ overflow: "hidden" }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            ease: "easeOut",
            duration: 0.2,
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
