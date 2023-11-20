import React, { useEffect, useState } from "react";
import { TBlob, TCoordinate } from "./MovingBlobs.types";
import { getNextPoint } from "./MovingBlobs.utils";
import styles from "./MovingBlobs.module.scss";

const framePerSecond: number = 60;
const movementSpeed: number = 1; // pixel/FPS

const vectorBlob1: TCoordinate = {
  x: movementSpeed * 1.5,
  y: movementSpeed * 1,
};

const vectorBlob2: TCoordinate = {
  x: movementSpeed * -1.7,
  y: movementSpeed * 0.3,
};

const MovingBlobs = () => {
  const [blobs, setBlobs] = useState<TBlob[]>([
    {
      color: "#2F227E",
      initialVector: { ...vectorBlob1 },
      initialPositions: [
        { x: 50, y: 0 },
        { x: 200, y: 5 },
        { x: 220, y: 75 },
        { x: 0, y: 100 },
      ],
    },
    {
      color: "#061594",
      initialVector: { ...vectorBlob2 },
      initialPositions: [
        { x: window.innerWidth, y: window.innerHeight },
        { x: window.innerWidth - 300, y: window.innerHeight },
        { x: window.innerWidth - 200, y: window.innerHeight - 200 },
      ],
    },
  ]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setBlobs(
        blobs.map(
          ({ points, initialPositions, initialVector, ...blobData }) => {
            const initializedPoints =
              points ||
              initialPositions.map((position) => ({
                position,
                vector: { ...initialVector },
              }));

            return {
              ...blobData,
              initialPositions,
              initialVector,
              points: initializedPoints.map((point) => getNextPoint(point)),
            };
          },
        ),
      );
    }, 1000 / framePerSecond);

    return () => clearTimeout(timeoutId);
  });

  return (
    <div className={styles.MovingBlobs}>
      <svg>
        {blobs.map(
          ({ color, points }) =>
            points && (
              <polygon
                points={points
                  .map(({ position: { x, y } }) => `${x},${y}`)
                  .join(" ")}
                stroke={color}
                fill={color}
              />
            ),
        )}
      </svg>
    </div>
  );
};

export default MovingBlobs;
