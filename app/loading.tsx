import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-stone-500/30 flex items-center justify-center transition-opacity backdrop-blur">
      <Spinner className="text-stone-500">
        <span className="text-stone-500">Loading...</span>
      </Spinner>
    </div>
  );
}
