import { circle, cross, square, triangle } from './shapes';
import { Point } from './types';

const mass = 1000;

const mouseMass = 5000;

const pointDensity = 1 / 10000;

const maxForce = 1000;

const dLimit = 1000;

const dLimitDamp = 0.9;

const generalDamp = 0.99;

const bucketSize = 200;

const shapes = [triangle, circle, cross, square];

export class Points {
  private points: Point[] = [];
  private width: number;
  private height: number;
  private xOffset = 0;
  private yOffset = 0;
  private buckets = new Map<string, Set<Point>>();

  constructor(width: number, height: number, xOffset: number, yOffset: number) {
    this.width = width;
    this.height = height;
    this.xOffset = xOffset;
    this.yOffset = yOffset;
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
    xOffset: number,
    yOffset: number,
  ): void {
    this.width = width;
    this.height = height;
    this.ensurePointCount();
    this.handleOffsetDiff(this.xOffset - xOffset, this.yOffset - yOffset);
    this.xOffset = xOffset;
    this.yOffset = yOffset;
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

  private handleOffsetDiff(xDiff: number, yDiff: number): void {
    for (const point of this.points) {
      point.dx += xDiff;
      point.dy += yDiff;
    }
  }

  private solve(dt: number, mouse: { x: number; y: number } | null): void {
    for (const point of this.points) {
      for (const neighbor of this.neighboringPoints(point, mouse)) {
        const force = Math.min(
          (point.mass * neighbor.mass) / distSquared(point, neighbor),
          maxForce,
        );
        const angle = Math.atan2(neighbor.y - point.y, neighbor.x - point.x);
        point.dx -= force * Math.cos(angle) * dt;
        point.dy -= force * Math.sin(angle) * dt;
      }
    }
  }

  private *neighboringPoints(
    point: { x: number; y: number },
    mouse: { x: number; y: number } | null,
  ): Generator<{ x: number; y: number; mass: number }, void, undefined> {
    if (mouse) {
      yield {
        x: mouse.x - this.xOffset,
        y: mouse.y - this.yOffset,
        mass: mouseMass,
      };
    }
    const buckets: [bucket: Set<Point>, xOffset: number, yOffset: number][] = [
      [this.getBucket(point.x, point.y), 0, 0],
    ];
    if (point.x - bucketSize < 0) {
      buckets.push([this.getBucket(point.x + this.width, point.y), -this.width, 0]);
    }
    if (point.x + bucketSize >= this.width) {
      buckets.push([this.getBucket(-1, point.y), this.width, 0]);
    }
    if (point.y - bucketSize < 0) {
      buckets.push([this.getBucket(point.x, point.y + this.height), 0, -this.height]);
    }
    if (point.y + bucketSize >= this.height) {
      buckets.push([this.getBucket(point.x, -1), 0, this.height]);
    }
    if (point.x - bucketSize < 0 && point.y - bucketSize < 0) {
      buckets.push([
        this.getBucket(point.x + this.width, point.y + this.height),
        -this.width,
        -this.height,
      ]);
    }
    if (point.x - bucketSize < 0 && point.y + bucketSize >= this.height) {
      buckets.push([this.getBucket(point.x + this.width, -1), -this.width, this.height]);
    }
    if (point.x + bucketSize >= this.width && point.y - bucketSize < 0) {
      buckets.push([this.getBucket(-1, point.y + this.height), this.width, -this.height]);
    }
    if (point.x + bucketSize >= this.width && point.y + bucketSize >= this.height) {
      buckets.push([this.getBucket(-1, -1), this.width, this.height]);
    }

    for (const [bucket, xOffset, yOffset] of buckets) {
      for (const neighbor of bucket) {
        const pseudoPoint = {
          x: neighbor.x + xOffset,
          y: neighbor.y + yOffset,
          mass: neighbor.mass,
        };
        if (neighbor !== point && distSquared(point, pseudoPoint) <= bucketSize ** 2) {
          yield pseudoPoint;
        }
      }
    }
  }

  private move(dt: number): void {
    for (const point of this.points) {
      const prevX = point.x;
      const prevY = point.y;

      if (point.dx > dLimit) {
        point.dx *= dLimitDamp;
      }
      if (point.dx < -dLimit) {
        point.dx *= dLimitDamp;
      }
      if (point.dy > dLimit) {
        point.dy *= dLimitDamp;
      }
      if (point.dy < -dLimit) {
        point.dy *= dLimitDamp;
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
    this.getBucket(x - bucketSize, y - bucketSize).add(point);
    this.getBucket(x - bucketSize, y).add(point);
    this.getBucket(x - bucketSize, y + bucketSize).add(point);
    this.getBucket(x, y - bucketSize).add(point);
    this.getBucket(x, y).add(point);
    this.getBucket(x, y + bucketSize).add(point);
    this.getBucket(x + bucketSize, y - bucketSize).add(point);
    this.getBucket(x + bucketSize, y).add(point);
    this.getBucket(x + bucketSize, y + bucketSize).add(point);
  }

  private deletePointFromBuckets(point: Point, x: number, y: number): void {
    this.getBucket(x - bucketSize, y - bucketSize).delete(point);
    this.getBucket(x - bucketSize, y).delete(point);
    this.getBucket(x - bucketSize, y + bucketSize).delete(point);
    this.getBucket(x, y - bucketSize).delete(point);
    this.getBucket(x, y).delete(point);
    this.getBucket(x, y + bucketSize).delete(point);
    this.getBucket(x + bucketSize, y - bucketSize).delete(point);
    this.getBucket(x + bucketSize, y).delete(point);
    this.getBucket(x + bucketSize, y + bucketSize).delete(point);
  }

  private getBucket(x: number, y: number): Set<Point> {
    const hash = positionToHash(x, y);
    if (!this.buckets.has(hash)) {
      this.buckets.set(hash, new Set());
    }
    return this.buckets.get(hash)!;
  }
}

function positionToHash(x: number, y: number): string {
  return `${Math.floor(x / bucketSize)},${Math.floor(y / bucketSize)}`;
}

function distSquared(first: { x: number; y: number }, second: { x: number; y: number }): number {
  return (first.x - second.x) ** 2 + (first.y - second.y) ** 2;
}
