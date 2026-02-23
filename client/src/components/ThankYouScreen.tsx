/**
 * ThankYouScreen — Final screen with email capture and server-side persistence
 * Submits all poll responses (q0–q20 + conditional fields) via tRPC to the database
 */
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";

export interface ThankYouScreenProps {
  answers: Record<number, string>;
  conditionalFields?: Record<string, string>;
}

export default function ThankYouScreen({
  answers,
  conditionalFields = {},
}: ThankYouScreenProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.poll.submit.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const handleSubmit = () => {
    submitMutation.mutate({
      email: email || "",
      // Original 7 questions
      q0: answers[0] || "",
      q1: answers[1] || "",
      q2: answers[2] || "",
      q3: answers[3] || "",
      q4: answers[4] || "",
      q5: answers[5] || "",
      q6: answers[6] || "",
      // Household & Life Stage
      q7: answers[7] || "",
      q8: answers[8] || "",
      q9: answers[9] || "",
      q9Ages: conditionalFields["q9Ages"] || "",
      // Age & Work Stage
      q10: answers[10] || "",
      q11: answers[11] || "",
      // Availability
      q12: answers[12] || "",
      q13: answers[13] || "",
      // Wellness
      q14: answers[14] || "",
      q15: answers[15] || "",
      // Lifestyle
      q16: answers[16] || "",
      q17: answers[17] || "",
      // Pets & Hobbies
      q18: answers[18] || "",
      q18Other: conditionalFields["q18Other"] || "",
      q19: answers[19] || "",
      // Communication
      q20: answers[20] || "",
    });
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center px-7 min-h-dvh"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Gold checkmark circle */}
      <div className="w-[60px] h-[60px] rounded-full bg-gold-muted flex items-center justify-center mb-8">
        <Check className="w-6 h-6 text-gold" strokeWidth={2} />
      </div>

      <h2 className="font-serif text-[2.2rem] font-semibold text-charcoal mb-4">
        Thank You.
      </h2>

      <p className="text-base text-muted-foreground font-light leading-relaxed mb-10">
        We&rsquo;re building something exceptional.
      </p>

      {/* Email section */}
      <div className="w-full max-w-[340px]">
        <label className="block text-[0.75rem] font-medium tracking-[0.1em] uppercase text-muted-foreground/70 mb-3">
          Enter your email for VIP access (optional)
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={submitted || submitMutation.isPending}
          className="w-full px-5 py-4 border border-border rounded-xl font-sans text-base text-charcoal bg-white outline-none transition-all duration-300 placeholder:text-muted-foreground/40 placeholder:font-light focus:border-gold focus:ring-[3px] focus:ring-gold-muted disabled:opacity-60 mb-5"
        />

        <motion.button
          onClick={handleSubmit}
          disabled={submitted || submitMutation.isPending}
          className={`
            w-full py-4 px-8 rounded-full text-[0.85rem] font-medium tracking-[0.08em] uppercase transition-all duration-300 inline-flex items-center justify-center gap-2
            ${
              submitted
                ? "bg-gold text-white cursor-default"
                : "bg-charcoal text-cream hover:bg-charcoal-deep hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
            }
          `}
          whileTap={submitted ? {} : { scale: 0.97 }}
        >
          {submitMutation.isPending && (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}
          {submitted
            ? "Submitted"
            : submitMutation.isPending
            ? "Submitting\u2026"
            : "Submit & Stay Connected"}
        </motion.button>

        {/* Error */}
        {submitMutation.isError && (
          <p className="mt-3 text-[0.85rem] text-red-500">
            Something went wrong. Please try again.
          </p>
        )}

        {/* Confirmation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: submitted ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="mt-5 text-[0.9rem] text-gold font-normal"
        >
          Your response has been recorded.
        </motion.p>
      </div>
    </motion.div>
  );
}
