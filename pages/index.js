import Head from 'next/head';


export default function Index() {
  return (
    <div className="main-container">
      <Head>
        <title>FatFisz's humble site</title>
      </Head>

      <main className="main">
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
      </main>

      <style jsx>{`
        .main-container {
          align-items: center;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: center;
        }

        .main {
          flex: 0 0 auto;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}
