import cx from 'classnames';
import Color from 'color';
import Link from 'next/link';
import { Component } from 'react';

import Image from 'components/image';
import { grey100, grey200, grey800 } from 'constants/colors';


const links = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About me' },
];

const selectedItemBackgroundColor = Color(grey100).darken(0.05).fade(0.2);
const selectedItemColor = Color(grey800).darken(0.1);

export default class Menu extends Component {
  state = {
    mobileMenuVisible: false,
  };

  render() {
    const { mobileMenuVisible } = this.state;

    return (
      <div className="menu-container">
        <div className="menu">
          {links.map(({ href, label }) =>
            <Link key={href} href={href} prefetch>
              <a className="link">{label}</a>
            </Link>
          )}
        </div>

        <div
          className={cx('overlay showable', { 'mod-visible': mobileMenuVisible })}
          onClick={this.hideMobileMenu}
        />

        <div className="menu-mobile">
          <div
            className={cx('mobile-button', { 'mod-active': mobileMenuVisible })}
            onClick={this.showMobileMenu}
          >
            <Image svgName="hamburger" fill="currentColor" />
          </div>

          <div
            className={cx('mobile-links showable', { 'mod-visible': mobileMenuVisible })}
            onClick={this.hideMobileMenu}
          >
            {links.map(({ href, label }) =>
              <Link key={href} href={href} prefetch>
                <a className="mobile-link">{label}</a>
              </Link>
            )}
          </div>
        </div>

        <style jsx>{`
          .menu-container {
            display: flex;
            flex: 1 1 auto;
            justify-content: flex-end;
          }
          @media (min-width: 576px) {
            .menu-container {
              justify-content: flex-start;
            }
          }

          .menu {
            display: flex;
          }
          @media (max-width: 575px) {
            .menu {
              display: none;
            }
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
            background-color: ${selectedItemBackgroundColor};
          }
          .link:focus,.link:hover {
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
            margin-right: -16px;
          }
          @media (min-width: 576px) {
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
            width: 200px;
            z-index: 1;
          }

          .mobile-link {
            align-items: center;
            background-color: ${grey200};
            color: ${grey800};
            display: flex;
            height: 48px;
            padding: 0 16px;
            text-decoration: none;
            transition: background-color 0.1s ease;
          }
          .mobile-link:active {
            background-color: ${Color(grey200).darken(0.05)};
            color: ${selectedItemColor};
          }
        `}</style>
      </div>
    );
  }

  showMobileMenu = () => {
    this.setState({ mobileMenuVisible: true });
  };

  hideMobileMenu = () => {
    this.setState({ mobileMenuVisible: false });
  };
}
