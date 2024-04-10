import prisma from '@/src/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { Pagination } from '@/src/components/Pagination';

export default async function Articles({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const LIMIT = 3;
  const currentPage = Number(searchParams?.page) || 1;

  const [count, articles] = await prisma.$transaction([
    prisma.post.count(),
    prisma.post.findMany({
      include: { author: true },
      take: LIMIT,
      skip: (currentPage - 1) * LIMIT,
      orderBy: {
        updatedAt: 'desc',
      },
    }),
  ]);

  const headingClassName = 'py-3 px-2';

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-4">
      <h1 className="text-4xl font-semibold">All Articles</h1>

      <table className="table-fixed text-wrap text-start border border-slate-400">
        <thead>{<TableHeading />}</thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="odd:bg-gray-800 bg-gray-700">
              <td className={headingClassName}>
                <Image
                  className="rounded object-cover w-20 h-20"
                  src={`https://placehold.co/150/png?font=raleway&text=${article.id}`}
                  width={150}
                  height={150}
                  alt={article.image}
                />
              </td>
              <td className={headingClassName}>{article.title}</td>
              <td className={headingClassName}>{article.content?.length}</td>
              <td className={headingClassName}>
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
              </td>
              <td className={headingClassName}>
                {article.createdAt.toLocaleString()}
              </td>
              <td className={headingClassName}>
                {article.updatedAt.toLocaleString()}
              </td>
              <td className={headingClassName}>
                {article.published ? '✔ Publish' : '❌ Private'}
              </td>
              <td className={headingClassName}>
                <div className="inline-flex items-baseline gap-1">
                  <Link
                    href={`/articles/${article.id}`}
                    className="underline underline-offset-4 hover:text-gray-300 transition-colors"
                  >
                    Edit
                  </Link>
                  <Link
                    href="/"
                    className="underline underline-offset-4 text-red-500 hover:text-red-800 transition-colors"
                  >
                    Delete
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>{<TableHeading />}</tfoot>
      </table>

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

const TableHeading = () => {
  const headingClassName = 'text-start py-4 px-2';

  return (
    <tr>
      <th className={headingClassName}>Image</th>
      <th className={headingClassName}>Title</th>
      <th className={headingClassName}>Content Length</th>
      <th className={headingClassName}>Author</th>
      <th className={headingClassName}>Created at</th>
      <th className={headingClassName}>Last update</th>
      <th className={headingClassName}>Status</th>
      <th className={headingClassName}></th>
    </tr>
  );
};
