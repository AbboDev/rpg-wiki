import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { RiEditLine, RiDeleteBin2Line, RiArrowLeftSLine } from 'react-icons/ri';
import { Heading } from '@/components/Heading';
import { HomeButton } from '@/components/HomeButton';
import { Button } from '@/components/ui/button';

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
    <main className="flex flex-col items-center justify-start gap-4 text-start">
      <section className="container space-y-4">
        <div className="flex justify-center gap-2 mx-auto">
          <HomeButton />

          <Button asChild>
            <Link href="/articles" className="gap-1">
              <RiArrowLeftSLine className="inline-block" />
              <span>Back to Articles</span>
            </Link>
          </Button>

          <Button asChild>
            <Link href={`/articles/${article.id}/edit`} className="gap-1">
              <RiEditLine className="inline-block" />
              <span>Edit</span>
            </Link>
          </Button>

          <Button asChild>
            <Link href={`/articles/${article.id}/delete`} className="gap-1">
              <RiDeleteBin2Line className="inline-block" />
              <span>Delete</span>
            </Link>
          </Button>
        </div>
      </section>

      <section className="container space-y-4">
        <Heading as="h1" className="block w-full">
          {article.title}
        </Heading>

        <p className="block w-full whitespace-pre-line">
          {article.content}
        </p>

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
        </div>
      </section>
    </main>
  );
}
