import { circle, cross, square, triangle } from './shapes';
import { Point } from './types';

const mass = 1000;

const mouseMass = 5000;

const pointDensity = 1 / 10000;

const maxForce = 500;

const generalDamp = 0.99;

const bucketSize = 200;

const shapes = [triangle, circle, cross, square];

interface PseudoPoint {
  x: number;
  y: number;
  mass: number;
}

export class Points {
  private points: Point[] = [];
  private width: number;
  private height: number;
  private offsetX = 0;
  private offsetY = 0;
  private buckets = new Map<string, Set<Point>>();

  constructor(width: number, height: number, offsetX: number, offsetY: number) {
    this.width = width;
    this.height = height;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.ensurePointCount();
  }

  get(): Readonly<Point[]> {
    return this.points;
  }

  tick(
    dt: number,
    mouse: { x: number; y: number } | null,
    width: number,
    height: number,
    offsetX: number,
    offsetY: number,
  ): void {
    this.width = width;
    this.height = height;
    this.ensurePointCount();
    this.handleOffsetDiff(this.offsetX - offsetX, this.offsetY - offsetY);
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.solve(dt, mouse);
    this.move(dt);
  }

  private ensurePointCount(): void {
    const targetCount = Math.floor(this.width * this.height * pointDensity);

    if (this.points.length < targetCount) {
      for (let index = this.points.length; index < targetCount; index += 1) {
        const point = {
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          r: Math.random() * Math.PI * 2,
          dx: 0,
          dy: 0,
          dr: ((Math.random() - 0.5) * Math.PI) / 2,
          mass,
          draw: shapes[index % 4],
        };
        this.points.push(point);
        this.addPointToBuckets(point, point.x, point.y);
      }
    }
    if (this.points.length > targetCount) {
      for (let index = this.points.length - targetCount; index > 0; index -= 1) {
        const point = this.points.pop()!;
        this.deletePointFromBuckets(point, point.x, point.y);
      }
    }
  }

  private handleOffsetDiff(diffX: number, diffY: number): void {
    for (const point of this.points) {
      point.dx += diffX;
      point.dy += diffY;
    }
  }

  private solve(dt: number, mouse: { x: number; y: number } | null): void {
    const mouseWithMass = mouse && { ...mouse, mass: mouseMass };
    for (const point of this.points) {
      this.forEachNeighbor(dt, point, mouseWithMass);
    }
  }

  private forEachNeighbor(dt: number, point: Point, mouseWithMass: PseudoPoint | null): void {
    for (const offsetX of [-this.width, 0, this.width]) {
      for (const offsetY of [-this.height, 0, this.height]) {
        if (mouseWithMass) {
          this.solvePoint(dt, point, mouseWithMass, offsetX, offsetY);
        }
        this.getBucket(point.x + offsetX, point.y + offsetY).forEach((neighbor) => {
          this.solvePoint(dt, point, neighbor, -offsetX, -offsetY);
        });
      }
    }
  }

  private solvePoint(
    dt: number,
    point: Point,
    neighbor: PseudoPoint,
    offsetX: number,
    offsetY: number,
  ): void {
    const diffX = neighbor.x - point.x + offsetX;
    const diffY = neighbor.y - point.y + offsetY;
    const dist = diffX ** 2 + diffY ** 2;
    if (neighbor !== point && dist <= bucketSize ** 2) {
      const force = (dt * point.mass * neighbor.mass) / dist;
      const angle = Math.atan2(diffY, diffX);
      point.dx -= force * Math.cos(angle);
      point.dy -= force * Math.sin(angle);
    }
  }

  private move(dt: number): void {
    for (const point of this.points) {
      const prevX = point.x;
      const prevY = point.y;

      if (point.dx ** 2 + point.dy ** 2 > maxForce ** 2) {
        const factor = maxForce / (point.dx ** 2 + point.dy ** 2) ** 0.5;
        point.dx *= factor;
        point.dy *= factor;
      }

      point.dx *= generalDamp;
      point.dy *= generalDamp;
      point.x += point.dx * dt;
      point.y += point.dy * dt;
      point.r += point.dr * dt;

      if (point.x < 0) {
        point.x += this.width;
      }
      if (point.x >= this.width) {
        point.x -= this.width;
      }
      if (point.y < 0) {
        point.y += this.height;
      }
      if (point.y >= this.height) {
        point.y -= this.height;
      }

      if (positionToHash(point.x, point.y) !== positionToHash(prevX, prevY)) {
        this.deletePointFromBuckets(point, prevX, prevY);
        this.addPointToBuckets(point, point.x, point.y);
      }
    }
  }

  private addPointToBuckets(point: Point, x: number, y: number): void {
    for (const offsetX of [-bucketSize, 0, bucketSize]) {
      for (const offsetY of [-bucketSize, 0, bucketSize]) {
        this.getBucket(x + offsetX, y + offsetY).add(point);
      }
    }
  }

  private deletePointFromBuckets(point: Point, x: number, y: number): void {
    for (const offsetX of [-bucketSize, 0, bucketSize]) {
      for (const offsetY of [-bucketSize, 0, bucketSize]) {
        this.getBucket(x + offsetX, y + offsetY).delete(point);
      }
    }
  }

  private getBucket(x: number, y: number): Set<Point> {
    const hash = positionToHash(x, y);
    const bucket = this.buckets.get(hash);
    if (bucket) {
      return bucket;
    }
    const newBucket = new Set<Point>();
    this.buckets.set(hash, newBucket);
    return newBucket;
  }
}

function positionToHash(x: number, y: number): string {
  return `${Math.floor(x / bucketSize)},${Math.floor(y / bucketSize)}`;
}
