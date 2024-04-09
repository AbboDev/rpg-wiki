export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white/30 flex items-center justify-center transition-opacity backdrop-blur">
      <div className="animate-spin rounded-full w-10 h-10 border-teal-100 border-4 border-b-teal-400"></div>
    </div>
  );
}
