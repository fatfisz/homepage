import ErrorPage from 'next/error';

import Post from 'components/post';
import PostList from 'components/post-list';
import fetchApi from 'utils/fetch-api';


export default function Blog({ post, posts }) {
  if (posts) {
    return <PostList posts={posts} />;
  } else if (post) {
    return <Post {...post} />;
  } else {
    return <ErrorPage statusCode={404} />;
  }
}

Blog.getInitialProps = async ({ query, req, res }) => {
  const isServer = Boolean(req);

  if (query.id) {
    const { post } = await fetchApi(Post.getQuery(query.id), isServer);
    return { post };
  } else {
    const { posts } = await fetchApi(PostList.getQuery(), isServer);
    return { posts };
  }
};
