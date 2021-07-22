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

    const result: PureBoxParams[] = [];

    const drawBasementGrid = getColoredGrid([71, 71, 71], undefined, "half");

    result.push(
      ...drawBasementGrid([
        [x - 1, y, z - 1],
        [x - 1, y, z],
        [x - 1, y, z + 1],
        [x, y, z - 1],
        [x, y, z + 1],
        [x + 1, y, z - 1],
        [x + 1, y, z],
        [x + 1, y, z + 1],
      ])
    );

    const drawGrid = getColoredGrid(this.stickColor);

    const stickHeight = 12;

    for (let i = 0; i < stickHeight; i++) {
      result.push(...drawGrid([[x, y + i, z]]));
    }

    const horizontalStickStart = 3;
    const horizontalStickWidth = -10;

    const drawHorizontalGrid = getColoredGrid(this.verticalStickColor);

    for (
      let i = horizontalStickStart;
      i > horizontalStickStart + horizontalStickWidth;
      i--
    ) {
      result.push(...drawHorizontalGrid([[x, y + stickHeight, z + i]]));
    }

    const drawRopeGrid = getColoredGrid(this.ropeColor, undefined, "half");

    result.push(
      ...drawRopeGrid([
        [x - 0.5, y + (stickHeight + 9.5), z - 1.5],
        [x + 0.5, y + (stickHeight + 9.5), z - 1.5],
        [x - 1.5, y + (stickHeight + 10.5), z - 0.5],
        [x - 1.5, y + (stickHeight + 11.5), z + 0.5],
        [x - 1.5, y + (stickHeight + 12.5), z + 1.5],
        [x - 0.5, y + (stickHeight + 13.5), z + 2.5],
        [x + 0.5, y + (stickHeight + 13.5), z + 2.5],
        [x + 1.5, y + (stickHeight + 12.5), z + 1.5],
        [x + 1.5, y + (stickHeight + 11.5), z + 0.5],
        [x + 1.5, y + (stickHeight + 10.5), z - 0.5],

        [x - 0.5, y + (stickHeight + 8.5), z + 1.5],
        [x + 0.5, y + (stickHeight + 8.5), z + 1.5],
        [x - 1.5, y + (stickHeight + 9.5), z + 0.5],
        [x + 1.5, y + (stickHeight + 9.5), z + 0.5],
        [x - 1.5, y + (stickHeight + 11.5), z - 1.5],
        [x - 1.5, y + (stickHeight + 12.5), z - 2.5],
        [x + 1.5, y + (stickHeight + 11.5), z - 1.5],
        [x + 1.5, y + (stickHeight + 12.5), z - 2.5],

        [x - 0.5, y + (stickHeight + 13.5), z - 2.5],
        [x + 0.5, y + (stickHeight + 13.5), z - 2.5],
      ])
    );

    result.push({
      coordinates: {
        x: x,
        y: y + stickHeight - 3.5,
        z: z + (horizontalStickWidth + horizontalStickStart + 1),
      },
      size: "quarter",
      color: [255, 164, 0],
      light: {
        color: [255, 164, 0, 0.2],
      },
    });

    // стекло вокруг
    result.push(
      ...this.drawGlass(
        x,
        y + stickHeight + 2,
        z + horizontalStickWidth - horizontalStickStart + 1
      )
    );

    return result;
  };

  drawGlass = (x: number, y: number, z: number): PureBoxParams[] => {
    const result: PureBoxParams[] = [];

    const drawGlassGrid = getColoredGrid(
      [164, 164, 164, 0.4],
      undefined,
      "half"
    );

    result.push(
      ...drawGlassGrid([
        [x, y + 1, z],
        [x, y + 1, z - 1],
        [x, y + 1, z + 1],
        [x - 1, y + 1, z],
        [x + 1, y + 1, z],
      ])
    );

    const glassHeight = 3;

    for (let i = 0; i < glassHeight; i++) {
      result.push(
        ...drawGlassGrid([
          [x + 1, y + 2 + i, z + 1],
          [x + 1, y + 2 + i, z],
          [x - 1, y + 2 + i, z - 1],
          [x, y + 2 + i, z - 1],
          [x - 1, y + 2 + i, z + 1],
          [x, y + 2 + i, z + 1],
          [x - 1, y + 2 + i, z],
          [x + 1, y + 2 + i, z - 1],
        ])
      );
    }

    result.push(
      ...drawGlassGrid([
        [x, y + glassHeight + 2, z],
        [x, y + glassHeight + 2, z - 1],
        [x, y + glassHeight + 2, z + 1],
        [x - 1, y + glassHeight + 2, z],
        [x + 1, y + glassHeight + 2, z],
      ])
    );

    const drawGlassBorderGrid = getColoredGrid([73, 66, 63], undefined, "half");

    result.push(
      ...drawGlassBorderGrid([
        [x + 1, y + glassHeight + 3, z + 1],
        [x + 1, y + glassHeight + 3, z],
        [x - 1, y + glassHeight + 3, z - 1],
        [x, y + glassHeight + 3, z - 1],
        [x - 1, y + glassHeight + 3, z + 1],
        [x, y + glassHeight + 3, z + 1],
        [x - 1, y + glassHeight + 3, z],
        [x + 1, y + glassHeight + 3, z - 1],

        [x, y + glassHeight + 4, z],
      ])
    );

    const drawGlasСhainGrid = getColoredGrid(
      [131, 131, 131],
      undefined,
      "quarter"
    );

    const chainHeight = 4;

    for (let i = 0; i < chainHeight; i++) {
      result.push(
        ...drawGlasСhainGrid([[x, y + i + glassHeight + 26, z - 12]])
      );
    }

    return result;
  };
}
