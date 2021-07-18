import { MapElement } from "./MapElement";
import { Coordinates, RGBA } from ".";
import { modSeed } from "../utils/modSeed";
import { getColoredGrid } from "../utils/getGrid";
import { PureBoxParams } from "./Box";
import { randomInt } from "../utils/randomInt";
import { randomElement } from "../utils/randomElement";

export class Tree extends MapElement {
  trunkColor: RGBA = { r: 186, g: 133, b: 78, a: 1 };
  trunkStickColor: RGBA = {
    r: 160,
    g: 103,
    b: 41,
    a: 1,
  };

  trunkHeight!: number;
  leathsRadius!: number;

  leathsColor: RGBA = { r: 59, g: 131, b: 13, a: 1 };
  darkLeathsColor: RGBA = { r: 20, g: 57, b: 0, a: 1 };

  appleColor: RGBA = { r: 175, g: 24, b: 16, a: 1 };

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

  drawSphere = (radius: number, center: Coordinates): PureBoxParams[] => {
    const result: PureBoxParams[] = [];

    const angleStep = 0.3;

    for (let alpha = 0; alpha <= 6.28; alpha += angleStep) {
      result.push({
        color: this.leathsColor,
        coordinates: {
          x: center.x + Math.cos(alpha) * radius,
          y: center.y,
          z: center.z - Math.sin(alpha) * radius,
        },
      });
    }

    for (let direction = 1; direction >= -1; direction -= 2) {
      for (let beta = angleStep; beta < 1.445; beta += angleStep) {
        const tmpRadius = Math.cos(beta) * radius;
        const fixedY = Math.sin(beta) * radius * direction;

        for (let alpha = 0; alpha < 6.28; alpha += angleStep) {
          result.push({
            color: this.leathsColor,
            coordinates: {
              x: center.x + Math.cos(alpha) * tmpRadius,
              y: center.y + fixedY,
              z: center.z - Math.sin(alpha) * tmpRadius,
            },
          });
        }
      }
    }

    return result;
  };

  drawTrueCircle = (radius: number, center: Coordinates): PureBoxParams[] => {
    const result: PureBoxParams[] = [];

    const zBias = radius / 2 + 1;
    const xBias = radius / 2 - 1;

    const perimeter = Math.trunc(2 * Math.PI * radius);

    const angle = Math.atan2(1, radius);

    for (let i = 0; i < perimeter; i++) {
      const angleIncrement = 0.005 * i;
      const curAngle = angle * i + angleIncrement;
      const x = Math.cos(curAngle) * radius;
      const z = Math.sin(curAngle) * radius;

      result.push({
        color: this.leathsColor,
        coordinates: {
          y: center.y,
          z: center.z - z + zBias,
          x: center.x + x - xBias,
        },
      });
    }

    return result;
  };

  drawRandomSphere = (size: number, center: Coordinates): PureBoxParams[] => {
    const result: PureBoxParams[] = [];

    const zBias = size / 2 + 1;
    const xBias = size / 2 - 1;

    const yCenter = Math.floor(size / 2);

    const boxesMap: { [key: string]: boolean } = {};

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

            // Плоды
            if (
              randomInt(300, 900) % 2 === 0 &&
              y !== 0 &&
              y !== size - 1 &&
              boxesMap[`${y + 1},${x},${z}`]
            ) {
              result.push({
                color: this.appleColor,
                coordinates: {
                  y: center.y + y + 0.4,
                  z: center.z - z + zBias,
                  x: center.x + x - xBias,
                },
                size: "half",
              });
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
            // texture: "img/tree2.jpg",
          });

          boxesMap[`${y},${x},${z}`] = true;
        }
      }
    }

    return result;
  };
}
