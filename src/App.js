import { useState } from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { questions } from "./questions";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const steps = questions.map((question, index) => {
    let status = "upcoming";
    if (index < currentQuestionIndex) {
      status = "complete";
    } else if (index === currentQuestionIndex) {
      status = "current";
    }
    return {
      name: `Question ${index + 1}`,
      status: status,
    };
  });

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;

    // Show feedback immediately
    setShowFeedback(true);

    // Check if answer is correct and update score
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    // Wait 2 seconds to show feedback, then move to next question
    setTimeout(() => {
      const nextQuestion = currentQuestionIndex + 1;

      if (nextQuestion < questions.length) {
        setCurrentQuestionIndex(nextQuestion);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setIsFinished(true);
      }
    }, 2000); // Increased from 500ms to 2000ms to see feedback
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsFinished(false);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Quiz Complete! 🎉
          </h1>
          <p className="text-6xl font-bold text-indigo-600 dark:text-indigo-500 mb-4">
            {score}
          </p>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            out of {questions.length} questions correct
          </p>
          <button
            onClick={restartGame}
            className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl w-full">
        {/* Progress Bar */}
        <nav aria-label="Progress" className="mb-8">
          <ol role="list" className="flex items-center">
            {steps.map((step, stepIdx) => (
              <li
                key={step.name}
                className={classNames(
                  stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : "",
                  "relative"
                )}
              >
                {step.status === "complete" ? (
                  <>
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center"
                    >
                      <div className="h-0.5 w-full bg-indigo-600 dark:bg-indigo-500" />
                    </div>
                    <div className="relative flex size-8 items-center justify-center rounded-full bg-indigo-600 dark:bg-indigo-500">
                      <CheckIcon
                        aria-hidden="true"
                        className="size-5 text-white"
                      />
                      <span className="sr-only">{step.name}</span>
                    </div>
                  </>
                ) : step.status === "current" ? (
                  <>
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center"
                    >
                      <div className="h-0.5 w-full bg-gray-200 dark:bg-white/15" />
                    </div>
                    <div
                      aria-current="step"
                      className="relative flex size-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white dark:border-indigo-500 dark:bg-gray-900"
                    >
                      <span
                        aria-hidden="true"
                        className="size-2.5 rounded-full bg-indigo-600 dark:bg-indigo-500"
                      />
                      <span className="sr-only">{step.name}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center"
                    >
                      <div className="h-0.5 w-full bg-gray-200 dark:bg-white/15" />
                    </div>
                    <div className="relative flex size-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white dark:border-white/15 dark:bg-gray-900">
                      <span
                        aria-hidden="true"
                        className="size-2.5 rounded-full bg-transparent"
                      />
                      <span className="sr-only">{step.name}</span>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-500">
            Score: {score}
          </div>
        </div>

        {/* Feedback message */}
        {showFeedback && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              selectedAnswer === currentQuestion.correctAnswer
                ? "bg-green-50 dark:bg-green-900/20 border-2 border-green-500"
                : "bg-red-50 dark:bg-red-900/20 border-2 border-red-500"
            }`}
          >
            <p
              className={`text-center font-semibold ${
                selectedAnswer === currentQuestion.correctAnswer
                  ? "text-green-700 dark:text-green-400"
                  : "text-red-700 dark:text-red-400"
              }`}
            >
              {selectedAnswer === currentQuestion.correctAnswer
                ? "✓ Correct!"
                : `✗ Wrong! The correct answer is: ${currentQuestion.correctAnswer}`}
            </p>
          </div>
        )}

        {/* Question with Tailwind UI Radio Group */}
        <fieldset>
          <legend className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            {currentQuestion.question}
          </legend>
          <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400 mb-6">
            Select your answer below
          </p>
          <div className="mt-6 space-y-6">
            {currentQuestion.options.map((option) => {
              // Determine styling based on feedback state
              let inputClass =
                "relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden";

              let labelClass =
                "ml-3 block text-sm/6 font-medium text-gray-900 dark:text-white cursor-pointer";

              // If showing feedback, highlight correct/wrong answers
              if (showFeedback) {
                if (option === currentQuestion.correctAnswer) {
                  inputClass =
                    "relative size-4 appearance-none rounded-full border-2 border-green-500 bg-green-500 before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-green-500 checked:bg-green-500";
                  labelClass =
                    "ml-3 block text-sm/6 font-semibold text-green-700 dark:text-green-400";
                } else if (option === selectedAnswer) {
                  inputClass =
                    "relative size-4 appearance-none rounded-full border-2 border-red-500 bg-red-500 before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-red-500 checked:bg-red-500";
                  labelClass =
                    "ml-3 block text-sm/6 font-semibold text-red-700 dark:text-red-400";
                }
              }

              return (
                <div key={option} className="flex items-center">
                  <input
                    checked={selectedAnswer === option}
                    onChange={() => !showFeedback && setSelectedAnswer(option)}
                    id={option}
                    name="answer"
                    type="radio"
                    disabled={showFeedback}
                    className={inputClass}
                  />
                  <label htmlFor={option} className={labelClass}>
                    {option}
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            onClick={handleAnswerSubmit}
            disabled={!selectedAnswer || showFeedback}
            className="w-full rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed dark:disabled:bg-gray-700"
          >
            {showFeedback
              ? "Next question..."
              : selectedAnswer
              ? "Submit Answer"
              : "Select an answer"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
