import Link from 'next/link';

export default function Users() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Users - Work in progress
      <Link
        href="/"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      >
        Back to homepage
      </Link>
    </main>
  );
}
