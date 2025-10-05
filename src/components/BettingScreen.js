import ProgressBar from "./ProgressBar";

export default function BettingScreen({
  steps,
  currentQuestionIndex,
  totalQuestions,
  coins,
  currentBet,
  currentQuestion,
  onBetChange,
  onPlaceBet,
}) {
  const minBet = 50;
  const maxBet = Math.min(500, coins);

  return (
    <div className="min-h-screen  bg-beige flex items-center justify-center p-4">
      <div className=" bg-green rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <ProgressBar
          steps={steps}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
        />

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#F4EBBE] mb-4">
            <span className="text-4xl">💰</span>
          </div>
          <h2 className="text-3xl font-bold text-beige  mb-2">
            Place Your Bet
          </h2>
          <p className="text-beige">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </p>
        </div>

        {/* Question Category Card */}
        <div className="mb-8 p-6 bg-gradient-to-r from-[#F4EBBE] to-[#CACC90] rounded-lg border-2 border-beige">
          <div className="flex items-center justify-center gap-4">
            {/* <div className="flex-shrink-0">
              <span className="text-5xl">📚</span>
            </div> */}
            <div className="text-center">
              <h3 className="text-sm font-medium text-[#75704E] mb-2">
                Category
              </h3>
              <p className="text-2xl font-bold text-[#75704E]">
                {currentQuestion?.category || "General Knowledge"}
              </p>
              {/* <p className="text-xs text-[#8BA6A9] dark:text-gray-400 mt-3 italic">
                💡 Bet more on categories you know well!
              </p> */}
            </div>
          </div>
        </div>

        <div className="mb-8 p-6 bg-gradient-to-r from-[#F4EBBE] to-[#CACC90] rounded-lg border-2 border-[#CACC90]">
          <p className="text-sm text-[#75704E] text-center mb-2">
            Your Balance
          </p>
          <p className="text-5xl font-bold text-[#75704E] text-center">
            {coins}
          </p>
          <p className="text-sm text-[#75704E] text-center mt-1">coins</p>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-beige mb-4 text-center">
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
              className="w-full h-2 bg-beige rounded-lg appearance-none cursor-pointer "
              style={{
                accentColor: "#A7CECB",
              }}
            />
            <div className="flex justify-between text-xs text-beige  mt-2">
              <span>{minBet}</span>
              <span>{maxBet}</span>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="inline-block bg-beige px-8 py-4 rounded-lg border-4 border-green">
              <p className="text-sm text-green mb-1">Betting</p>
              <p className="text-4xl font-bold text-gray">{currentBet}</p>
              <p className="text-sm text-green mt-1">coins</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <button
              onClick={() => onBetChange(Math.min(coins, 100))}
              className="py-2 px-4 bg-gray text-beige rounded-lg font-semibold  border border-[#A7CECB]"
            >
              100
            </button>
            <button
              onClick={() => onBetChange(Math.min(coins, 250))}
              className="py-2 px-4 bg-gray text-beige rounded-lg font-semibold border border-[#A7CECB]"
            >
              250
            </button>
            <button
              onClick={() => onBetChange(Math.min(coins, 500))}
              className="py-2 px-4 bg-gray text-beige rounded-lg font-semibold  border border-[#A7CECB]"
            >
              500
            </button>
          </div>

          <div className="bg-beige border border-sage rounded-lg p-4 mb-6">
            <p className="text-sm text-green text-center">
              💡 <strong>Win:</strong> +{currentBet} coins |{" "}
              <strong>Lose:</strong> -{currentBet} coins
            </p>
          </div>
        </div>

        <button
          onClick={onPlaceBet}
          className="w-full rounded-md bg-gray text-beige px-6 py-4 text-lg font-semibold  shadow-sm"
        >
          Lock In Bet & See Question
        </button>
      </div>
    </div>
  );
}
