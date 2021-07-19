import { RGBA, Coordinates } from ".";
import { randomInt } from "../utils/randomInt";
import { PureBoxParams } from "./Box";
import { MapElement } from "./MapElement";

export class Ground extends MapElement {
  groundColors: RGBA[] = [
    {
      r: 179,
      g: 218,
      b: 101,
      a: 1,
    },
    {
      r: 134,
      g: 157,
      b: 67,
      a: 1,
    },
    {
      r: 91,
      g: 108,
      b: 67,
      a: 1,
    },
    {
      r: 99,
      g: 100,
      b: 65,
      a: 1,
    },
    {
      r: 120,
      g: 119,
      b: 73,
      a: 1,
    },
  ];

  constructor(coordinates: Coordinates, seed: number) {
    super(coordinates, seed);

    this.draft = [...this.drawGround(), ...this.drawMountain()];
  }

  drawMountain = (): PureBoxParams[] => {
    const result: PureBoxParams[] = [];

    const x = 0;
    const y = -4;
    const z = 20;

    const ySize = 6;

    const mountainColors = this.groundColors.slice(0, ySize).reverse();

    let xSize = 40;
    let zSize = 30;

    for (let i = 0; i < ySize; i++) {
      const fromX = (i + 1) * 2;
      const toX = xSize - 3 * i;

      const fromZ = (i + 1) * 2;
      const toZ = zSize - 3 * i;

      for (let j = fromX; j < toX; j++) {
        let emptyNextBoxes = 0;
        for (let k = fromZ; k < toZ; k++) {
          if ((k === fromZ || k === toZ - 1) && emptyNextBoxes) {
            emptyNextBoxes -= 1;
            continue;
          } else if (
            (k === fromZ || k === toZ - 1) &&
            randomInt(100, 800) % 7 === 0
          ) {
            emptyNextBoxes = 3;
            continue;
          }

          if ((j === fromX || j === toX - 1) && randomInt(100, 800) % 5 === 0) {
            k += randomInt(2, 3);
            continue;
          }

          result.push({
            color: mountainColors[i],
            coordinates: {
              x: x + j,
              y: y + i,
              z: z - k,
            },
          });
        }
      }

      zSize -= 1;
      xSize -= 1;
    }

    return result;
  };

  drawGround = (): PureBoxParams[] => {
    const result: PureBoxParams[] = [];
    // TMP
    const groundSize = 45;
    const fromY = this.coordinates.y + 1;
    const fromX = this.coordinates.x - groundSize;
    const toX = this.coordinates.x + groundSize;

    const fromZ = this.coordinates.z - groundSize;
    const toZ = this.coordinates.z + groundSize;

    for (let i = fromX; i < toX; i++) {
      for (let j = fromZ; j < toZ; j++) {
        result.push({
          color: this.groundColors[0],
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
