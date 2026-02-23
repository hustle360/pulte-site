/**
 * Home — Main poll page orchestrating welcome → section dividers → questions → thank you
 * Design: Editorial Minimalism — full-viewport screens, smooth transitions
 * Welcome screen: full-bleed background image, light text
 * Section dividers: elegant fade-in transition screens between sections
 * Question/ThankYou screens: cream background with subtle gold accents
 */
import { useState, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import ProgressBar from "@/components/ProgressBar";
import WelcomeScreen from "@/components/WelcomeScreen";
import QuestionScreen from "@/components/QuestionScreen";
import ThankYouScreen from "@/components/ThankYouScreen";
import SectionDivider from "@/components/SectionDivider";
import { questions, sectionDividers } from "@/lib/pollData";

type Screen = "welcome" | "divider" | "question" | "thankyou";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  /** Stores conditional field values like q9Ages, q18Other */
  const [conditionalFields, setConditionalFields] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState(1);
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalQuestions = questions.length;

  // Progress calculation
  const progress =
    screen === "welcome" || screen === "divider"
      ? screen === "divider"
        ? ((currentQuestion) / (totalQuestions + 1)) * 100
        : 0
      : screen === "thankyou"
      ? 100
      : ((currentQuestion + 1) / (totalQuestions + 1)) * 100;

  const handleStart = useCallback(() => {
    setDirection(1);
    setScreen("question");
    setCurrentQuestion(0);
  }, []);

  /** Navigate to next question, checking for section dividers */
  const goToQuestion = useCallback(
    (nextIndex: number) => {
      if (nextIndex >= totalQuestions) {
        setScreen("thankyou");
        return;
      }
      // Check if this question starts a new section that has a divider
      if (sectionDividers[nextIndex]) {
        setCurrentQuestion(nextIndex);
        setScreen("divider");
      } else {
        setCurrentQuestion(nextIndex);
        setScreen("question");
      }
    },
    [totalQuestions]
  );

  const handleDividerContinue = useCallback(() => {
    setScreen("question");
  }, []);

  const handleSelect = useCallback(
    (value: string) => {
      const q = questions[currentQuestion];
      setAnswers((prev) => ({ ...prev, [currentQuestion]: value }));

      // Only auto-advance for single-select questions without conditional fields
      if (!q.multiSelect && !q.conditionalField) {
        if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
        autoAdvanceTimer.current = setTimeout(() => {
          setDirection(1);
          goToQuestion(currentQuestion + 1);
        }, 400);
      }
    },
    [currentQuestion, goToQuestion]
  );

  const handleConditionalFieldChange = useCallback(
    (fieldKey: string, value: string) => {
      setConditionalFields((prev) => ({ ...prev, [fieldKey]: value }));
    },
    []
  );

  const handleNext = useCallback(() => {
    if (!answers[currentQuestion]) return;
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    setDirection(1);
    goToQuestion(currentQuestion + 1);
  }, [currentQuestion, answers, goToQuestion]);

  const handleBack = useCallback(() => {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    setDirection(-1);
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setScreen("question");
    }
  }, [currentQuestion]);

  const isWelcome = screen === "welcome";
  const isDivider = screen === "divider";

  return (
    <div
      className="min-h-dvh relative overflow-hidden"
      style={{
        backgroundColor: isWelcome ? "#1a1a1a" : isDivider ? "#FAF7F2" : undefined,
      }}
    >
      {/* Subtle background radial accents — only on question/thankyou screens */}
      {!isWelcome && !isDivider && (
        <div
          className="fixed inset-0 pointer-events-none z-0 bg-cream"
          style={{
            background:
              "radial-gradient(circle at 20% 80%, rgba(201,169,110,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(201,169,110,0.03) 0%, transparent 50%)",
          }}
        />
      )}

      {/* Progress Bar */}
      <ProgressBar progress={progress} />

      {/* Main Content */}
      <AnimatePresence mode="wait" initial={false}>
        {screen === "welcome" && (
          <WelcomeScreen key="welcome" onStart={handleStart} />
        )}

        {screen === "divider" && sectionDividers[currentQuestion] && (
          <SectionDivider
            key={`divider-${currentQuestion}`}
            headline={sectionDividers[currentQuestion].headline}
            subtext={sectionDividers[currentQuestion].subtext}
            image={sectionDividers[currentQuestion].image}
            onContinue={handleDividerContinue}
          />
        )}

        {screen === "question" && (
          <div className="relative z-10 w-full max-w-[520px] mx-auto min-h-dvh">
            <QuestionScreen
              key={`q-${currentQuestion}`}
              question={questions[currentQuestion]}
              questionIndex={currentQuestion}
              totalQuestions={totalQuestions}
              selectedAnswer={answers[currentQuestion] || null}
              onSelect={handleSelect}
              onConditionalFieldChange={handleConditionalFieldChange}
              conditionalFieldValue={
                questions[currentQuestion].conditionalField
                  ? conditionalFields[
                      questions[currentQuestion].conditionalField!.fieldKey
                    ] ?? ""
                  : undefined
              }
              onNext={handleNext}
              onBack={handleBack}
              direction={direction}
            />
          </div>
        )}

        {screen === "thankyou" && (
          <div className="relative z-10 w-full max-w-[520px] mx-auto min-h-dvh">
            <ThankYouScreen
              key="thankyou"
              answers={answers}
              conditionalFields={conditionalFields}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
