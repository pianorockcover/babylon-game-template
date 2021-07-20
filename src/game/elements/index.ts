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

export type RGBA = number[];

/**
 * Размер базового блока - full
 */
export const boxScale = 0.1;
