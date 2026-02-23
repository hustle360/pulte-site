/**
 * WelcomeScreen — Opening screen with community building background + Greyhawk Landing branding
 * Design: Full-bleed dark photo background, light/white text for contrast
 * Logo placed above headline for strong community branding
 */
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const BG_IMAGE =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030067302/PgwhoFuhdWalrXoO.jpeg";


interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center text-center px-7 min-h-dvh overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/55 to-black/40" />

      {/* Content — all light/white text */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Gold accent line */}
        <div className="w-12 h-[2px] bg-gold-light rounded-full mb-8" />

        <h1 className="font-serif text-[2rem] sm:text-[2.4rem] font-semibold leading-[1.2] text-white tracking-[-0.02em] mb-5 drop-shadow-lg">
          Shape the Future of Greyhawk Landing
        </h1>

        <p className="text-base text-white/80 font-light leading-relaxed max-w-[340px] mb-12 drop-shadow-md" style={{fontSize: '18px', fontWeight: '500'}}>
          Your voice matters. Help us design an extraordinary lifestyle experience for our community.
        </p>

        <motion.button
          onClick={onStart}
          className="inline-flex items-center gap-2.5 bg-white/95 text-charcoal-deep px-10 py-4 rounded-full text-[0.9rem] font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:bg-white hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 backdrop-blur-sm"
          whileTap={{ scale: 0.97 }}
        >
          Take the poll
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}
