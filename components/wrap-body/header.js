import Color from 'color';

import Container from 'components/container';
import Image from 'components/image';
import { grey100 } from 'constants/colors';
import Menu from './menu';


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
          <Menu />
        </nav>
      </Container>

      <style jsx>{`
        .navigation-background {
          background-color: ${Color(grey100).fade(0.2)};
        }

        .navigation {
          align-items: center;
          display: flex;
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
      `}</style>
    </div>
  );
}
