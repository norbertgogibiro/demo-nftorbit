import { TGravityForce } from "../BouncingBubbles.types";

type TConfigPreset = {
  gravityForce?: {
    up?: number;
    down?: number;
    left?: number;
    right?: number;
  };
  [x: string]: any;
};

const defaultGravityForce: TGravityForce = {
  up: 0,
  down: 0,
  left: 0,
  right: 0,
};

class ConfigPreset {
  public frameFrequency: number;
  public maxVelocity: number;
  public frameBounce: number;
  public collisionBounce: number;
  public sloppiness: number;
  public movementDecay: number;
  public splitVelocity: number;
  public densityRatio: number;
  public attractionStrength: number;
  public movementPrecision: number;
  public gravityForce: TGravityForce;

  constructor({
    frameFrequency = 1,
    maxVelocity = 0.25,
    gravityForce = defaultGravityForce,
    frameBounce = 0.2,
    collisionBounce = 0.3,
    sloppiness = 50,
    movementDecay = 0.1,
    splitVelocity = 0.0005,
    densityRatio = 0.5,
    attractionStrength = 0,
    movementPrecision = 2,
  }: TConfigPreset = {}) {
    this.frameFrequency = frameFrequency;
    this.maxVelocity = maxVelocity;
    this.gravityForce = {
      up: gravityForce.up || defaultGravityForce.up,
      down: gravityForce.down || defaultGravityForce.down,
      left: gravityForce.left || defaultGravityForce.left,
      right: gravityForce.right || defaultGravityForce.right,
    };
    this.frameBounce = frameBounce;
    this.collisionBounce = collisionBounce;
    this.sloppiness = sloppiness;
    this.movementDecay = movementDecay;
    this.splitVelocity = splitVelocity;
    this.densityRatio = densityRatio;
    this.attractionStrength = attractionStrength;
    this.movementPrecision = movementPrecision;
  }
}

export default ConfigPreset;
