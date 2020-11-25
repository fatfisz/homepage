import { Body } from 'components/body';
import Link from 'next/link';

export default function IndexPage() {
  return (
    <Body>
      <h2>Hi, I&apos;m Rafał.</h2>

      <h3>Some people call me FatFisz.</h3>

      <p>
        I do computer stuff - check out my latest game,{' '}
        <a href="http://js13kgames.com/entries/space-wizard-toast-spinning">
          Space Wizard Toast Spinning
        </a>
        !
      </p>

      <p>
        You can learn a bit more{' '}
        <Link href="/about">
          <a>about me</a>
        </Link>
        ,<br />
        or you can read{' '}
        <Link href="/blog">
          <a>some stuff I&apos;ve written</a>
        </Link>{' '}
        about front-end programming.
      </p>
    </Body>
  );
}
