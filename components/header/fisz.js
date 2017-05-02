import Container from 'components/container';
import Image from 'components/image';


export default function Fisz() {
  return (
    <div className="fisz">
      <Image svgName="chybaryba" style={{ width: '100%', height: '100%' }} />

      <style jsx>{`
        .fisz {
          height: 64px;
          padding-bottom: 8px;
          padding-right: 16px;
          padding-top: 8px;
          transition-delay: 0ms, 400ms;
          transition-duration: 400ms;
          transition-property: margin-left, opacity;
          transition-timing-function: ease;
          width: 64px;
          will-change: margin-left, opacity;
        }

        .mod-hidden {
          opacity: 0;
          transition-delay: 400ms, 0ms;
          margin-left: -64px;
        }
      `}</style>
    </div>
  );
}
