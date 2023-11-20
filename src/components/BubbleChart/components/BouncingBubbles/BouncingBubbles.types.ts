import Point from "./classes/Point";
import Vector from "./classes/Vector";

export type TSupportedColor = "green" | "red";
export type TDimension = "x" | "y";

export type TBubbleDisplayData = {
  ticker: string;
  name: string;
  logo: string;
  color: TSupportedColor;
  description: string;
};

export type TBubbleProps = {
  initialPosition?: Point;
  initialSpeed?: Vector;
  frameDimensions: TCoordinates;
  radius: number;
  color: TSupportedColor;
  displayData: TBubbleDisplayData;
};

export type TCoordinates = [number, number];

export type TGravityForce = {
  up: number;
  down: number;
  left: number;
  right: number;
};

export type TRadius = number;

export type TBouncingBubblesData = {
  radius: TRadius;
  displayData: TBubbleDisplayData;
}[];
