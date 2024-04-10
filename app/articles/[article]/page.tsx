import prisma from '@/src/lib/prisma';
import { Heading } from '@/src/components/Heading';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  RiHome2Line,
  RiEditLine,
  RiDeleteBin2Line,
  RiArrowLeftSLine,
} from 'react-icons/ri';

type Props = {
  params: { article: string };
};

const INFO_CLASS_NAME =
  'grow-0 shrink basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 p-1';

export default async function Article({ params }: Props) {
  const article = await prisma.post.findUnique({
    where: {
      id: params.article,
    },
    include: {
      author: true,
    },
  });

  if (!article) {
    notFound();
  }

  return (
    <main className="flex flex-col items-center justify-start">
      <section className="container flex flex-col items-center justify-start min-h-screen p-3 lg:p-24 gap-4">
        <div className="flex justify-start gap-2">
          <Link
            href="/articles"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <RiHome2Line className="inline align-middle" /> Back to homepage
          </Link>
          <Link
            href="/articles"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <RiArrowLeftSLine className="inline align-middle" /> Back to
            Articles
          </Link>
          <Link
            href={`/articles/${article.id}/edit`}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <RiEditLine className="inline align-middle" /> Edit
          </Link>{' '}
          <Link
            href={`/articles/${article.id}/delete`}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <RiDeleteBin2Line className="inline align-middle" /> Delete
          </Link>
        </div>

        <Heading as="h1">{article.title}</Heading>

        <p className="self-stretch">{article.content}</p>

        <div className="flex flex-wrap p-2 sm:px-0 justify-start mt-auto w-full text-start sm:text-center border rounded border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
          <span className={INFO_CLASS_NAME}>
            Created at{' '}
            <time dateTime={article.createdAt.toString()}>
              {article.createdAt.toLocaleString()}
            </time>
          </span>

          <span className={INFO_CLASS_NAME}>
            Updated at{' '}
            <time dateTime={article.updatedAt.toString()}>
              {article.updatedAt.toLocaleString()}
            </time>
          </span>

          <span className={INFO_CLASS_NAME}>
            {article.deletedAt ? (
              <>
                Deleted at{' '}
                <time dateTime={article.deletedAt.toString()}>
                  {article.deletedAt.toLocaleString()}
                </time>
              </>
            ) : article.published ? (
              '✔ Publish'
            ) : (
              '❌ Private'
            )}
          </span>

          <span className={INFO_CLASS_NAME}>
            Redacted by{' '}
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
          </span>

          <span className={INFO_CLASS_NAME}>#{article.id}</span>
        </div>
      </section>
    </main>
  );
}
