import { TPoint } from "./MovingBlobs.types";

type TGetNextPoint = (currentPoint: TPoint) => TPoint;

const screenOverflowPx = 50;

export const getNextPoint: TGetNextPoint = (currentPoint) => {
  const nextPoint = { ...currentPoint };

  // Propose the next coordinates:
  nextPoint.position.x += nextPoint.vector.x;
  nextPoint.position.y += nextPoint.vector.y;

  // Bounce on the X-axis when the next proposed
  // Y position is over the left client edge:
  if (nextPoint.position.x < 0 - screenOverflowPx) {
    nextPoint.position.x += 1;
    nextPoint.vector.x *= -1;
  }

  // Bounce on the Y-axis when the next proposed
  // Y position is over the top client edge:
  if (nextPoint.position.y < 0 - screenOverflowPx) {
    nextPoint.position.y += 1;
    nextPoint.vector.y *= -1;
  }

  // Bounce on the X-axis when the next proposed
  // X position is over the right client edge:
  if (nextPoint.position.x > window.innerWidth + screenOverflowPx) {
    nextPoint.position.x -= 1;
    nextPoint.vector.x *= -1;
  }

  // Bounce on the Y-axis when the next proposed
  // Y position is over the bottom client edge:
  if (nextPoint.position.y > window.innerHeight + screenOverflowPx) {
    nextPoint.position.y -= 1;
    nextPoint.vector.y *= -1;
  }

  return nextPoint;
};
