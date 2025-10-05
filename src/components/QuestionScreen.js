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
    <div className="min-h-screen bg-beige flex items-center justify-center p-4">
      <div className="bg-green rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <ProgressBar
          steps={steps}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
        />

        <div className="flex justify-between items-center mb-6">
          <div className="text-sm font-semibold text-beige">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm font-semibold text-[#F4EBBE] bg-[#75704E] px-3 py-1 rounded-full">
              💰 {coins} coins
            </div>
            <div className="text-sm font-semibold text-[#75704E] border-2 border-[#75704E] px-3 py-1 rounded-full">
              Bet: {currentBet}
            </div>
          </div>
        </div>

        {showFeedback && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              selectedAnswer === currentQuestion.correctAnswer
                ? "bg-gray border-2 border-beige"
                : "bg-red-50  border-2 border-red-500"
            }`}
          >
            <p
              className={`text-center font-semibold ${
                selectedAnswer === currentQuestion.correctAnswer
                  ? "text-beige"
                  : "text-gray"
              }`}
            >
              {selectedAnswer === currentQuestion.correctAnswer
                ? `✓ Correct! +${currentBet} coins`
                : `✗ Wrong! -${currentBet} coins. The correct answer is: ${currentQuestion.correctAnswer}`}
            </p>
          </div>
        )}

        <fieldset>
          <legend className="text-2xl font-semibold text-beige mb-2">
            {currentQuestion.question}
          </legend>
          {/* <p className="mt-1 text-sm/6 text-[#8BA6A9] dark:text-gray-400 mb-6">
            Select your answer below
          </p> */}
          <div className="mt-6 space-y-6">
            {currentQuestion.options.map((option) => {
              let inputClass =
                "relative size-4 appearance-none rounded-full border-2 border-[#8BA6A9] bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-[#75704E] checked:bg-[#75704E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#75704E] disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden";

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
            className="w-full rounded-md bg-gray px-6 py-3 text-sm font-semibold text-beige shadow-sm hover:bg-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#75704E] disabled:bg-gray-300 disabled:cursor-not-allowed dark:disabled:bg-gray-700"
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
