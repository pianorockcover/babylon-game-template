import { Scene } from "babylonjs/scene";
import { RGBA } from ".";
import { randomElement } from "../utils/randomElement";
import { randomInt } from "../utils/randomInt";
import { Box, BoxSize } from "./Box";
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
  draw = (scene: Scene): void => {
    this._scene = scene;

    // TMP
    const groundSize = 15;
    const fromY = this._coordinates.y;
    const fromX = this._coordinates.x - groundSize;
    const toX = this._coordinates.x + groundSize;

    const fromZ = this._coordinates.z - groundSize;
    const toZ = this._coordinates.z + groundSize;

    for (let i = fromX; i < toX; i++) {
      for (let j = fromZ; j < toZ; j++) {
        new Box({
          scene: this._scene,
          size: "eighth",
          color: randomElement(groundColors),
          coordinates: {
            x: i,
            y: fromY,
            z: j,
          },
        });

        if (randomInt(10, 100) % 3 !== 0) {
          const size: BoxSize = randomElement(["eighth", "quarter"]);
          new Box({
            scene: this._scene,
            size: size,
            color: randomElement(groundColors),
            coordinates: {
              x: i,
              y: fromY + 1,
              z: j,
              stepSize: size,
            },
          });
        }
      }
    }
  };
}
