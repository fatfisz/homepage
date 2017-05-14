import Color from 'color';

import Menu from 'components/body/menu';
import Container from 'components/container';
import { grey100 } from 'constants/colors';


export default function Header() {
  return (
    <div className="navigation-background">
      <Container>
        <nav className="navigation">
          <img
            className="gravatar"
            src="https://www.gravatar.com/avatar/dcc938049e3618d715d4e45eeb2cc314"
          />
          <div className="title">
            FatFisz's homepage
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

        .gravatar {
          border-radius: 50%;
          display: block;
          height: 48px;
          margin-right: 16px;
          width: 48px;
        }
        @media (max-width: 575px) {
          .gravatar {
            height: 36px;
            width: 36px;
          }
        }

        .title {
          font-weight: 700;
          margin-right: 16px;
        }
      `}</style>
    </div>
  );
}
