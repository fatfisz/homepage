import Link from 'next/link';

import Body from 'components/body';

export default function IndexPage() {
  return (
    <Body>
      <h2>
        Hi, I'm Rafał.
      </h2>

      <h3>
        Some people call me FatFisz.
      </h3>

      <p>
        I do computer stuff - check out my latest game, <Link href="http://js13kgames.com/entries/space-wizard-toast-spinning"><a>Space Wizard Toast Spinning</a></Link>!
      </p>

      <p>
        You can learn a bit more <Link href="/about"><a>about me</a></Link>,<br />
        or you can read <Link href="/blog"><a>some stuff I've written</a></Link> about front-end programming.
      </p>
    </Body>
  );
}
