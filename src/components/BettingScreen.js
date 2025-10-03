import ProgressBar from "./ProgressBar";

export default function BettingScreen({
  steps,
  currentQuestionIndex,
  totalQuestions,
  coins,
  currentBet,
  onBetChange,
  onPlaceBet,
}) {
  const minBet = 50;
  const maxBet = Math.min(500, coins);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <ProgressBar steps={steps} />

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mb-4">
            <span className="text-4xl">💰</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Place Your Bet
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </p>
        </div>

        <div className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg border-2 border-yellow-300 dark:border-yellow-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-2">
            Your Balance
          </p>
          <p className="text-5xl font-bold text-yellow-600 dark:text-yellow-500 text-center">
            {coins}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">
            coins
          </p>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 text-center">
            How much do you want to bet?
          </label>

          <div className="mb-6">
            <input
              type="range"
              min={minBet}
              max={maxBet}
              step="50"
              value={currentBet}
              onChange={(e) => onBetChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span>{minBet}</span>
              <span>{maxBet}</span>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="inline-block bg-indigo-100 dark:bg-indigo-900/30 px-8 py-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Betting
              </p>
              <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                {currentBet}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                coins
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <button
              onClick={() => onBetChange(Math.min(coins, 100))}
              className="py-2 px-4 bg-gray-100 dark:bg-gray-700 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              100
            </button>
            <button
              onClick={() => onBetChange(Math.min(coins, 250))}
              className="py-2 px-4 bg-gray-100 dark:bg-gray-700 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              250
            </button>
            <button
              onClick={() => onBetChange(Math.min(coins, 500))}
              className="py-2 px-4 bg-gray-100 dark:bg-gray-700 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              500
            </button>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800 dark:text-blue-300 text-center">
              💡 <strong>Win:</strong> +{currentBet} coins |{" "}
              <strong>Lose:</strong> -{currentBet} coins
            </p>
          </div>
        </div>

        <button
          onClick={onPlaceBet}
          className="w-full rounded-md bg-indigo-600 px-6 py-4 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Lock In Bet & See Question
        </button>
      </div>
    </div>
  );
}
