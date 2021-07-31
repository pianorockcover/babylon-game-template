import { Color3, MeshBuilder, StandardMaterial } from "babylonjs";
import { RGBA, Coordinates } from ".";
import { randomInt } from "../utils/randomInt";
import { PureBoxParams } from "./Box";
import { MapElement } from "./MapElement";
import { modSeed } from "../utils/modSeed";
import { randomElement } from "../utils/randomElement";

export class Stone extends MapElement {
  colors: RGBA[] = [
    [158, 158, 158]
  ];

  maxX = 9;
  maxY = 9;
  maxZ = 9;

  size: Coordinates = { x: this.maxX, z: this.maxZ, y: this.maxY };

  constructor(coordinates: Coordinates, seed: number) {
    super(coordinates, seed);

    this.draft = [...this.drawStone()];
  }

  drawStone = (): PureBoxParams[] => {
    const result: PureBoxParams[] = [];
    const { x, y, z } = this.coordinates;

    const maxY = modSeed(this.seed, [0, 1], [5, this.maxY]);
    let maxX = modSeed(this.seed, [2, 1], [5, this.maxX]);
    let maxZ = modSeed(this.seed, [1, 0], [5, this.maxZ]);

    for (let j = 0; j < maxY; j++) {
      maxX--;
      maxZ--;
      for (let i = 0; i < maxX; i++) {
        for (let k = 0; k < maxZ; k++) {
          if (randomInt(100, 999) % 3 !== 0) {
            continue;
          }
          result.push({
            coordinates: {
              x: i,
              y: j,
              z: k,
            },
            color: randomElement(this.colors)
          });
        }
      }
    }

    return result;
  };
}
