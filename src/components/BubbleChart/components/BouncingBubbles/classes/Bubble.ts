import {
  collisionBounce,
  frameBounce,
  gravityForce,
  splitVelocity,
  sloppiness,
  attractionStrength,
} from "../BouncingBubbles.config";
import {
  TBubbleDisplayData,
  TBubbleProps,
  TSupportedColor,
} from "../BouncingBubbles.types";
import Point from "./Point";
import Vector from "./Vector";

const getSquare = (number: number) => number * number;

class Bubble {
  public position: Point;
  public vector: Vector;
  public radius: number;
  public color: TSupportedColor;
  public isMoving: boolean | null;
  public displayData: TBubbleDisplayData;
  public moveWithinFrame: () => void;
  private handleAttractionWithFrame: () => void;
  public handleAttractionWith: (anotherBubble: this) => void;
  public handleOverlappingWith: (anotherBubble: this, depth: number) => void;
  public handleCollisionWith: (anotherBubble: this) => void;
  public resolveCollisionWith: (anotherBubble: this) => void;
  private isCollidingWith: (anotherBubble: this) => boolean;

  private getDistanceWith: (anotherBubble: this) => {
    distance: number;
    dimensionDifferences: { x: number; y: number };
  };

  constructor({
    initialPosition = new Point(),
    initialSpeed = new Vector(),
    radius,
    color,
    frameDimensions,
    displayData,
  }: TBubbleProps) {
    const [frameWidth, frameHeight] = frameDimensions;
    this.isMoving = null;
    this.position = initialPosition;
    this.vector = initialSpeed;
    this.radius = radius;
    this.color = color;
    this.displayData = displayData;

    this.moveWithinFrame = () => {
      const previousPosition = new Point(this.position.getCoordinates());
      this.position.translateByVector(this.vector);

      if (this.position.x > frameWidth - this.radius) {
        this.position.adjust("x", frameWidth - this.radius);
        this.vector.handleBounce("x", frameBounce);
      } else if (this.position.x < this.radius) {
        this.position.adjust("x", this.radius);
        this.vector.handleBounce("x", frameBounce);
      }

      if (this.position.y > frameHeight - this.radius) {
        this.position.adjust("y", frameHeight - this.radius);
        this.vector.handleBounce("y", frameBounce);
      } else if (this.position.y < this.radius) {
        this.position.adjust("y", this.radius);
        this.vector.handleBounce("y", frameBounce);
      }

      this.handleAttractionWithFrame();

      this.isMoving =
        this.position.x !== previousPosition.x ||
        this.position.y !== previousPosition.y;
    };

    this.handleAttractionWithFrame = () => {
      const distanceToEdge = {
        top: this.position.y,
        right: frameWidth - this.position.x,
        bottom: frameHeight - this.position.y,
        left: this.position.x,
      };

      const forceX =
        (gravityForce.right * distanceToEdge.left -
          gravityForce.left * distanceToEdge.right) /
        frameWidth;

      const forceY =
        (gravityForce.down * distanceToEdge.top -
          gravityForce.up * distanceToEdge.bottom) /
        frameHeight;

      this.vector.accelerate(forceX, forceY);
    };

    this.isCollidingWith = (anotherBubble) => {
      const rSum = this.radius + anotherBubble.radius;

      const polarizedDistance = new Point([
        anotherBubble.position.x - this.position.x,
        anotherBubble.position.y - this.position.y,
      ]);

      const areBubblesColliding =
        getSquare(rSum) >
        getSquare(polarizedDistance.x) + getSquare(polarizedDistance.y);

      return areBubblesColliding;
    };

    this.getDistanceWith = (anotherBubble) => {
      const dimensionDifferences = {
        x: this.position.x - anotherBubble.position.x,
        y: this.position.y - anotherBubble.position.y,
      };

      const distance = Math.sqrt(
        getSquare(dimensionDifferences.x) + getSquare(dimensionDifferences.y),
      );

      return {
        distance,
        dimensionDifferences,
      };
    };

    this.handleOverlappingWith = (anotherBubble, depth) => {
      const correction =
        (Math.max(depth - sloppiness, 0) /
          (1 / this.radius + 1 / anotherBubble.radius)) *
        splitVelocity;

      let norm = new Vector([
        anotherBubble.position.x - this.position.x,
        anotherBubble.position.y - this.position.y,
      ]);

      // This causes bug when 0 --> getSquare(norm.x) / magnitude = NaN
      // const magnitude = Math.sqrt(getSquare(norm.x) + getSquare(norm.y));
      const magnitude =
        Math.sqrt(getSquare(norm.x) + getSquare(norm.y)) || 0.001;

      norm = new Vector([
        getSquare(norm.x) / magnitude,
        getSquare(norm.y) / magnitude,
      ]);

      const corrections = {
        x: correction * norm.x,
        y: correction * norm.y,
      };

      this.vector.decelerate(
        (1 / this.radius) * corrections.x,
        (1 / this.radius) * corrections.y,
      );

      anotherBubble.vector.accelerate(
        (1 / anotherBubble.radius) * corrections.x,
        (1 / anotherBubble.radius) * corrections.y,
      );
    };

    this.resolveCollisionWith = (anotherBubble) => {
      const releaseVelocities = new Vector([
        anotherBubble.vector.x - this.vector.x,
        anotherBubble.vector.y - this.vector.y,
      ]);

      let norm = new Point([
        anotherBubble.position.x - this.position.x + 1, // +1 prevents from dividing by 0
        anotherBubble.position.y - this.position.y + 1, // +1 prevents from dividing by 0
      ]);

      const magnitude = Math.sqrt(getSquare(norm.x) + getSquare(norm.y));
      norm = new Point([norm.x / magnitude, norm.y / magnitude]);

      const velAlongNorm =
        releaseVelocities.x * norm.x + releaseVelocities.y * norm.y;

      if (velAlongNorm > 0) {
        return;
      }

      let j = -(1 + collisionBounce) * velAlongNorm;

      j /= 1 / this.radius + 1 / anotherBubble.radius;

      const impulse = new Vector([j * norm.x, j * norm.y]);

      this.vector.decelerate(
        (1 / this.radius) * impulse.x,
        (1 / this.radius) * impulse.y,
      );

      anotherBubble.vector.accelerate(
        (1 / anotherBubble.radius) * impulse.x,
        (1 / anotherBubble.radius) * impulse.y,
      );
    };

    this.handleCollisionWith = (anotherBubble) => {
      if (this.isCollidingWith(anotherBubble)) {
        const radiusSum = this.radius + anotherBubble.radius;
        const { distance } = this.getDistanceWith(anotherBubble);
        const collisionDepth = radiusSum - distance;
        this.handleOverlappingWith(anotherBubble, collisionDepth);
        this.resolveCollisionWith(anotherBubble);
      }
    };

    this.handleAttractionWith = (anotherBubble) => {
      if (!this.isCollidingWith(anotherBubble)) {
        const { distance, dimensionDifferences } =
          this.getDistanceWith(anotherBubble);

        const force =
          (attractionStrength * anotherBubble.radius * this.radius) /
          getSquare(distance);

        // Calculate the force components in x and y directions
        const forceX = (force * dimensionDifferences.x) / distance;
        const forceY = (force * dimensionDifferences.y) / distance;
        this.vector.decelerate(forceX, forceY);
      }
    };
  }
}

export default Bubble;
