import cx from 'classnames';
import { PropTypes } from 'react';


export default function Center({ children, isAbsolute }) {
  return (
    <div className={cx('outer', { 'mod-absolute': isAbsolute })}>
      <div className="inner">
        {children}
      </div>

      <style jsx>{`
        .outer {
          align-items: center;
          display: flex;
          justify-content: center;
        }

        .mod-absolute {
          left: 0;
          min-height: 100%;
          position: absolute;
          top: 0;
          width: 100%;
        }

        .inner {
          flex: 0 0 auto;
          max-width: 100%;
        }
      `}</style>
    </div>
  )
}

Center.propTypes = {
  children: PropTypes.node,
  isAbsolute: PropTypes.bool,
};

Center.defaultProps = {
  isAbsolute: false,
};
