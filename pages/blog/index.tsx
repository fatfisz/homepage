import { shortPosts } from 'api/posts';
import { ApiShortPost } from 'api/types';
import { PostList } from 'components/PostList';
import { GetStaticProps } from 'next';
import { ReactElement } from 'react';

interface Props {
  posts: ApiShortPost[];
}

export default function PostListPage({ posts }: Props): ReactElement {
  return <PostList posts={posts} />;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      posts: shortPosts,
    },
  };
};
