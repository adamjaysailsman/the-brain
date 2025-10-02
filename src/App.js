import { useState } from "react";
import { questions } from "./questions";

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;

    // Check if answer is correct
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    // Move to next question or finish
    setTimeout(() => {
      const nextQuestion = currentQuestionIndex + 1;

      if (nextQuestion < questions.length) {
        setCurrentQuestionIndex(nextQuestion);
        setSelectedAnswer(null);
      } else {
        setIsFinished(true);
      }
    }, 500);
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsFinished(false);
    setSelectedAnswer(null);
  };

  // Results screen
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

  // Main game screen with Tailwind UI radio group
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-500">
            Score: {score}
          </div>
        </div>

        {/* Question with Tailwind UI Radio Group */}
        <fieldset>
          <legend className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            {currentQuestion.question}
          </legend>
          <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400 mb-6">
            Select your answer below
          </p>
          <div className="mt-6 space-y-6">
            {currentQuestion.options.map((option) => (
              <div key={option} className="flex items-center">
                <input
                  checked={selectedAnswer === option}
                  onChange={() => setSelectedAnswer(option)}
                  id={option}
                  name="answer"
                  type="radio"
                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                />
                <label
                  htmlFor={option}
                  className="ml-3 block text-sm/6 font-medium text-gray-900 dark:text-white cursor-pointer"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            onClick={handleAnswerSubmit}
            disabled={!selectedAnswer}
            className="w-full rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {selectedAnswer ? "Submit Answer" : "Select an answer"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
