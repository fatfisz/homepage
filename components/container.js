import { PropTypes } from 'react';


export default function Container({ children }) {
  return (
    <div className="container">
      {children}

      <style jsx>{`
        .container {
          margin-left: auto;
          margin-right: auto;
          max-width: 100%;
          padding-left: 16px;
          padding-right: 16px;
        }

        @media (min-width: 576px) {
          .container {
            width: 540px;
          }
        }

        @media (min-width: 768px) {
          .container {
            width: 720px;
          }
        }

        @media (min-width: 992px) {
          .container {
            width: 960px;
          }
        }

        @media (min-width: 1200px) {
          .container {
            width: 1140px;
          }
        }
      `}</style>
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};
