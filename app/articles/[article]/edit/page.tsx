import prisma from '@/src/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  RiHome2Line,
  RiEditLine,
  RiDeleteBin2Line,
  RiArrowLeftSLine,
} from 'react-icons/ri';
import { Checkbox } from '@/src/components/Checkbox';

type Props = {
  params: { article: string };
};

const INFO_CLASS_NAME =
  'grow-0 shrink basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 p-1';

export default async function EditArticle({ params }: Props) {
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

  const status: boolean = article.published;

  return (
    <main className="flex flex-col items-center justify-start">
      <form className="container flex flex-col items-center justify-start min-h-screen p-3 lg:p-24 gap-4">
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
            href={`/articles/${article.id}`}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <RiEditLine className="inline align-middle" /> View
          </Link>{' '}
          <Link
            href={`/articles/${article.id}/delete`}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <RiDeleteBin2Line className="inline align-middle" /> Delete
          </Link>
        </div>

        <span className="text-xs text-gray-300 dark:text-neutral-500">
          ID: {article.id}
        </span>

        <input
          type="text"
          name="title"
          defaultValue={article.title}
          className="block p-2 w-full text-center border rounded border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30 font-semibold text-4xl"
        />

        <textarea
          className="p-2 w-full text-start whitespace-pre-line border rounded border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
          defaultValue={article.content?.toString()}
        ></textarea>

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
            ) : (
              <Checkbox
                id="status"
                label="❌ Private"
                checkedLabel="✔ Publish"
                checked={status}
              />
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
        </div>
      </form>
    </main>
  );
}
