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

        <p>
          You can learn a bit <Link href="/about"><a>about me</a></Link>,<br />
          or you can read some stuff I've written on <Link href="/blog"><a>my blog</a></Link>.
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
