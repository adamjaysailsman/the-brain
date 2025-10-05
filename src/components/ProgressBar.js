export default function ProgressBar({
  steps,
  currentQuestionIndex,
  totalQuestions,
}) {
  const percentage = (currentQuestionIndex / totalQuestions) * 100;

  return (
    <div className="mb-8">
      <h4 className="sr-only">Quiz Progress</h4>
      <p className="text-sm font-medium text-beige">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </p>
      <div aria-hidden="true" className="mt-4">
        <div className="overflow-hidden rounded-full bg-beige  ">
          <div
            style={{ width: `${percentage}%` }}
            className="h-2 rounded-full bg-blue  transition-all duration-500 ease-out"
          />
        </div>
      </div>
    </div>
  );
}
