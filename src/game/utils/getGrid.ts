import { RGBA } from "../elements";
import { PureBoxParams, BoxSize } from "../elements/Box";

/**
 * Рисует группу пикселей одного цвета
 *
 * @param color
 * @param texture
 */
export const getColoredGrid = (color: RGBA, texture?: string, size?: BoxSize) => (
  boxes: number[][]
): PureBoxParams[] =>
  boxes.map(([x, y, z]) => ({
    coordinates: {
      x: x,
      y: y,
      z: z,
      stepSize: size,
    },
    size,
    color,
    texture,
  }));
