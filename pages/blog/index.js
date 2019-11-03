import PostList from 'components/post-list';
import fetchApi from 'utils/fetch-api';

export default function Blog({ posts }) {
  return <PostList posts={posts} />;
}

Blog.getInitialProps = async ({ req }) => {
  const isServer = Boolean(req);
  const { posts } = await fetchApi(PostList.getQuery(), isServer);
  return { posts };
};
