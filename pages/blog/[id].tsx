import { CodeExampleStyles } from 'components/CodeExampleStyles';
import { PostView } from 'components/Post';
import { NextPageContext } from 'next';
import Error from 'next/error';
import { ReactElement, useMemo } from 'react';
import { ApiPost, Post } from 'types';
import { fetchApi } from 'utils/fetchApi';
import { reactFromRenderable } from 'utils/reactFromRenderable';

export default function PostPage({ post }: { post: ApiPost | null }): ReactElement {
  const processedPost = useProcessedPost(post);
  if (processedPost) {
    return <PostView {...processedPost} />;
  } else {
    return <Error statusCode={404} />;
  }
}

PostPage.getInitialProps = async ({ query: { id }, req }: NextPageContext) => {
  const isServer = Boolean(req);
  const { post } = await fetchApi<{ post: ApiPost }>(PostView.getQuery(id as string), isServer);
  return { post };
};

function useProcessedPost(post: ApiPost | null): Post | null {
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
