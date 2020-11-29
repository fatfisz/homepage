import { ReactElement, useEffect, useRef } from 'react';

import { Points } from './points';
import { finishDraw, startDraw } from './shapes';
import { useMousePosition } from './useMousePosition';

const doublingThreshold = 50;

export function Background(): ReactElement {
  const root = useRef<HTMLCanvasElement>(null);
  const mouse = useMousePosition();

  useEffect(() => {
    const context = root.current?.getContext('2d');
    if (!context) {
      return;
    }

    let handle: number;
    let prevTime = 0;

    const points = new Points(
      context.canvas.offsetWidth,
      context.canvas.offsetHeight,
      window.scrollX,
      window.scrollY,
    );

    const frame: FrameRequestCallback = (time: number) => {
      handle = requestAnimationFrame(frame);

      const dt = Math.min((time - prevTime) / 1000, 1 / 60);
      prevTime = time;
      if (time === 0) {
        return;
      }

      const width = context.canvas.offsetWidth;
      const height = context.canvas.offsetHeight;
      context.canvas.width = width;
      context.canvas.height = height;

      points.tick(dt, mouse.current, width, height, window.scrollX, window.scrollY);

      startDraw(context);
      for (const point of points.get()) {
        point.draw(context, point.x, point.y, point.r);
        if (point.x < doublingThreshold) {
          point.draw(context, point.x + width, point.y, point.r);
        }
        if (point.x >= width - doublingThreshold) {
          point.draw(context, point.x - width, point.y, point.r);
        }
        if (point.y < doublingThreshold) {
          point.draw(context, point.x, point.y + height, point.r);
        }
        if (point.y >= height - doublingThreshold) {
          point.draw(context, point.x, point.y - height, point.r);
        }
        if (point.x < doublingThreshold && point.y < doublingThreshold) {
          point.draw(context, point.x + width, point.y + height, point.r);
        }
        if (point.x < doublingThreshold && point.y >= height - doublingThreshold) {
          point.draw(context, point.x + width, point.y - height, point.r);
        }
        if (point.x >= width - doublingThreshold && point.y < doublingThreshold) {
          point.draw(context, point.x - width, point.y + height, point.r);
        }
        if (point.x >= width - doublingThreshold && point.y >= height - doublingThreshold) {
          point.draw(context, point.x - width, point.y - height, point.r);
        }
      }
      finishDraw(context);
    };

    frame(0);

    return () => {
      cancelAnimationFrame(handle);
    };
  }, [mouse]);

  return (
    <>
      <canvas ref={root} />
      <div />

      <style jsx>{`
        canvas {
          height: 100%;
          left: 0;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: -1;
        }

        div {
          background-color: #fff6;
          height: 100%;
          left: 50%;
          margin: 0;
          position: fixed;
          top: 0;
          transform: translateX(-50%);
          width: 100%;
          z-index: -1;
        }
        @media (min-width: 768px) {
          div {
            width: calc(720px - 2 * 0.5rem);
          }
        }
        @media (min-width: 992px) {
          div {
            width: calc(960px - 2 * 6rem);
          }
        }
        @media (min-width: 1200px) {
          div {
            width: calc(1140px - 2 * 10.5rem);
          }
        }
      `}</style>
    </>
  );
}
