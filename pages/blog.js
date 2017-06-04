import Post from 'components/post';
import PostList from 'components/post-list';
import fetchApi from 'utils/fetch-api';


export default function Blog({ post, posts }) {
  if (posts) {
    return <PostList posts={posts} />;
  } else {
    return <Post {...post} />;
  }
}

Blog.getInitialProps = async ({ query, req }) => {
  const isServer = Boolean(req);

  if (query.id) {
    const { post } = await fetchApi(Post.getQuery(query.id), isServer);
    return { post };
  } else {
    const { posts } = await fetchApi(PostList.getQuery(), isServer);
    return { posts };
  }
};
