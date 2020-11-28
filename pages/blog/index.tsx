import { PostList } from 'components/PostList';
import { NextPageContext } from 'next';
import { ReactElement } from 'react';
import { ApiShortPost } from 'types';
import { fetchApi } from 'utils/fetchApi';

export default function PostListPage({ posts }: { posts: ApiShortPost[] }): ReactElement {
  return <PostList posts={posts} />;
}

PostListPage.getInitialProps = async ({ req }: NextPageContext) => {
  const isServer = Boolean(req);
  const { posts } = await fetchApi<{ posts: ApiShortPost[] }>(PostList.getQuery(), isServer);
  return { posts };
};
