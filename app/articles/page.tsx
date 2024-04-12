import prisma from '@/lib/prisma';
import { HomeButton } from '@/components/HomeButton';
import { Pagination } from '@/components/Pagination';
import { Table, Skeleton } from '@/components/Articles/List/Table';
import { Suspense } from 'react';
import { Heading } from '@/components/Heading';

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
        <Table limit={LIMIT} currentPage={currentPage} />
      </Suspense>

      <nav className="text-center">
        <span className="mb-2 block">Posts found: {count}</span>

        <Pagination count={count} perPage={LIMIT} offset={4} />
      </nav>

      <HomeButton />
    </main>
  );
}
