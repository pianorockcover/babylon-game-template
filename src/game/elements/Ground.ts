import { RGBA, Coordinates } from ".";
import { PureBoxParams } from "./Box";
import { MapElement } from "./MapElement";

const groundColors: RGBA[] = [
  {
    r: 43,
    g: 99,
    b: 45,
    a: 1,
  },
  {
    r: 9,
    g: 105,
    b: 13,
    a: 1,
  },
];

export class Ground extends MapElement {
  constructor(coordinates: Coordinates, seed: number) {
    super(coordinates, seed);

    this.draft = [...this.drawGround()];
  }

  drawGround = (): PureBoxParams[] => {
    const result: PureBoxParams[] = [];
    // TMP
    const groundSize = 25;
    const fromY = this.coordinates.y + 1;
    const fromX = this.coordinates.x - groundSize;
    const toX = this.coordinates.x + groundSize;

    const fromZ = this.coordinates.z - groundSize;
    const toZ = this.coordinates.z + groundSize;

    for (let i = fromX; i < toX; i++) {
      for (let j = fromZ; j < toZ; j++) {
        result.push({
          color: groundColors[0],
          coordinates: {
            x: i,
            y: fromY,
            z: j,
          },
          // texture: "/img/grass.jpg",
        });
      }
    }

    return result;
  };
}
