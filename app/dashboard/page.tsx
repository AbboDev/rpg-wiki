import { auth, signOut } from '@/src/lib/auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center gap-2">
        <div className="size-14 rounded-full bg-gray-400 overflow-hidden">
          {session.user.image && (
            <Image
              src={session.user.image}
              width={56}
              height={56}
              alt="Profile picture"
            />
          )}
        </div>
        <span>{session.user.name}</span>
        <a href={`mailto:${session.user.email}`} className="underline">
          {session.user.email}
        </a>
      </div>
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/' });
        }}
      >
        <button
          type="submit"
          className="rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          Logout
        </button>
      </form>
    </main>
  );
}
