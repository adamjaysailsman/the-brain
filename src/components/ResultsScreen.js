export default function ResultsScreen({
  coins,
  score,
  totalQuestions,
  onRestart,
}) {
  const isBankrupt = coins <= 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {isBankrupt ? "💸 Bankrupt!" : "🎉 Quiz Complete!"}
        </h1>

        {!isBankrupt && (
          <>
            <div className="mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Final Balance
              </p>
              <p className="text-6xl font-bold text-yellow-500 mb-2">{coins}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">coins</p>
            </div>

            <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Correct Answers
              </p>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {score}/{totalQuestions}
              </p>
            </div>

            <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Profit
              </p>
              <p
                className={`text-2xl font-bold ${
                  coins > 1000
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {coins > 1000 ? "+" : ""}
                {coins - 1000} coins
              </p>
            </div>
          </>
        )}

        {isBankrupt && (
          <div className="mb-8">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              You ran out of coins!
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-500">
              Correct: {score}/{totalQuestions}
            </p>
          </div>
        )}

        <button
          onClick={onRestart}
          className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
