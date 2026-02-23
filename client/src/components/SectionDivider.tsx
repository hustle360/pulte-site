/**
 * SectionDivider — elegant transition screen between poll sections.
 * Shows a headline, subtext, and optional background image with a soft fade.
 * Auto-advances after a brief pause, or user can tap to continue.
 */
import { motion } from "framer-motion";
import { useEffect } from "react";

interface SectionDividerProps {
  headline: string;
  subtext: string;
  image?: string;
  onContinue: () => void;
}

export default function SectionDivider({
  headline,
  subtext,
  image,
  onContinue,
}: SectionDividerProps) {
  // Auto-advance after 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(onContinue, 2500);
    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer"
      onClick={onContinue}
      style={{ backgroundColor: "#FAF7F2" }}
    >
      {/* Optional background image with heavy overlay */}
      {image && (
        <div className="absolute inset-0">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.3) saturate(0.6)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        </div>
      )}

      <div className="relative z-10 text-center px-8 max-w-lg">
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mx-auto mb-6 h-px w-16"
          style={{ backgroundColor: "#C9A96E" }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-serif text-3xl md:text-4xl font-semibold mb-4"
          style={{ color: image ? "#FFFFFF" : "#2C2C2C" }}
        >
          {headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-base md:text-lg leading-relaxed"
          style={{ color: image ? "rgba(255,255,255,0.8)" : "#6B6B6B" }}
        >
          {subtext}
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mx-auto mt-6 h-px w-16"
          style={{ backgroundColor: "#C9A96E" }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-8 text-xs tracking-widest uppercase"
          style={{ color: image ? "rgba(255,255,255,0.5)" : "#AAAAAA" }}
        >
          Tap to continue
        </motion.p>
      </div>
    </motion.div>
  );
}
