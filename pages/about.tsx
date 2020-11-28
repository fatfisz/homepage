import { Title } from 'components/Title';
import { ReactElement } from 'react';

export default function AboutPage(): ReactElement {
  return (
    <>
      <Title>About</Title>

      <p>
        My name&apos;s Rafał Ruciński. I was born in the beautiful city of Szczecin, Poland; right
        now I live in Warsaw.
      </p>
      <p>
        I&apos;m a front-end developer by trade. Currently I&apos;m a part of the{' '}
        <a href="https://www.tooploox.com/">Tooploox</a> team.
      </p>
      <p>
        After work I enjoy bouldering. From time to time I also play music on whatever instrument I
        have in my hands at the moment.
      </p>
      <p>
        I have some projects on GitHub: <a href="https://github.com/fatfisz">@fatfisz</a>.
      </p>
      <p>
        Once every few years I take part in the{' '}
        <a href="https://js13kgames.com/">js13kGames competition</a>. So far I&apos;ve created three
        games:
      </p>
      <ul>
        <li>
          <a href="http://js13kgames.com/entries/space-wizard-toast-spinning">
            Space Wizard Toast Spinning
          </a>
          , a game about a spinning slice of toast
        </li>
        <li>
          <a href="http://js13kgames.com/entries/sobanko">Sobanko</a>, a reverse Sokoban; the levels
          are copied from the original one
        </li>
        <li>
          <a href="http://js13kgames.com/entries/anti-paradox-run">Anti-Paradox Run</a>, an infinite
          runner
        </li>
      </ul>
    </>
  );
}
