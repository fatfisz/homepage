import {
  grey800,
  lightBlue700,
  lightBlue800,
  lightBlue900,
} from 'constants/colors';

export default function GlobalStyles() {
  return (
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }

      html {
        font-family: Lato, sans-serif;
        font-size: 18px;
      }

      body {
        background-image: url(/static/background.svg);
        color: ${grey800};
        margin: 0;
      }

      a {
        color: ${lightBlue700};
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      a:focus, a:hover {
        color: ${lightBlue800};
      }
      a:active {
        color: ${lightBlue900};
      }

      p, ul {
        margin: 1rem 0;
      }

      li {
        margin: 0.5rem 0;
      }
    `}</style>
  );
}
