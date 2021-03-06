import cc from 'classcat';
import { grey200, grey800 } from 'const/colors';
import Link from 'next/link';
import { ReactElement, useState } from 'react';

import Hamburger from './assets/Hamburger.react.svg';

const links = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Posts' },
  { href: '/about', label: 'About me' },
];

// Color(grey100).darken(0.05).fade(0.2)
const selectedItemBackgroundColor = 'hsla(0, 0%, 91.3%, 0.8)';
// Color(grey800).darken(0.1)
const selectedItemColor = 'hsl(0, 0%, 23.3%)';

export function Menu(): ReactElement {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  return (
    <div className="menu-container">
      <div className="menu">
        {links.map(({ href, label }) => (
          <Link key={href} href={href}>
            <a className="link">{label}</a>
          </Link>
        ))}
      </div>

      <div
        className={cc(['overlay showable', { 'mod-visible': mobileMenuVisible }])}
        onClick={() => setMobileMenuVisible(false)}
      />

      <div className="menu-mobile">
        <div
          className={cc(['mobile-button', { 'mod-active': mobileMenuVisible }])}
          onClick={() => setMobileMenuVisible(true)}
        >
          <Hamburger fill="currentColor" />
        </div>

        <div
          className={cc(['mobile-links showable', { 'mod-visible': mobileMenuVisible }])}
          onClick={() => setMobileMenuVisible(false)}
        >
          {links.map(({ href, label }) => (
            <Link key={href} href={href}>
              <a className="mobile-link">{label}</a>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .menu-container {
          display: flex;
          flex: 1 1 auto;
          justify-content: flex-end;
        }
        @media (min-width: 768px) {
          .menu-container {
            justify-content: flex-start;
          }
        }

        .menu {
          display: flex;
        }
        @media (max-width: 767px) {
          .menu {
            display: none;
          }
        }

        .link {
          align-items: center;
          color: ${grey800};
          display: flex;
          height: 64px;
          padding: 0 1rem;
          text-decoration: none;
          transition: background-color 0.1s ease;
        }
        .link:hover {
          background-color: ${selectedItemBackgroundColor};
        }
        .link:focus,
        .link:hover {
          color: ${selectedItemColor};
        }

        .showable {
          opacity: 0;
          transform: scale(0);
          transition: opacity 0.1s ease, transform 0s ease 0.1s;
        }

        .mod-visible {
          opacity: 1;
          transform: scale(1);
          transition: opacity 0.1s ease, transform 0s ease;
        }

        .overlay {
          height: 100%;
          left: 0;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1;
        }

        .menu-mobile {
          margin-right: -1rem;
        }
        @media (min-width: 768px) {
          .menu-mobile {
            display: none;
          }
        }

        .mobile-button {
          align-items: center;
          display: flex;
          height: 48px;
          justify-content: center;
          transition: background-color 0.1s ease;
          width: 48px;
        }
        .mobile-button:active,
        .mod-active {
          background-color: ${selectedItemBackgroundColor};
          color: ${selectedItemColor};
        }

        .mobile-links {
          position: absolute;
          right: 0;
          top: 100%;
          z-index: 1;
        }

        .mobile-link {
          align-items: center;
          background-color: ${grey200};
          color: ${grey800};
          display: flex;
          height: 48px;
          padding: 0 1rem;
          text-decoration: none;
          transition: background-color 0.1s ease;
        }
        .mobile-link:active {
          /* Color(grey200).darken(0.05) */
          background-color: hsl(0, 0%, 88.7%);
          color: ${selectedItemColor};
        }
      `}</style>
    </div>
  );
}
