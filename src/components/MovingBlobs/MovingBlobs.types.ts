export type TCoordinate = {
  x: number;
  y: number;
};

export type TPoint = {
  position: TCoordinate;
  vector: TCoordinate;
};

export type TBlob = {
  color: string;
  points?: TPoint[];
  initialVector: TCoordinate;
  initialPositions: TCoordinate[];
};
