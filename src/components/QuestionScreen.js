import ProgressBar from "./ProgressBar";

export default function QuestionScreen({
  steps,
  currentQuestionIndex,
  totalQuestions,
  coins,
  currentBet,
  currentQuestion,
  selectedAnswer,
  showFeedback,
  onAnswerSelect,
  onSubmit,
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <ProgressBar steps={steps} />

        <div className="flex justify-between items-center mb-6">
          <div className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm font-semibold text-yellow-600 dark:text-yellow-500">
              💰 {coins} coins
            </div>
            <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-500">
              Bet: {currentBet}
            </div>
          </div>
        </div>

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
                ? `✓ Correct! +${currentBet} coins`
                : `✗ Wrong! -${currentBet} coins. The correct answer is: ${currentQuestion.correctAnswer}`}
            </p>
          </div>
        )}

        <fieldset>
          <legend className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            {currentQuestion.question}
          </legend>
          <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400 mb-6">
            Select your answer below
          </p>
          <div className="mt-6 space-y-6">
            {currentQuestion.options.map((option) => {
              let inputClass =
                "relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden";

              let labelClass =
                "ml-3 block text-sm/6 font-medium text-gray-900 dark:text-white cursor-pointer";

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
                    onChange={() => !showFeedback && onAnswerSelect(option)}
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

        <div className="mt-8">
          <button
            onClick={onSubmit}
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
