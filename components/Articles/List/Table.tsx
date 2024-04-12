import prisma from '@/lib/prisma';
import Image from 'next/image';
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton as UISkeleton } from '@/components/ui/skeleton';
import { RiEyeLine, RiEditLine, RiDeleteBin2Line } from 'react-icons/ri';
import Link from 'next/link';

interface Props {
  limit: number;
  currentPage: number;
}
type SkeletonProps = Pick<Props, 'limit'>;

export async function Table({ limit, currentPage }: Props) {
  const articles = await prisma.post.findMany({
    include: { author: true },
    take: limit,
    skip: (currentPage - 1) * limit,
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return (
    <UITable>
      <TableHeader>
        <TableHeading />
      </TableHeader>
      <TableFooter>
        <TableHeading />
      </TableFooter>

      <TableBody>
        {articles.map((article) => (
          <TableRow key={article.id}>
            <TableCell className="w-28">
              <Image
                className="rounded object-cover size-20"
                src={`https://placehold.co/150/png?font=raleway&text=${article.id}`}
                width={150}
                height={150}
                alt={article.image}
              />
            </TableCell>
            <TableCell>{article.title}</TableCell>
            <TableCell>{article.content?.length}</TableCell>
            <TableCell>
              {!article.author ? (
                'Unknown author'
              ) : (
                <Link
                  href={`/users/${article.author.id}`}
                  className="underline underline-offset-4 hover:text-gray-300 transition-colors"
                >
                  {article.author.name}
                </Link>
              )}
            </TableCell>
            <TableCell className="text-center w-28">
              {article.createdAt.toLocaleString()}
            </TableCell>
            <TableCell className="text-center w-28">
              {article.updatedAt.toLocaleString()}
            </TableCell>
            <TableCell className="text-center w-28">
              <span className="block mb-1">
                {article.published ? '✔ Publish' : '❌ Private'}
              </span>

              <div className="inline-flex items-baseline gap-1">
                <Link
                  href={`/articles/${article.id}`}
                  className="hover:text-gray-300 border-white hover:border-gray-300 transition-colors p-1 border rounded text-center"
                >
                  <RiEyeLine />
                </Link>
                <Link
                  href={`/articles/${article.id}/edit`}
                  className="hover:text-gray-300 border-white hover:border-gray-300 transition-colors p-1 border rounded text-center"
                >
                  <RiEditLine />
                </Link>
                <Link
                  href={`/articles/${article.id}/delete`}
                  className="text-red-500 hover:text-red-800 border-red-500 hover:border-red-800 transition-colors p-1 border rounded text-center"
                >
                  <RiDeleteBin2Line />
                </Link>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </UITable>
  );
}

export function Skeleton({ limit: length }: SkeletonProps) {
  return (
    <UITable>
      <TableHeader>
        <TableHeading />
      </TableHeader>
      <TableFooter>
        <TableHeading />
      </TableFooter>

      {Array.from({ length }, (_, i) => (
        <TableRow key={i + 1}>
          <TableCell className="w-28">
            <UISkeleton className="size-20 rounded block" />
          </TableCell>
          <TableCell>
            <UISkeleton className="h-6 w-40 rounded block" />
          </TableCell>
          <TableCell>
            <UISkeleton className="h-6 w-12 rounded block" />
          </TableCell>
          <TableCell>
            <UISkeleton className="h-6 w-32 rounded block" />
          </TableCell>
          <TableCell className="text-center w-28">
            <UISkeleton className="h-6 w-20 rounded inline-block" />
            <UISkeleton className="h-6 w-24 rounded inline-block" />
          </TableCell>
          <TableCell className="text-center w-28">
            <UISkeleton className="h-6 w-20 rounded inline-block" />
            <UISkeleton className="h-6 w-24 rounded inline-block" />
          </TableCell>
          <TableCell className="text-center w-28">
            <UISkeleton className="h-6 w-20 rounded block mx-auto mb-1" />

            <div className="inline-flex items-baseline gap-1">
              <UISkeleton className="size-6 border rounded block" />
              <UISkeleton className="size-6 border rounded block" />
              <UISkeleton className="size-6 border rounded block" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </UITable>
  );
}

function TableHeading() {
  return (
    <TableRow>
      <TableHead>Image</TableHead>
      <TableHead>Title</TableHead>
      <TableHead>Content Length</TableHead>
      <TableHead>Author</TableHead>
      <TableHead className="text-center w-28">Created at</TableHead>
      <TableHead className="text-center w-28">Last update</TableHead>
      <TableHead className="text-center w-28">Status</TableHead>
    </TableRow>
  );
}
