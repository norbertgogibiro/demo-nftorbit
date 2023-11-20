import React, { RefObject, useEffect, useState } from "react";
import classNames from "classnames";
import Button from "components/Button/Button";
import { frameFrequency, densityRatio } from "./BouncingBubbles.config";
import {
  TCoordinates,
  TBouncingBubblesData,
  TRadius,
  TBubbleDisplayData,
} from "./BouncingBubbles.types";
import Point from "./classes/Point";
import Bubble from "./classes/Bubble";
import styles from "./BouncingBubbles.module.scss";

type TCircle = {
  position: Point;
  radius: TRadius;
  displayData?: TBubbleDisplayData;
};

type TGetDatafinalBubbleAreas = (
  rawBubbles: { radius: TRadius; displayData: TBubbleDisplayData }[],
  frameDimensions: TCoordinates,
) => Bubble[];

export type TBouncingBubblesProps = {
  data: TBouncingBubblesData;
  className?: string;
  handleBubbleClick: (collectionTicker: string) => void;
};

const getCircleArea = (radius: TRadius) => Math.PI * Math.pow(radius, 2);

const getInitialBubbles: TGetDatafinalBubbleAreas = (
  rawBubbles,
  frameDimensions,
) => {
  let dataInitializedBubbles: TCircle[] = [];
  const [frameWidth, frameHeight] = frameDimensions;
  const canvasArea = frameWidth * frameHeight;

  // Set the ratio of the canvas area to be filled, including some slack for empty space:
  const areaToFill = canvasArea * densityRatio;

  const scaleBubbles = () => {
    const sumAreas = rawBubbles.reduce((total, { radius }) => {
      return total + getCircleArea(radius);
    }, 0);

    const scaleFactor = areaToFill / sumAreas;

    return rawBubbles.map((bubble) => ({
      ...bubble,
      radius: Math.sqrt(scaleFactor) * bubble.radius,
    }));
  };

  const isOverlapping = (currentBubble: TCircle): boolean => {
    return !dataInitializedBubbles.every((occupiedArea) => {
      const distance = Math.sqrt(
        Math.pow(currentBubble.position.x - occupiedArea.position.x, 2) +
          Math.pow(currentBubble.position.y - occupiedArea.position.y, 2),
      );

      // Return true if there is no overlap:
      return distance >= currentBubble.radius + occupiedArea.radius;
    });
  };

  // Define the maximum number of attempts to place a bubble in a random position:
  /* After all attempts, the loop "gives it up", resets all calculated random bubble
   * positions, and starts with new ones. The more attempts available, the less
   * resetting happens, which fastens the code. But the higher the number of allowed
   * attempts, the slower it takes for the loop to realize that a particular bubble
   * can not be placed anywhere among the already calculated ones, and a new solution
   * is needed from sketch */
  const maxPlacingAttempts = 10000;

  // Sort the bubbles from biggest to smallest:
  /* It is easier to place bigger bubbles first, because they require more space, and
   * the less bubbles there are, the more of it is available. So by sorting the bubbles,
   * we can actually reduce the times when the loop "gives it up" by reaching the max
   * allowed attempts */
  const scaledAndSortedBubbles = scaleBubbles().sort((a, b) => {
    return b.radius - a.radius;
  });

  // Try to initialize the bubbles:
  const tryAddingBubbles = () => {
    return scaledAndSortedBubbles.every((bubble) => {
      let placingAttempts = 0;
      const { radius, displayData } = bubble;
      const position = new Point();
      const getRandomPosition = (dimensionEndPosition: number) => {
        return Math.random() * (dimensionEndPosition - 2 * radius) + radius;
      };

      // Find a random position that doesn't overlap with existing bubbles:
      do {
        position.adjust("x", getRandomPosition(frameWidth));
        position.adjust("y", getRandomPosition(frameHeight));
        placingAttempts += 1;
      } while (
        isOverlapping({ position, radius }) &&
        placingAttempts < maxPlacingAttempts
      );

      // If maximum attempts reached, then "give it up" and reset everything:
      if (placingAttempts === maxPlacingAttempts) {
        dataInitializedBubbles = [];
        return false;
      }

      // Mark the position as occupied:
      dataInitializedBubbles.push({ position, radius, displayData });
      return true;
    });
  };

  // Define the maximum number of attempts to redraw all bubbles:
  /* This number is unlikely to be reached, as long as you keep `densityRatio`
   * under control (see the suggested max amount in its own comment). The
   * lower the density ratio is, the more space is available, so the less
   * number of attempts is likely before all bubbles could be placed. Still,
   * we could possibly end up with infinite loops without adding this parameter */
  const maxRedrawAttempts = 1000;

  let isEveryBubbleAdded = false;
  let redrawAttempts = 0;

  // Try until all bubbles are initialized:
  while (!isEveryBubbleAdded && redrawAttempts < maxRedrawAttempts) {
    isEveryBubbleAdded = tryAddingBubbles();
    redrawAttempts += 1;
  }

  if (!isEveryBubbleAdded) {
    console.error(
      "There was no possible solution to place all bubbles with the current limiter values!",
    );
  }

  return dataInitializedBubbles.map(
    ({
      position,
      radius,
      displayData = {
        ticker: "",
        name: "",
        logo: "",
        color: "green",
        description: "",
      },
    }: TCircle) => {
      return new Bubble({
        initialPosition: position,
        radius,
        color: displayData.color,
        frameDimensions: [frameWidth, frameHeight],
        displayData,
      });
    },
  );
};

