import Error from 'next/error';

import Post from 'components/post';
import fetchApi from 'utils/fetch-api';

export default function PostPage({ post }) {
  if (post) {
    return <Post {...post} />;
  } else {
    return <Error statusCode={404} />;
  }
}

PostPage.getInitialProps = async ({ query: { id }, req, }) => {
  const isServer = Boolean(req);
  const { post } = await fetchApi(Post.getQuery(id), isServer);
  return { post };
};
