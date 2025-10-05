export default function ErrorScreen({ error, onRetry }) {
  return (
    <div className="min-h-screen bg-[#F4EBBE]/20 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="rounded-md bg-[#75704E] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#75704E]/90"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
