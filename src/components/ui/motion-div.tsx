"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface MotionDivProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
}

export function MotionDiv({ children, ...rest }: MotionDivProps) {
  return (
    <motion.div {...rest}>
      {children}
    </motion.div>
  );
}