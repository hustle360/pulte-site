/**
 * OptionCard — Selection card with two modes:
 *   1. Image-backed: Cinematic dark overlay, bottom-aligned white label, gold selection state
 *   2. Compact (text-only): Clean bordered card with gold selection state
 *
 * Both modes enforce equal height via aspect-ratio for consistent grid alignment.
 */
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { PollOption } from "@/lib/pollData";

export interface OptionCardProps {
  option: PollOption;
  isSelected: boolean;
  onSelect: () => void;
  /** If true, renders a compact text-only card (no image) */
  compact?: boolean;
}

export default function OptionCard({
  option,
  isSelected,
  onSelect,
  compact,
}: OptionCardProps) {
  const handleSelect = () => {
    // Haptic feedback on supported mobile devices
    if (navigator.vibrate) {
      navigator.vibrate(8);
    }
    onSelect();
  };

  // Compact text-only mode
  if (compact || !option.image) {
    return (
      <motion.button
        onClick={handleSelect}
        className={`
          relative overflow-hidden rounded-xl w-full
          flex items-center justify-center text-center
          px-4 py-5 transition-all duration-300 ease-out
          focus:outline-none focus-visible:ring-2 focus-visible:ring-gold
          border-2
          ${
            isSelected
              ? "border-gold bg-[rgba(201,169,110,0.1)]"
              : "border-[rgba(44,44,44,0.12)] bg-white hover:border-[rgba(201,169,110,0.4)] hover:bg-[rgba(201,169,110,0.03)]"
          }
        `}
        whileTap={{ scale: 0.97 }}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <span
          className={`text-[0.85rem] font-medium tracking-wide transition-colors duration-300 ${
            isSelected ? "text-gold" : "text-charcoal"
          }`}
        >
          {option.label}
        </span>

        {/* Checkmark */}
        <motion.div
          initial={false}
          animate={{
            opacity: isSelected ? 1 : 0,
            scale: isSelected ? 1 : 0.5,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gold flex items-center justify-center"
        >
          <Check className="w-3 h-3 text-white" strokeWidth={3} />
        </motion.div>
      </motion.button>
    );
  }

  // Image-backed mode — fixed aspect ratio for equal height alignment
  return (
    <motion.button
      onClick={handleSelect}
      className={`
        relative overflow-hidden rounded-2xl w-full
        flex items-end justify-center
        transition-all duration-300 ease-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-gold
        ${isSelected ? "ring-[3px] ring-gold" : "ring-0"}
      `}
      whileTap={{ scale: 0.97 }}
      style={{
        WebkitTapHighlightColor: "transparent",
        aspectRatio: "4 / 3",
      }}
    >
      {/* Background Image */}
      <img
        src={option.image}
        alt={option.label}
        loading="lazy"
        className={`
          absolute inset-0 w-full h-full object-cover
          transition-transform duration-500 ease-out
          ${isSelected ? "scale-105" : "scale-100"}
        `}
      />

      {/* Overlay */}
      <div
        className={`
          absolute inset-0 transition-all duration-300
          ${
            isSelected
              ? "bg-gradient-to-t from-[rgba(160,130,70,0.7)] via-[rgba(160,130,70,0.3)] to-[rgba(160,130,70,0.1)]"
              : "bg-gradient-to-t from-[rgba(20,20,20,0.85)] via-[rgba(20,20,20,0.4)] to-[rgba(20,20,20,0.15)]"
          }
        `}
      />

      {/* Label */}
      <span className="relative z-10 pb-3.5 text-white text-[0.8rem] font-medium tracking-wide text-center drop-shadow-md px-2">
        {option.label}
      </span>

      {/* Checkmark */}
      <motion.div
        initial={false}
        animate={{
          opacity: isSelected ? 1 : 0,
          scale: isSelected ? 1 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-gold flex items-center justify-center z-10"
      >
        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
      </motion.div>
    </motion.button>
  );
}
