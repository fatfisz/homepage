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
        I have a wife. <a href="https://www.instagram.com/fixtheworldup/">She can write quite well</a>.
      </p>
      <p>
        I'm mostly occupied with creating websites, preferably the front-end side of them.
        I'm currently trying to make <a href="https://codility.com/">Codility</a> more awesome.
      </p>
      <p>
        I have some projects on GitHub: <a href="https://github.com/fatfisz">@fatfisz</a>.
      </p>
      <p>
        I created two games:
      </p>
      <ul>
        <li>
          <a href="http://js13kgames.com/entries/sobanko">Sobanko</a>, a reverse Sokoban. The levels come from the original one.
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
          My name has some funny characters because I was born and live in Poland.
        </li>
        <li>
          Both people in Poland and outside of it usually write "fatfi<strong>sh</strong>" instead of "fatfi<strong>sz</strong>" the first time.
          I have one troublesome nick.
        </li>
        <li>
          I've been playing computer games since year 1.
          Here are some of the games I currently like:
          {' '}<a href="http://store.steampowered.com/app/105600/Terraria/">Terraria</a>,
          {' '}<a href="http://store.steampowered.com/app/311690/Enter_the_Gungeon/">Enter The Gungeon</a>,
          {' '}<a href="http://store.steampowered.com/app/570/Dota_2/">Dota 2</a> (love-hate relationship),
          {' '}<a href="http://store.steampowered.com/app/275850/No_Mans_Sky/">No Man's Sky</a>.
        </li>
      </ul>
    </Body>
  );
}
