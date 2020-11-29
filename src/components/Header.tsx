import { ReactElement } from 'react';

import { Menu } from './Menu';

export function Header(): ReactElement {
  return (
    <>
      <nav className="navigation">
        <img
          className="gravatar"
          src="https://www.gravatar.com/avatar/dcc938049e3618d715d4e45eeb2cc314"
          alt="my face"
        />
        <div className="title">FatFisz&apos;s homepage</div>
        <Menu />
      </nav>

      <style jsx>{`
        .navigation {
          align-items: center;
          /* Color(grey100).fade(0.2) */
          background-color: rgba(245, 245, 245, 0.8);
          display: flex;
          padding: 0 1rem;
          position: relative;
        }

        .gravatar {
          border-radius: 50%;
          display: block;
          height: 48px;
          margin-right: 1rem;
          width: 48px;
        }
        @media (max-width: 767px) {
          .gravatar {
            height: 36px;
            width: 36px;
          }
        }

        .title {
          font-weight: 700;
          margin-right: 2rem;
        }
      `}</style>
    </>
  );
}
