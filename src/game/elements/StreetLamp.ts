import { MapElement } from "./MapElement";
import { Coordinates, RGBA } from ".";
import { PureBoxParams } from "./Box";
import { getColoredGrid } from "../utils/getGrid";

export class StreetLamp extends MapElement {
  stickColor: RGBA = [70, 59, 54];

  constructor(coordinates: Coordinates, seed: number) {
    super(coordinates, seed);

    this.draft = [...this.drawStick()];
  }

  drawStick = (): PureBoxParams[] => {
    const { x, y, z } = this.coordinates;

    const drawGrid = getColoredGrid(this.stickColor);

    const result: PureBoxParams[] = [];

    result.push(
      ...drawGrid([
        [x, y, z],
        [x, y + 1, z],
      ])
    );

    return result;
  };
}
