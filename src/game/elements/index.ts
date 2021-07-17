import { BoxSize } from "./Box";
import { Flower } from "./Flower";
import { Grass } from "./Grass";

export interface Coordinates {
  x: number;
  y: number;
  z: number;
  stepSize?: BoxSize;
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
export const boxScale = 0.125;

export const mapElements = [Grass, Flower];
