import Color from 'color';
import Link from 'next/link';

import Container from 'components/container';
import Image from 'components/image';
import { blue200, grey800 } from 'constants/colors';


const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  return (
    <div className="navigation-background">
      <Container>
        <nav className="navigation">
          <div className="gravatar-container">
            <img className="gravatar" src="http://www.gravatar.com/avatar/dcc938049e3618d715d4e45eeb2cc314" />
          </div>
          <div className="title">
            FatFisz's humble website
          </div>
          {links.map(({ href, label }) =>
            <Link key={href} href={href} prefetch>
              <a className="link">{label}</a>
            </Link>
          )}
        </nav>
      </Container>

      <style jsx>{`
        .navigation-background {
          background-color: ${blue200};
        }

        .navigation {
          align-items: stretch;
          display: flex;
          line-height: 64px;
        }

        .gravatar-container {
          margin-right: 16px;
          padding: 8px 0;
        }

        .gravatar {
          border-radius: 50%;
          display: block;
          height: 48px;
          width: 48px;
        }

        .title {
          font-weight: 700;
          margin-right: 16px;
        }

        .link {
          color: ${grey800};
          display: block;
          padding: 0 16px;
          text-decoration: none;
          transition: background-color 0.1s ease;
        }
        .link:hover {
          background-color: ${Color(blue200).darken(0.05)};
        }
        .link:focus,.link:hover {
          color: ${Color(grey800).darken(0.1)};
        }
      `}</style>
    </div>
  );
}
