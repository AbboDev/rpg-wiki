import prisma from '@/src/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { Table, HEADING_CLASS_NAME } from '@/src/components/Table';
import {
  RiEyeLine ,
  RiEditLine,
  RiDeleteBin2Line,
} from 'react-icons/ri';

interface Props {
  limit: number;
  currentPage: number;
}

type SkeletonProps = Pick<Props, 'limit'>;

export async function Articles({ limit, currentPage }: Props) {
  const articles = await prisma.post.findMany({
    include: { author: true },
    take: limit,
    skip: (currentPage - 1) * limit,
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return (
    <Table head={<TableHeading />} footer={<TableHeading />}>
      {articles.map((article) => (
        <tr key={article.id} className="odd:bg-gray-800 bg-gray-700">
          <td className={`${HEADING_CLASS_NAME} w-24`}>
            <Image
              className="rounded object-cover size-20"
              src={`https://placehold.co/150/png?font=raleway&text=${article.id}`}
              width={150}
              height={150}
              alt={article.image}
            />
          </td>
          <td className={HEADING_CLASS_NAME}>{article.title}</td>
          <td className={HEADING_CLASS_NAME}>{article.content?.length}</td>
          <td className={HEADING_CLASS_NAME}>
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
          <td className={`${HEADING_CLASS_NAME} text-center w-28`}>
            {article.createdAt.toLocaleString()}
          </td>
          <td className={`${HEADING_CLASS_NAME} text-center w-28`}>
            {article.updatedAt.toLocaleString()}
          </td>
          <td className={`${HEADING_CLASS_NAME} text-center w-28`}>
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
          </td>
        </tr>
      ))}
    </Table>
  );
}

export function Skeleton({ limit: length }: SkeletonProps) {
  return (
    <Table head={<TableHeading />} footer={<TableHeading />}>
      {Array.from({ length }, (_, i) => (
        <tr key={i + 1}>
          <td className={`${HEADING_CLASS_NAME} w-24`}>
            <div className="block animate-pulse rounded size-20 bg-slate-100"></div>
          </td>
          <td className={HEADING_CLASS_NAME}>
            <span className="h-6 w-40 animate-pulse bg-slate-300 rounded block"></span>
          </td>
          <td className={HEADING_CLASS_NAME}>
            <span className="h-6 w-12 animate-pulse bg-slate-300 rounded block"></span>
          </td>
          <td className={HEADING_CLASS_NAME}>
            <span className="h-6 w-32 animate-pulse bg-slate-300 rounded block"></span>
          </td>
          <td className={`${HEADING_CLASS_NAME} text-center w-28`}>
            <span className="h-6 w-20 animate-pulse bg-slate-300 rounded inline-block"></span>
            <span className="h-6 w-24 animate-pulse bg-slate-300 rounded inline-block"></span>
          </td>
          <td className={`${HEADING_CLASS_NAME} text-center w-28`}>
            <span className="h-6 w-20 animate-pulse bg-slate-300 rounded inline-block"></span>
            <span className="h-6 w-24 animate-pulse bg-slate-300 rounded inline-block"></span>
          </td>
          <td className={`${HEADING_CLASS_NAME} text-center w-28`}>
            <span className="h-6 w-20 animate-pulse bg-slate-300 rounded block mx-auto mb-1"></span>

            <div className="inline-flex items-baseline gap-1">
              <span className="size-6 animate-pulse bg-slate-300 border rounded block"></span>
              <span className="size-6 animate-pulse bg-slate-300 border rounded block"></span>
              <span className="size-6 animate-pulse bg-slate-300 border rounded block"></span>
            </div>
          </td>
        </tr>
      ))}
    </Table>
  );
}

const TableHeading = () => {
  const headingClassName = 'py-4 px-2';

  return (
    <tr>
      <th className={`${headingClassName} text-start`}>Image</th>
      <th className={`${headingClassName} text-start`}>Title</th>
      <th className={`${headingClassName} text-start`}>Content Length</th>
      <th className={`${headingClassName} text-start`}>Author</th>
      <th className={`${headingClassName} text-center w-28`}>Created at</th>
      <th className={`${headingClassName} text-center w-28`}>Last update</th>
      <th className={`${headingClassName} text-center w-28`}>Status</th>
    </tr>
  );
};
