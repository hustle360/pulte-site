/**
 * QuestionScreen — Single question with option cards
 * Supports: single-select, multi-select (with optional max), conditional text fields
 * Design: Question number in gold, serif headline, 2-col grid, nav buttons
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptionCard from "./OptionCard";
import type { PollQuestion } from "@/lib/pollData";

interface QuestionScreenProps {
  question: PollQuestion;
  questionIndex: number;
  totalQuestions: number;
  /** For single-select: string; for multi-select: comma-separated string */
  selectedAnswer: string | null;
  /** For single-select: pass the label; for multi-select: pass comma-separated labels */
  onSelect: (value: string) => void;
  /** Called when conditional field value changes */
  onConditionalFieldChange?: (fieldKey: string, value: string) => void;
  conditionalFieldValue?: string;
  onNext: () => void;
  onBack: () => void;
  direction: number;
}

export default function QuestionScreen({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  onSelect,
  onConditionalFieldChange,
  conditionalFieldValue,
  onNext,
  onBack,
  direction,
}: QuestionScreenProps) {
  const isMultiSelect = question.multiSelect === true;
  const maxSelect = question.maxSelect;

  // Parse multi-select values from comma-separated string
  const selectedValues = isMultiSelect
    ? (selectedAnswer?.split(",").filter(Boolean) ?? [])
    : [];

  const isOptionSelected = (label: string) => {
    if (isMultiSelect) {
      return selectedValues.includes(label);
    }
    return selectedAnswer === label;
  };

  const handleOptionClick = (label: string) => {
    if (isMultiSelect) {
      let newValues: string[];
      if (selectedValues.includes(label)) {
        // Deselect
        newValues = selectedValues.filter((v) => v !== label);
      } else {
        // If "None" is selected, clear everything else
        if (label === "None") {
          newValues = ["None"];
        } else {
          // Remove "None" if present, then add
          newValues = selectedValues.filter((v) => v !== "None");
          if (maxSelect && newValues.length >= maxSelect) {
            return; // At max
          }
          newValues.push(label);
        }
      }
      onSelect(newValues.join(","));
    } else {
      onSelect(label);
    }
  };

  // Check if conditional field should show
  const showConditionalField =
    question.conditionalField &&
    ((isMultiSelect && selectedValues.includes(question.conditionalField.triggerValue)) ||
      (!isMultiSelect && selectedAnswer === question.conditionalField.triggerValue));

  const hasAnswer = isMultiSelect
    ? selectedValues.length > 0
    : !!selectedAnswer;

  // Check if any option has an image
  const hasImages = question.options.some((o) => !!o.image);

  return (
    <motion.div
      key={questionIndex}
      className="flex flex-col px-5 sm:px-7 pt-6 sm:pt-8 pb-8 min-h-dvh overflow-y-auto overflow-x-hidden"
      initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Progress bar */}
      <div className="mt-5 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-charcoal/8 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #C9A96E, #D4B87A)" }}
              initial={{ width: 0 }}
              animate={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>
          <span className="text-[0.7rem] font-medium tracking-[0.08em] text-gold/70 tabular-nums shrink-0">
            {questionIndex + 1}/{totalQuestions}
          </span>
        </div>
      </div>

      {/* Headline */}
      <h2 className="font-serif text-[1.6rem] sm:text-[1.8rem] font-semibold text-charcoal leading-[1.25] tracking-[-0.01em] mb-2">
        {question.headline}
      </h2>

      {/* Multi-select hint */}
      {isMultiSelect && (
        <p className="text-xs text-muted-foreground mb-4 tracking-wide">
          Select all that apply{maxSelect ? ` (max ${maxSelect})` : ""}
        </p>
      )}
      {!isMultiSelect && <div className="mb-4" />}

      {/* Options Grid */}
      <div className={`grid ${hasImages ? (question.options.length > 6 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2") : "grid-cols-2 sm:grid-cols-3"} gap-3 items-start`}>
        {question.options.map((option) => (
          <OptionCard
            key={option.label}
            option={option}
            isSelected={isOptionSelected(option.label)}
            onSelect={() => handleOptionClick(option.label)}
            compact={!hasImages}
          />
        ))}
      </div>

      {/* Conditional text field */}
      <AnimatePresence>
        {showConditionalField && question.conditionalField && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <input
              type="text"
              placeholder={question.conditionalField.placeholder}
              value={conditionalFieldValue ?? ""}
              onChange={(e) =>
                onConditionalFieldChange?.(
                  question.conditionalField!.fieldKey,
                  e.target.value
                )
              }
              className="w-full px-4 py-3 rounded-xl border text-sm font-sans transition-colors focus:outline-none focus:ring-2"
              style={{
                backgroundColor: "rgba(201, 169, 110, 0.06)",
                borderColor: "rgba(201, 169, 110, 0.3)",
                color: "#2C2C2C",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-5 pb-3 shrink-0">
        {questionIndex > 0 ? (
          <button
            onClick={onBack}
            className="bg-transparent text-muted-foreground px-6 py-3 rounded-full text-[0.85rem] font-medium tracking-wide transition-colors hover:text-charcoal"
          >
            Back
          </button>
        ) : (
          <div />
        )}
        <button
          onClick={onNext}
          disabled={!hasAnswer}
          className="bg-charcoal text-cream px-8 py-3.5 rounded-full text-[0.8rem] font-medium tracking-[0.06em] uppercase transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:bg-charcoal-deep enabled:hover:-translate-y-0.5 enabled:hover:shadow-md enabled:active:translate-y-0"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
}
