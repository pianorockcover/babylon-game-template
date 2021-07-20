import { MapElement } from "./MapElement";
import { Coordinates, RGBA } from ".";
import { modSeed } from "../utils/modSeed";
import { getColoredGrid } from "../utils/getGrid";
import { PureBoxParams } from "./Box";
import { randomInt } from "../utils/randomInt";
import { randomElement } from "../utils/randomElement";

export class Tree extends MapElement {
  trunkColor: RGBA = [123, 100, 82];
  trunkStickColor: RGBA = [70, 59, 54];
  leathsColor: RGBA = [95, 210, 106];
  darkLeathsColor: RGBA = [78, 153, 98];

  appleColor: RGBA = [255, 87, 34];
  plumColor: RGBA = [200, 171, 57];
  immatureFruit: RGBA = [173, 207, 90];

  trunkHeight!: number;
  leathsRadius!: number;

  constructor(coordinates: Coordinates, seed: number) {
    super(coordinates, seed);

    this.trunkHeight = 4 + modSeed(seed);
    this.leathsRadius = Math.trunc(this.trunkHeight / 0.5) * 10;
    this.leathsRadius =
      this.leathsRadius < 8
        ? 8
        : this.leathsRadius > 14
        ? 14
        : this.leathsRadius;

    this.draft = [...this.drawTrunk(), ...this.drawLeaths()];
  }

  drawTrunk = (): PureBoxParams[] => {
    const { x, y, z } = this.coordinates;

    const drawGrid = getColoredGrid(this.trunkColor);

    const result: PureBoxParams[] = [];

    //#region Корни

    result.push(
      ...drawGrid([
        [x - 2, y, z + 1],
        [x - 2, y, z + 2],
        [x - 1, y, z],
        [x - 1, y, z + 3],
        [x + 3, y, z + 1],
        [x + 3, y, z + 2],
        [x + 2, y, z],
        [x + 2, y, z + 3],
        [x, y, z - 1],
        [x + 1, y, z - 1],
        [x, y, z + 4],
        [x + 1, y, z + 4],
      ])
    );

    //#endregion

    //#region Ствол

    for (let i = 1; i < this.trunkHeight; i++) {
      result.push(
        ...drawGrid([
          [x, y + i, z],
          [x + 1, y + i, z],
          [x - 1, y + i, z + 1],
          [x - 1, y + i, z + 2],
          [x + 2, y + i, z + 1],
          [x + 2, y + i, z + 2],
          [x, y + i, z + 3],
          [x + 1, y + i, z + 3],
        ])
      );
    }

    //#endregion

    //#region Ветки на стволе

    const stickSides = [
      [x - 1.5, z + 1],
      [x, z - 0.5],
      [x + 2.5, z + 2],
      [x + 1, z + 3.5],
    ];

    stickSides.forEach(([x, z], i) => {
      const sticksSeed = modSeed(
        this.seed,
        [i, 1],
        [y + 1, this.trunkHeight - 2]
      );

      result.push({
        size: "half",
        coordinates: {
          x: x,
          y: y + sticksSeed,
          z: z,
        },
        color: this.trunkStickColor,
      });
    });

    return result;

    //#endregion
  };

  drawLeaths = (): PureBoxParams[] => {
    const { x, y: treeY, z } = this.coordinates;
    const y = treeY + this.trunkHeight;

    const result: PureBoxParams[] = [];

    result.push(
      ...this.drawRandomSphere(this.leathsRadius, { x: x, y: y, z: z })
    );
    return result;
  };

  drawRandomSphere = (size: number, center: Coordinates): PureBoxParams[] => {
    const result: PureBoxParams[] = [];

    const zBias = size / 2 + 1;
    const xBias = size / 2 - 1;

    const yCenter = Math.floor(size / 2);

    const boxesMap: { [key: string]: boolean } = {};

    const hasFruits = this.seed % 2 === 0;

    for (let y = size - 1; y >= 0; y--) {
      for (let x = 0; x < size; x++) {
        const yMidlelevel = Math.abs(yCenter - y);
        let yMidlelevelNulls = yMidlelevel * 5;
        for (let z = 0; z < size; z++) {
          if (
            (yMidlelevelNulls && randomInt(200, 800) % 2 !== 0) ||
            randomInt(200, 800) % 13 === 0
          ) {
            yMidlelevelNulls--;

            if (
              hasFruits &&
              randomInt(300, 900) % 2 === 0 &&
              y !== 0 &&
              y !== size - 1 &&
              boxesMap[`${y + 1},${x},${z}`]
            ) {
              result.push(...this.drawFruit(center, x, y, z, xBias, zBias));
            }
            continue;
          }

          if (
            yMidlelevel > size / 2 - 4 &&
            (z === 0 || x === 0 || z === size - 1 || x === size - 1)
          ) {
            continue;
          }

          if (
            yMidlelevel > size / 2 - 3 &&
            (z === 1 || x === 1 || z === size - 2 || x === size - 2)
          ) {
            continue;
          }

          if (
            yMidlelevel > size / 2 - 2 &&
            (z === 2 || x === 2 || z === size - 3 || x === size - 3)
          ) {
            continue;
          }

          result.push({
            color: randomElement([this.leathsColor, this.darkLeathsColor]),
            coordinates: {
              y: center.y + y,
              z: center.z - z + zBias,
              x: center.x + x - xBias,
            },
          });

          boxesMap[`${y},${x},${z}`] = true;
        }
      }
    }

    return result;
  };

  drawFruit = (
    center: Coordinates,
    x: number,
    y: number,
    z: number,
    xBias: number,
    zBias: number
  ): PureBoxParams[] => {
    const result: PureBoxParams[] = [];

    const seed = modSeed(this.seed, [0, 1]);
    const fruitColor =
      seed % 2 === 0
        ? this.appleColor
        : seed % 3 === 0
        ? this.plumColor
        : this.immatureFruit;

    result.push({
      color: this.immatureFruit,
      coordinates: {
        y: center.y + y + 0.4,
        z: center.z - z + zBias,
        x: center.x + x - xBias,
      },
      size: "quarter",
    });

    result.push({
      color: this.immatureFruit,
      coordinates: {
        y: center.y + y + 0.4,
        z: center.z - z + zBias,
        x: center.x + x - xBias,
      },
      size: "quarter",
    });

    result.push({
      color: fruitColor,
      coordinates: {
        y: center.y + y + 0.05,
        z: center.z - z + zBias,
        x: center.x + x - xBias,
      },
      size: "half",
    });

    return result;
  };
}
