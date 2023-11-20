import { movementPrecision } from "../BouncingBubbles.config";
import { TCoordinates, TDimension } from "../BouncingBubbles.types";
import Vector from "./Vector";

type TAdjust = (dimension: TDimension, newPosition: number) => void;
type TTranslateByVector = (vector: Vector) => void;
type TGetCoordinates = () => TCoordinates;

class Point {
  public x: number;
  public y: number;
  public adjust: TAdjust;
  public translateByVector: TTranslateByVector;
  public getCoordinates: TGetCoordinates;

  constructor([x, y]: TCoordinates = [0, 0]) {
    this.x = x;
    this.y = y;

    this.adjust = (dimension, newPosition) => {
      this[dimension] = parseFloat(newPosition.toFixed(movementPrecision));
    };

    this.translateByVector = (vector) => {
      this.x = parseFloat((this.x + vector.x).toFixed(movementPrecision));
      this.y = parseFloat((this.y + vector.y).toFixed(movementPrecision));
    };

    this.getCoordinates = () => [this.x, this.y];
  }
}

export default Point;
