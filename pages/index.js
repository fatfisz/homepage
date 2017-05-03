import Head from 'next/head';

import Image from 'components/image';
import wrapBody from 'components/wrap-body';


function Index() {
  return (
    <div className="index">
      <h2>
        Hi, I'm Rafał.
      </h2>

      <Image svgName="chybaryba" style={{ width: '100%', height: '100%' }} />

      <h3>
        Some people call me FatFisz.
      </h3>

      <style jsx>{`
        .index {
          height: 60vh;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default wrapBody(Index);
