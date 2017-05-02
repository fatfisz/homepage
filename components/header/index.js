import Container from 'components/container';
import Fisz from 'components/header/fisz';
import Image from 'components/image';


export default function Header() {
  return (
    <div className="navigation-background">
      <Container>
        <nav className="navigation">
          <Fisz />
          <div>
            <strong>
              FatFisz's humble website
            </strong>
          </div>
        </nav>
      </Container>

      <style jsx>{`
        .navigation-background {
          background-color: #ffe082;
        }

        .navigation {
          align-items: center;
          display: flex;
        }
      `}</style>
    </div>
  );
}
