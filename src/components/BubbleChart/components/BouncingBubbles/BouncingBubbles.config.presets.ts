import ConfigPreset from "./classes/ConfigPreset";

const presets = {
  default: new ConfigPreset(),
  billiard: new ConfigPreset({
    maxVelocity: 10,
    frameBounce: 0.3,
    collisionBounce: 0.3,
    movementDecay: 0.1,
  }),
  coolDown: new ConfigPreset({
    maxVelocity: 10,
    movementDecay: 0.001,
  }),
  quickStop: new ConfigPreset({
    maxVelocity: 10,
    movementDecay: 1,
  }),
  slowFrameUpdate: new ConfigPreset({
    frameFrequency: 20,
    maxVelocity: 0.1,
  }),
  fallingDust: new ConfigPreset({
    gravityForce: { up: -0.05 },
    movementDecay: 2,
    splitVelocity: 0.005,
    attractionStrength: -0.05,
    movementPrecision: 2,
  }),
  slowMove: new ConfigPreset({
    maxVelocity: 0.05,
    frameBounce: 0,
    sloppiness: 0,
    movementDecay: 0,
    splitVelocity: 0.00025,
  }),
  slowMoveWithRepulses: new ConfigPreset({
    maxVelocity: 0.05,
    frameBounce: 0,
    sloppiness: 0,
    movementDecay: 0,
    splitVelocity: 0.0025,
    attractionStrength: -0.00007,
  }),
  attraction: new ConfigPreset({
    frameFrequency: 1,
    maxVelocity: 0.025,
    frameBounce: 0,
    collisionBounce: 0.6,
    sloppiness: 0,
    movementDecay: 0.7,
    attractionStrength: 0.01,
  }),
  repulsion: new ConfigPreset({
    frameFrequency: 1,
    maxVelocity: 0.025,
    frameBounce: 0,
    collisionBounce: 0.8,
    sloppiness: 0,
    movementDecay: 0.7,
    attractionStrength: -0.05,
  }),
  everythingRepulses: new ConfigPreset({
    frameFrequency: 1,
    maxVelocity: 0.025,
    frameBounce: 0,
    collisionBounce: 0.5,
    sloppiness: 0,
    movementDecay: 0.7,
    attractionStrength: -0.05,
    movementPrecision: 2,
    gravityForce: {
      down: -0.03,
      up: -0.03,
      right: -0.03,
      left: -0.03,
    },
  }),
  hardlyStoppingGentleBouncing: new ConfigPreset({
    frameFrequency: 20,
    maxVelocity: 0.05,
    frameBounce: 1,
    collisionBounce: 0.5,
    movementDecay: 0.0001,
    splitVelocity: 9,
  }),
};

export default presets;
