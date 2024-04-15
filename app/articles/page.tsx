import prisma from '@/lib/prisma';
import { Suspense } from 'react';

import { HomeButton } from '@/components/HomeButton';
import { Pagination } from '@/components/Pagination/Pagination';
import { Table, Skeleton } from '@/components/Articles/List/Table';
import { Heading } from '@/components/Heading';
import { Select } from '@/components/Pagination/Select';
import { notFound } from 'next/navigation';

interface Props {
  searchParams?: {
    page?: string;
    count?: string;
  };
}

export default async function Articles({ searchParams }: Props) {
  const limit = Number(searchParams?.count) || 10;
  const currentPage = Number(searchParams?.page) || 1;

  const count = await prisma.post.count();

  if (limit * (currentPage - 1) > count) {
    notFound();
  }

  return (
    <main className="flex flex-col items-center justify-start gap-4 text-start">
      <div className="container flex flex-col items-center gap-4">
        <Heading as="h1">All Articles</Heading>

        <Suspense key={currentPage} fallback={<Skeleton limit={limit} />}>
          <Table limit={limit} currentPage={currentPage} />
        </Suspense>

        <nav className="text-center space-y-1">
          <div className="flex items-center justify-center space-x-2">
            <span className="block">Posts found: {count}</span>

            <Select value={limit.toString()} />
          </div>

          <Pagination count={count} perPage={limit} offset={4} />
        </nav>

        <HomeButton />
      </div>
    </main>
  );
}
