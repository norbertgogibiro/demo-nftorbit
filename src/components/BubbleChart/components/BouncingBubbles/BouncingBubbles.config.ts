import { TGravityForce } from "./BouncingBubbles.types";
import presets from "./BouncingBubbles.config.presets";

// TODO: Make this config file simpler, and move it to a new file "src/App.settings.ts"
const currentPreset = "hardlyStoppingGentleBouncing";
const overwriterSettings = {
  frameFrequency: null,
  maxVelocity: null,
  gravityForce: null,
  frameBounce: null,
  collisionBounce: null,
  sloppiness: null,
  movementDecay: null,
  splitVelocity: null,
  densityRatio: null,
  attractionStrength: null,
  movementPrecision: null,
};

// Frame update frequency in milliseconds:
/* This number should ideally be 1, but always bigger
 * than 0 in order to avoid divisions by 0 in the code! */
export const frameFrequency: number =
  overwriterSettings.frameFrequency || presets[currentPreset].frameFrequency;

// Maximum acceleration of the bubble movements:
/* px/frameFrequency */

export const maxVelocity: number =
  (overwriterSettings.maxVelocity &&
  !Number.isNaN(overwriterSettings.maxVelocity)
    ? overwriterSettings.maxVelocity
    : presets[currentPreset].maxVelocity) *
  (overwriterSettings.frameFrequency || presets[currentPreset].frameFrequency);

// Gravity force:
/* Numbers bigger than 0. If the bubbles have too soft
 * sloppiness, collisionBounce, and splitVelocity values,
 * these gravity forces could be strong enough to make
 * them overlap each other! The number needs to be adjusted
 * to the frameFrequency: the smaller the latter is, the
 * stronger the gravity will be! */
export const gravityForce: TGravityForce =
  overwriterSettings.gravityForce || presets[currentPreset].gravityForce;

// Bounce decay when bubbles hitting the frame:
/* A number between 0 and 1, where 0 sticks the bubble to
 * the wall, and 1 bounces it off without any decay */
export const frameBounce: number =
  overwriterSettings.frameBounce &&
  !Number.isNaN(overwriterSettings.frameBounce)
    ? overwriterSettings.frameBounce
    : presets[currentPreset].frameBounce;

// Bounce decay when bubbles collide with each other:
/* A number between 0 and 1, where 0 means perfect inelastic
 * collision, 0.5 means perfect elastic collision, 1 means
 * the colliding bubble bounces back with the same velocity,
 * while transferring the same amount to the other bubble
 * (so 0.5+ can result in higher energy than before collision).
 * Mass (or diameter of the circle) is ignored! */
export const collisionBounce: number =
  overwriterSettings.collisionBounce &&
  !Number.isNaN(overwriterSettings.collisionBounce)
    ? overwriterSettings.collisionBounce
    : presets[currentPreset].collisionBounce;

// Splitting slowness when bubbles overlay with each other:
/* A number that is 0 or bigger, where 0 results in bubbles
 * launching fast away from each other, and the bigger the
 * number is, the slower they move away from each other */
export const sloppiness: number =
  overwriterSettings.sloppiness && !Number.isNaN(overwriterSettings.sloppiness)
    ? overwriterSettings.sloppiness
    : presets[currentPreset].sloppiness;

// Movement decay of the bubbles:
/* A number bigger than 0, where 0 means the bubble will not
 * loose its momentum at all without collisions, and the
 * bigger the number is the faster they would slow down until
 * they would stop forever */
export const movementDecay: number =
  overwriterSettings.movementDecay &&
  !Number.isNaN(overwriterSettings.movementDecay)
    ? overwriterSettings.movementDecay
    : presets[currentPreset].movementDecay;

// Acceleration of overlapping bubbles:
/* A number between 0 and 1, where 0 means that the overlapping
 * bubbles dont leave each other, and 1 means they launch out
 * of each other's area rapidly */
export const splitVelocity: number =
  overwriterSettings.splitVelocity &&
  !Number.isNaN(overwriterSettings.splitVelocity)
    ? overwriterSettings.splitVelocity
    : presets[currentPreset].splitVelocity;

// Bubble density within the canvas area:
/* A number between 0 and 1, where the number multiplied by 100
 * represents the percentage of the canvas area that should be
 * filled with bubbles. Thus the bubbles would be scaled smaller
 * relative to the canvas area in order to fit the area that is
 * considered available within it. The number should not go above
 * 0.5: the less empty space is left, the more tries are likely,
 * thus more calculation needed, which would result in lagging! */
export const densityRatio: number =
  overwriterSettings.densityRatio &&
  !Number.isNaN(overwriterSettings.densityRatio)
    ? overwriterSettings.densityRatio
    : presets[currentPreset].densityRatio;

// Attraction strength between bubbles:
/* Simulates a magnet-like force among the bubbles. Positive values
 * result in attraction, negative ones in repulsion.*/
export const attractionStrength =
  overwriterSettings.attractionStrength &&
  !Number.isNaN(overwriterSettings.attractionStrength)
    ? overwriterSettings.attractionStrength
    : presets[currentPreset].attractionStrength;

// Movement calculation precision decimals:
/* This limits the decimals when calculating vectors. Very small
 * changes can not even be detected, or would result in unnecessary
 * pixel wobble, so it is useful to set a calculation limit when the
 * calculation should be considered virtually zero */
export const movementPrecision =
  overwriterSettings.movementPrecision &&
  !Number.isNaN(overwriterSettings.movementPrecision)
    ? overwriterSettings.movementPrecision
    : presets[currentPreset].movementPrecision;
