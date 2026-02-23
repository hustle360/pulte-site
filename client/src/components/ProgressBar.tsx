/**
 * ProgressBar — Thin gold bar at the top of the viewport
 * Design: 3px height, gold gradient, smooth animated width
 */
import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number; // 0 to 100
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] bg-border z-50">
      <motion.div
        className="h-full rounded-r-sm"
        style={{
          background: "linear-gradient(90deg, #C9A96E, #D4BA8A)",
        }}
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </div>
  );
}
