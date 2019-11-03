import Body from 'components/body';
import Title from 'components/title';

export default function About() {
  return (
    <Body>
      <Title>About me</Title>

      <h3>
        My name's Rafał Ruciński.
      </h3>
      <p>
        I'm mostly occupied with creating websites, preferably the front-end side of them.
        Currently I'm trying to make <a href="https://codility.com/">Codility</a> more awesome.
      </p>
      <p>
        I have some projects on GitHub: <a href="https://github.com/fatfisz">@fatfisz</a>.
      </p>
      <p>
        So far I have created three games:
      </p>
      <ul>
        <li>
          <a href="http://js13kgames.com/entries/space-wizard-toast-spinning">Space Wizard Toast Spinning</a>, a game about a spinning slice of toast.
        </li>
        <li>
          <a href="http://js13kgames.com/entries/sobanko">Sobanko</a>, a reverse Sokoban. The levels are copied from the original one.
        </li>
        <li>
          <a href="http://js13kgames.com/entries/anti-paradox-run">Anti-Paradox Run</a>, an infinite runner.
        </li>
      </ul>
      <br />
      <p>
        Some trivia:
      </p>
      <ul>
        <li>
          My name has some funny characters because I was born in Poland.
        </li>
        <li>
          Both people in Poland and outside of it usually write "fatfi<strong>sh</strong>" instead of "fatfi<strong>sz</strong>" the first time.
          I have one troublesome nick.
        </li>
        <li>
          I've been playing computer games since year 1.
          Here are some of the games I currently play:
          {' '}<a href="https://store.steampowered.com/app/427520/Factorio/">Factorio</a>,
          {' '}<a href="https://store.steampowered.com/app/457140/Oxygen_Not_Included/">Oxygen Not Included</a>,
          {' '}<a href="http://store.steampowered.com/app/105600/Terraria/">Terraria</a>,
          and finally <a href="http://store.steampowered.com/app/570/Dota_2/">Dota 2</a> (a love-hate relationship),
        </li>
      </ul>
    </Body>
  );
}
