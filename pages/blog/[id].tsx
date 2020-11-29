import { posts } from 'api/posts';
import { ApiPost, Post } from 'api/types';
import { CodeExampleStyles } from 'components/CodeExampleStyles';
import { PostView } from 'components/Post';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ReactElement, useMemo } from 'react';
import { reactFromRenderable } from 'utils/reactFromRenderable';

interface Props {
  post: ApiPost;
}

interface Params {
  id: string;
  [key: string]: string | undefined;
}

export default function PostPage({ post }: Props): ReactElement | null {
  const processedPost = useProcessedPost(post);
  return <PostView {...processedPost} />;
}

function useProcessedPost(post: ApiPost): Post {
  return useMemo(
    () =>
      post && {
        ...post,
        body: (
          <>
            <CodeExampleStyles />
            {reactFromRenderable(JSON.parse(post.body))}
          </>
        ),
      },
    [post],
  );
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  return {
    props: {
      post: posts.find((post) => post.id === params!.id)!,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return {
    paths: posts.map(({ id }) => ({
      params: { id },
    })),
    fallback: false,
  };
};
