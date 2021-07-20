import { RGBA } from "../elements";
import { PureBoxParams } from "../elements/Box";

/**
 * Рисует группу пикселей одного цвета
 *
 * @param color
 * @param texture
 */
export const getColoredGrid = (color: RGBA, texture?: string) => (
  boxes: number[][]
): PureBoxParams[] =>
  boxes.map(([x, y, z]) => ({
    coordinates: {
      x: x,
      y: y,
      z: z,
    },
    color,
    texture,
  }));
