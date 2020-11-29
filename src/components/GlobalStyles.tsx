import { grey200, grey600, indigo300 } from 'const/colors';
import { ReactElement } from 'react';

export function GlobalStyles(): ReactElement {
  return (
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }

      html {
        font-family: Lato, sans-serif;
        font-size: 20px;
      }
      @media (max-width: 575px) {
        html {
          font-size: 18px;
        }
      }

      body {
        margin: 0;
      }

      a {
        color: ${indigo300};
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      a:focus,
      a:hover {
        /* Color(indigo300).darken(0.1) */
        color: hsl(230.5, 44.1%, 57.2%);
      }
      a:active {
        /* Color(indigo300).darken(0.2) */
        color: hsl(230.5, 44.1%, 50.8%);
      }

      blockquote {
        border-left: 0.2rem solid ${grey200};
        color: ${grey600};
        margin: 0;
        padding-left: 2rem;
      }

      code {
        background-color: #212121;
        border-radius: 0.2rem;
        color: #eeffff;
        display: inline-block;
        font-size: 0.9rem;
        line-height: 1.25rem;
        padding: 0 0.2rem;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 1.5rem 0;
      }

      main {
        margin: 2rem 0;
      }
      @media (min-width: 576px) {
        main {
          margin: 3rem 0rem;
        }
      }
      @media (min-width: 768px) {
        main {
          margin: 3rem 1rem;
        }
      }
      @media (min-width: 992px) {
        main {
          margin: 4rem 6.5rem;
        }
      }
      @media (min-width: 1200px) {
        main {
          margin: 4rem 11rem;
        }
      }

      p,
      ol,
      ul {
        line-height: 1.8;
        margin: 1rem 0;
      }

      ol,
      ul {
        padding-left: 2rem;
      }

      @media (max-width: 575px) {
        p,
        ol,
        ul {
          margin: 1rem 0;
        }
      }

      li {
        margin: 0.5rem 0;
        padding: 0 0 0 0.5rem;
      }
    `}</style>
  );
}