const BouncingBubbles = ({
  data,
  className,
  handleBubbleClick,
}: TBouncingBubblesProps) => {
  const [bubbles, setBubbles] = useState<Bubble[] | undefined>();
  const refFrame: RefObject<SVGSVGElement> = React.createRef();

  useEffect(() => {
    const { current: frame } = refFrame;
    if (frame && !bubbles) {
      const { width, height } = frame.getBoundingClientRect();
      const initBubbles = getInitialBubbles(data, [width, height]);
      setBubbles(initBubbles);
    }
  }, [bubbles, data, refFrame]);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      let hasBubblesStopped = true;

      const newBubbles = bubbles
        ? bubbles.map((bubble) => {
            // TODO: This should be handled in the class:
            bubble.moveWithinFrame();

            // TODO: This should be handled in the class:
            bubbles.forEach((anotherBubble) => {
              if (bubble !== anotherBubble) {
                bubble.handleCollisionWith(anotherBubble);
                bubble.handleAttractionWith(anotherBubble);
              }
            });

            if (bubble.isMoving) {
              hasBubblesStopped = false;
            }

            return bubble;
          })
        : [];

      if (!hasBubblesStopped) {
        setBubbles(newBubbles);
      }
    }, frameFrequency);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [bubbles]);

  return (
    <div className={classNames(styles.BouncingBubbles, className)}>
      <svg ref={refFrame} className={styles.frame}>
        {bubbles &&
          bubbles.map((bubble) => (
            <g key={bubble.displayData.name}>
              <circle
                cx={bubble.position.x}
                cy={bubble.position.y}
                r={bubble.radius}
              />
              <foreignObject
                overflow="visible"
                x={bubble.position.x - bubble.radius}
                y={bubble.position.y - bubble.radius}
                width={bubble.radius * 2}
                height={bubble.radius * 2}
              >
                <Button
                  className={classNames(
                    styles.bubble,
                    styles[`color-${bubble.color}`],
                  )}
                  onClick={() => {
                    handleBubbleClick(bubble.displayData.ticker);
                  }}
                >
                  <img
                    src={bubble.displayData.logo}
                    alt={`${bubble.displayData.name} logo`}
                  />
                </Button>
              </foreignObject>
            </g>
          ))}
      </svg>
    </div>
  );
};

export default BouncingBubbles;
