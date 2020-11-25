import Body from 'components/body';
import Title from 'components/title';

export default function AboutPage() {
  return (
    <Body>
      <Title>About me</Title>

      <p>
        My name&apos;s Rafał Ruciński and I was born in a beautiful city of Szczecin, Poland. For
        the past few years I&apos;ve been stuck in Warsaw.
      </p>
      <p>
        I&apos;m a front-end developer by trade. Currently I&apos;m trying to make{' '}
        <a href="https://codility.com/">Codility</a> more awesome.
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
      <p>Fun facts:</p>
      <ul>
        <li>
          Both people in Poland and outside of it usually write &quot;fatfi<strong>sh</strong>&quot;
          instead of &quot;fatfi<strong>sz</strong>&quot; the first time. I have one troublesome
          nick, but it&apos;s a great conversation starter
        </li>
        <li>
          I&apos;ve been playing computer games since I was one year old (please don&apos;t judge
          me). Here are some of the games I currently play from time to time:{' '}
          <a href="https://store.steampowered.com/app/427520/Factorio/">Factorio</a>,{' '}
          <a href="https://store.steampowered.com/app/457140/Oxygen_Not_Included/">
            Oxygen Not Included
          </a>
          , <a href="http://store.steampowered.com/app/105600/Terraria/">Terraria</a>, and{' '}
          <a href="http://store.steampowered.com/app/570/Dota_2/">Dota 2</a> (a love-hate
          relationship)
        </li>
      </ul>
    </Body>
  );
}
