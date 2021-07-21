import { MapElement } from "./MapElement";
import { Coordinates, RGBA } from ".";
import { PureBoxParams } from "./Box";
import { getColoredGrid } from "../utils/getGrid";

export class StreetLamp extends MapElement {
  verticalStickColor: RGBA = [70, 59, 54];
  stickColor: RGBA = [58, 35, 30];
  ropeColor: RGBA = [169, 108, 84];

  constructor(coordinates: Coordinates, seed: number) {
    super(coordinates, seed);

    this.draft = [...this.drawStick()];
  }

  drawStick = (): PureBoxParams[] => {
    const { x, y, z } = this.coordinates;

    const drawGrid = getColoredGrid(this.stickColor);

    const result: PureBoxParams[] = [];

    const stickHeight = 12;

    for (let i = 0; i < stickHeight; i++) {
      result.push(
        ...drawGrid([
          [x, y + i, z],
        ])
      );
    }

    const horizontalStickStart = 3;
    const horizontalStickWidth = -15;

    const drawHorizontalGrid = getColoredGrid(this.verticalStickColor);

    for (let i = horizontalStickStart; i > (horizontalStickStart + horizontalStickWidth); i--) {
      result.push(
        ...drawHorizontalGrid([
          [x, y + stickHeight, z + i],
        ])
      );
    }

    const drawRopeGrid = getColoredGrid(this.ropeColor, undefined, "half");

    result.push(
      ...drawRopeGrid([
        [x - 0.5, y  + (stickHeight + 9.5), z - 1.5],
        [x + 0.5, y  + (stickHeight + 9.5), z - 1.5],
        [x - 1.5, y  + (stickHeight + 10.5), z - 0.5],
        [x - 1.5, y  + (stickHeight + 11.5), z + 0.5],
        [x - 1.5, y  + (stickHeight + 12.5), z + 1.5],
        [x - 0.5, y  + (stickHeight + 13.5), z + 2.5],
        [x + 0.5, y  + (stickHeight + 13.5), z + 2.5],
        [x + 1.5, y  + (stickHeight + 12.5), z + 1.5],
        [x + 1.5, y  + (stickHeight + 11.5), z + 0.5],
        [x + 1.5, y  + (stickHeight + 10.5), z - 0.5],

        [x - 0.5, y  + (stickHeight + 8.5), z + 1.5],
        [x + 0.5, y  + (stickHeight + 8.5), z + 1.5],
        [x - 1.5, y  + (stickHeight + 9.5), z + 0.5],
        [x + 1.5, y  + (stickHeight + 9.5), z + 0.5],
        [x - 1.5, y  + (stickHeight + 11.5), z - 1.5],
        [x - 1.5, y  + (stickHeight + 12.5), z - 2.5],
        [x + 1.5, y  + (stickHeight + 11.5), z - 1.5],
        [x + 1.5, y  + (stickHeight + 12.5), z - 2.5],

        [x - 0.5, y  + (stickHeight + 13.5), z - 2.5],
        [x + 0.5, y  + (stickHeight + 13.5), z - 2.5],
      ])
    );


    return result;
  };
}
