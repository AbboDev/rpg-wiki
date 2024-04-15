import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  RiEyeLine,
  RiDeleteBin2Line,
  RiArrowLeftSLine,
} from 'react-icons/ri';
import { Checkbox } from '@/components/Checkbox';
import { HomeButton } from '@/components/HomeButton';
import { Button } from '@/components/ui/button';

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
          <HomeButton />

          <Button asChild>
            <Link href="/articles" className="gap-1">
              <RiArrowLeftSLine className="inline-block" />
              <span>Back to Articles</span>
            </Link>
          </Button>

          <Button asChild>
            <Link href={`/articles/${article.id}`} className="gap-1">
              <RiEyeLine className="inline-block" />
              <span>View</span>
            </Link>
          </Button>

          <Button asChild>
            <Link href={`/articles/${article.id}/delete`} className="gap-1">
              <RiDeleteBin2Line className="inline-block" />
              <span>Delete</span>
            </Link>
          </Button>
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
