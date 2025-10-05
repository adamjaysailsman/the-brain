export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#F4EBBE]/20 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#75704E]"></div>
        <p className="mt-4 text-[#8BA6A9] dark:text-gray-400">
          Loading questions...
        </p>
      </div>
    </div>
  );
}
