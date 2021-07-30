import { boxScale, Coordinates } from ".";
import { getColoredGrid } from "../utils/getGrid";
import { PureBoxParams } from "./Box";
import { MapElement } from "./MapElement";

export class Banner extends MapElement {
  stickColor = [71, 71, 71];
  stickHeight = 12;
  bannerWidth = 15;
  bannerHeight = 8;
  bannerDepth = 0.5;

  constructor(coordinates: Coordinates, seed: number) {
    super(coordinates, seed);

    this.draft = [...this.drawStick()];
  }

  drawStick = (): PureBoxParams[] => {
    const result: PureBoxParams[] = [];

    const { x, y, z } = this.coordinates;

    const drawBasementGrid = getColoredGrid(this.stickColor, undefined, "half");

    const hX = x * 2;
    const hY = y * 2;
    const hZ = z * 2;

    result.push(
      ...drawBasementGrid([
        [hX - 1, hY, hZ - 1],
        [hX - 1, hY, hZ],
        [hX - 1, hY, hZ + 1],
        [hX, hY, hZ - 1],
        [hX, hY, hZ + 1],
        [hX + 1, hY, hZ - 1],
        [hX + 1, hY, hZ],
        [hX + 1, hY, hZ + 1],
      ])
    );

    const drawGrid = getColoredGrid(this.stickColor);

    for (let i = 0; i < this.stickHeight; i++) {
      result.push(...drawGrid([[x, y + i, z]]));
    }

    result.push({
      coordinates: {
        x,
        z,
        y: this.stickHeight + 3,
      },
      customDimensions: {
        width: this.bannerWidth,
        height: this.bannerHeight,
        depth: this.bannerDepth,
      },
      texture: "img/red21.jpg",
    });

    return result;
  };
}
