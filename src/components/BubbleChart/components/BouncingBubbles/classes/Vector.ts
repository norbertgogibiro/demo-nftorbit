import {
  maxVelocity,
  movementPrecision,
  movementDecay,
} from "../BouncingBubbles.config";
import { TCoordinates, TDimension } from "../BouncingBubbles.types";

const movementDecayRate = 1 - movementDecay / 1000;

const getRandomVector = () => {
  const halfVelocity = maxVelocity / 2;
  return Math.random() * maxVelocity - halfVelocity;
};

class Vector {
  public x: number;
  public y: number;
  public handleBounce: (dimension: TDimension, entrophyRate?: number) => void;
  public getCoordinates: () => TCoordinates;
  public accelerate: (
    velocityX: number,
    velocityY: number,
    entrophyRate?: number,
  ) => void;
  public decelerate: (
    velocityX: number,
    velocityY: number,
    entrophyRate?: number,
  ) => void;

  constructor([x, y]: TCoordinates = [getRandomVector(), getRandomVector()]) {
    this.x = x;
    this.y = y;

    this.handleBounce = (dimension, entrophyRate = 1) => {
      this[dimension] *= entrophyRate * -1;
    };

    this.accelerate = (velocityX, velocityY) => {
      const changeX = this.x * movementDecayRate + velocityX;
      const changeY = this.y * movementDecayRate + velocityY;
      this.x =
        Math.abs(parseFloat(changeX.toFixed(movementPrecision))) > 0
          ? changeX
          : 0;
      this.y =
        Math.abs(parseFloat(changeY.toFixed(movementPrecision))) > 0
          ? changeY
          : 0;
    };

    this.decelerate = (velocityX, velocityY) => {
      this.accelerate(velocityX * -1, velocityY * -1);
    };

    this.getCoordinates = () => [this.x, this.y];
  }
}

export default Vector;
