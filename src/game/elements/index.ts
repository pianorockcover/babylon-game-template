import { BoxSize } from "./Box";

export interface Coordinates {
  x: number;
  y: number;
  z: number;
  stepSize?: BoxSize;
}

export interface Rotation {
  x: number;
  y: number;
  z: number;
}

export interface RGBA {
  r: number;
  b: number;
  g: number;
  a: number;
}

/**
 * Размер базового блока - full
 */
export const boxScale = 0.05;
