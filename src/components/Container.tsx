import { ReactElement, ReactNode } from 'react';

export function Container({ children, ...props }: { children: ReactNode }): ReactElement {
  return (
    <div className="container" {...props}>
      {children}

      <style jsx>{`
        .container {
          margin: 0 auto;
          max-width: 100%;
          padding: 0 1rem;
          position: relative;
        }
        .container:before,
        .container:after {
          content: '';
          display: table;
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
