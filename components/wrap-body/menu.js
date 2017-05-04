import Color from 'color';
import Link from 'next/link';

import { grey100, grey800 } from 'constants/colors';


const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
];

export default function Menu() {
  return (
    <div className="menu">
      {links.map(({ href, label }) =>
        <Link key={href} href={href} prefetch>
          <a className="link">{label}</a>
        </Link>
      )}

      <style jsx>{`
        .menu {
          display: flex;
        }

        .link {
          align-items: center;
          color: ${grey800};
          display: flex;
          height: 64px;
          padding: 0 16px;
          text-decoration: none;
          transition: background-color 0.1s ease;
        }
        .link:hover {
          background-color: ${Color(grey100).darken(0.05).fade(0.2)};
        }
        .link:focus,.link:hover {
          color: ${Color(grey800).darken(0.1)};
        }
      `}</style>
    </div>
  );
}
