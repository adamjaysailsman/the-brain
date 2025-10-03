import { useState, useEffect } from "react";
import { fetchTriviaQuestions } from "./services/triviaApi";
import LoadingScreen from "./components/LoadingScreen";
import ErrorScreen from "./components/ErrorScreen";
import BettingScreen from "./components/BettingScreen";
import QuestionScreen from "./components/QuestionScreen";
import ResultsScreen from "./components/ResultsScreen";

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(1000);
  const [currentBet, setCurrentBet] = useState(100);
  const [showBettingScreen, setShowBettingScreen] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const formattedQuestions = await fetchTriviaQuestions(10);
      setQuestions(formattedQuestions);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

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

  const handlePlaceBet = () => {
    setShowBettingScreen(false);
  };

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;

    setShowFeedback(true);

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      setCoins(coins + currentBet);
    } else {
      setCoins(coins - currentBet);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestionIndex + 1;
      const newCoins = isCorrect ? coins + currentBet : coins - currentBet;

      if (newCoins <= 0) {
        setCoins(0);
        setIsFinished(true);
        return;
      }

      if (nextQuestion < questions.length) {
        setCurrentQuestionIndex(nextQuestion);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setShowBettingScreen(true);
        setCurrentBet(Math.min(100, newCoins));
      } else {
        setIsFinished(true);
      }
    }, 2000);
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setCoins(1000);
    setCurrentBet(100);
    setShowBettingScreen(true);
    setIsFinished(false);
    setSelectedAnswer(null);
    setShowFeedback(false);
    fetchQuestions();
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} onRetry={fetchQuestions} />;
  }

  if (isFinished) {
    return (
      <ResultsScreen
        coins={coins}
        score={score}
        totalQuestions={questions.length}
        onRestart={restartGame}
      />
    );
  }

  if (showBettingScreen) {
    return (
      <BettingScreen
        steps={steps}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        coins={coins}
        currentBet={currentBet}
        onBetChange={setCurrentBet}
        onPlaceBet={handlePlaceBet}
      />
    );
  }

  return (
    <QuestionScreen
      steps={steps}
      currentQuestionIndex={currentQuestionIndex}
      totalQuestions={questions.length}
      coins={coins}
      currentBet={currentBet}
      currentQuestion={currentQuestion}
      selectedAnswer={selectedAnswer}
      showFeedback={showFeedback}
      onAnswerSelect={setSelectedAnswer}
      onSubmit={handleAnswerSubmit}
    />
  );
}

export default App;
