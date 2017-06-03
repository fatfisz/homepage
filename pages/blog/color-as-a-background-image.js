import Markdown from 'components/markdown';
import PostWrapper from 'components/post-wrapper';
import fetchApi from 'utils/fetch-api';


export default function Post({ body }) {
  return (
    <PostWrapper
      id="color-as-a-background-image"
      title="Color as a background image"
      date="2017.05.13"
    >
      <Markdown source={body} />
    </PostWrapper>
  );
}

Post.getInitialProps = async ({ req }) => {
  const id = 'color-as-a-background-image';
  const isServer = Boolean(req);
  const { post } = await fetchApi(`{ post(id: ${JSON.stringify(id)}) { body } }`, isServer);
  return post;
};
