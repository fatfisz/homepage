import { grey100 } from 'const/colors';

import { Draw } from './types';

const lineWidth = 5;
const size = 20;

export function startDraw(context: CanvasRenderingContext2D): void {
  context.lineWidth = lineWidth;
  context.strokeStyle = grey100;
  context.beginPath();
}

export function finishDraw(context: CanvasRenderingContext2D): void {
  context.stroke();
}

export const triangle = drawer([
  [0, size],
  [Math.PI * (2 / 3), size],
  [Math.PI * (4 / 3), size],
]);

export const circle: Draw = (context, x, y) => {
  const radius = size - lineWidth / 2;
  context.moveTo(x + radius, y);
  context.arc(x, y, radius, 0, 2 * Math.PI);
};

const halfCross1 = drawer([
  [0, size + lineWidth / 2],
  [Math.PI, size + lineWidth / 2],
]);
const halfCross2 = drawer([
  [Math.PI / 2, size + lineWidth / 2],
  [Math.PI * 1.5, size + lineWidth / 2],
]);
export const cross: Draw = (context, x, y, r): void => {
  halfCross1(context, x, y, r);
  halfCross2(context, x, y, r);
};

export const square = drawer([
  [0, size],
  [Math.PI / 2, size],
  [Math.PI, size],
  [Math.PI * 1.5, size],
]);

export const noop: Draw = () => {};

function drawer(radPoints: [pointX: number, pointY: number][]): Draw {
  return (context, x, y, r) => {
    const points = radPoints.map<[number, number]>(([pointX, pointY]) => [
      x + Math.sin(pointX + r) * pointY,
      y + Math.cos(pointX + r) * pointY,
    ]);

    context.moveTo(...points[points.length - 1]);
    for (const point of points) {
      context.lineTo(...point);
    }
    context.lineTo(...points[0]);
  };
}
