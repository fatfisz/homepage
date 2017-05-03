import Link from 'next/link';

import Container from 'components/container';
import Image from 'components/image';
import { amber200, amber300, grey800, grey900 } from 'constants/colors';


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
          background-color: ${amber200};
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
        }
        .link:hover {
          background-color: ${amber300};
        }
        .link:focus,.link:hover {
          color: ${grey900};
        }
      `}</style>
    </div>
  );
}
