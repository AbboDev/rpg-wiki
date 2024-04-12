import prisma from '@/src/lib/prisma';
import Link from 'next/link';
import { Pagination } from '@/src/components/Pagination';
import {
  Articles as ArticlesTable,
  Skeleton,
} from '@/src/components/Table/Articles';
import { Suspense } from 'react';
import { Heading } from '@/src/components/Heading';

export default async function Articles({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const LIMIT = 3;
  const currentPage = Number(searchParams?.page) || 1;

  const count = await prisma.post.count();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-4">
      <Heading as="h1">All Articles</Heading>

      <Suspense key={currentPage} fallback={<Skeleton limit={LIMIT} />}>
        <ArticlesTable limit={LIMIT} currentPage={currentPage} />
      </Suspense>

      <nav className="text-center">
        <span className="mb-2 block">Posts found: {count}</span>

        <Pagination count={count} perPage={LIMIT} />
      </nav>

      <Link
        href="/"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      >
        Back to homepage
      </Link>
    </main>
  );
}
