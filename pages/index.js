import Head from 'next/head';

import wrapBody from 'components/wrap-body';


function Index() {
  return (
    <div>
      <h2>
        Hi, I'm Rafał.
      </h2>
      <p>
        I once had many talents. Now I build websites.
      </p>
      <p>
        I'm currently trying to make <a href="https://codility.com/">Codility</a> more awesome.
      </p>
      <p>
        I have some projects on GitHub: <a href="https://github.com/fatfisz">@fatfisz</a>
      </p>
      <br />
      <p>
        More content coming soon.
      </p>
    </div>
  );
}

export default wrapBody(Index);
