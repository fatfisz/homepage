import Head from 'next/head';
import Link from 'next/link';

import Body from 'components/body';
import Image from 'components/image';


export default function Index() {
  return (
    <Body>
      <div className="index">
        <h2>
          Hi, I'm Rafał.
        </h2>

        <h3>
          Some people call me FatFisz.
        </h3>

        <Image svgName="chybaryba" style={{ width: '100%', height: '50vh' }} />

        <h4>
          (here's an image of a fat fish I made)
        </h4>

        <br />
        <p>
          For now you can read a bit <Link href="/about" prefetch><a>about me</a></Link>.
        </p>
        <p>
          More content coming soon, I promise.
        </p>

        <style jsx>{`
          .index {
            text-align: center;
          }
        `}</style>
      </div>
    </Body>
  );
}
