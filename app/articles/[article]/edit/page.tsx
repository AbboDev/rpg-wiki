import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Editor } from '@/components/Editor';
import { Data } from '@measured/puck';

type Props = {
  params: { article: string };
};

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

  // Describe the initial data
  const data: Data = {
    content: [],
    root: {
      props: {
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
        description: article.content,
        title: article.title,
      },
    },
  };

  // Save the data to your database
  const save = async (data: Data) => {
    'use server';

    console.debug(data);
  };

  // const status: boolean = article.published;

  return <Editor data={data} headerTitle="Edit article" onPublish={save} />;
}
