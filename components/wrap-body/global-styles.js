import Color from 'color';

import { grey800, indigo300 } from 'constants/colors';


const overlayColor = 'rgba(255, 255, 255, 0.8)';

export default function GlobalStyles() {
  return (
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }

      html {
        font-family: Lato, sans-serif;
        font-size: 18px;
        line-height: 1.5;
      }
      @media (max-width: 575px) {
        html {
          font-size: 16px;
        }
      }

      body {
        background-image:
          linear-gradient(0deg, ${overlayColor}, ${overlayColor}),
          url(/static/background.svg);
        background-position: center top;
        background-repeat: repeat-y, repeat;
        background-size: 100% 1px, 400px;
        color: ${grey800};
        margin: 0;
      }
      @media (min-width: 576px) {
        body {
          background-size: 540px 1px, 400px;
        }
      }
      @media (min-width: 768px) {
        body {
          background-size: 720px 1px, 400px;
        }
      }
      @media (min-width: 992px) {
        body {
          background-size: 960px 1px, 400px;
        }
      }
      @media (min-width: 1200px) {
        body {
          background-size: 1140px 1px, 400px;
        }
      }

      a {
        color: ${indigo300};
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      a:focus, a:hover {
        color: ${Color(indigo300).darken(0.1)};
      }
      a:active {
        color: ${Color(indigo300).darken(0.2)};
      }

      main {
        margin: 2rem 0;
      }
      @media (min-width: 576px) {
        main {
          margin: 3rem 1.5rem;
        }
      }
      @media (min-width: 768px) {
        main {
          margin: 4rem 2.5rem;
        }
      }
      @media (min-width: 992px) {
        main {
          margin: 4rem 3.5rem;
        }
      }

      p, ul {
        margin: 1rem 0;
      }

      ul {
        padding-left: 40px;
      }

      @media (max-width: 575px) {
        p, ul {
          margin: 0.75rem 0;
        }

        ul {
          padding-left: 30px;
        }
      }

      li {
        margin: 0.5rem 0;
      }
    `}</style>
  );
}
