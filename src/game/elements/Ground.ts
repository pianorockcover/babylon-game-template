import { Color3, MeshBuilder, StandardMaterial } from "babylonjs";
import { RGBA, Coordinates } from ".";
import { randomInt } from "../utils/randomInt";
import { PureBoxParams } from "./Box";
import { MapElement } from "./MapElement";

export class Ground extends MapElement {
  groundColors: RGBA[] = [
    [179, 218, 101],
    [134, 157, 67],
    [91, 108, 67],
    [99, 100, 65],
    [120, 119, 73],
  ];

  constructor(coordinates: Coordinates, seed: number) {
    super(coordinates, seed);

    // this.draft = [...this.drawGround()];
    // ...this.drawMountain()
  }

  draw = (): void => {
    const ground = MeshBuilder.CreateGround(
      "ground",
      {
        width: 200,
        height: 200,
      },
      this.scene
    );

    const newMaterial = new StandardMaterial("ground-material", this.scene);

    newMaterial.diffuseColor = new Color3(
      (this.groundColors[0][0] !== undefined ? this.groundColors[0][0] : 100) /
        100,
      (this.groundColors[0][1] !== undefined ? this.groundColors[0][1] : 100) /
        100,
      (this.groundColors[0][2] !== undefined ? this.groundColors[0][2] : 100) /
        100
    );

    ground.material = newMaterial;
  };

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
        });
      }
    }

    return result;
  };
}
