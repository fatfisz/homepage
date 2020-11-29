export interface Point {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  dr: number;
  mass: number;
  draw: Draw;
}

export type Draw = (context: CanvasRenderingContext2D, x: number, y: number, r: number) => void;
