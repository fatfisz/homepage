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
    <canvas
      ref={root}
      style={{
        height: '100vh',
        left: 0,
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: -1,
      }}
    />
  );
}
