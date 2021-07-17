import { Scene } from "babylonjs/scene";
import { RGBA } from ".";
import { Box } from "./Box";
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
    const fromY = this._coordinates.y + 1;
    const fromX = this._coordinates.x - groundSize;
    const toX = this._coordinates.x + groundSize;

    const fromZ = this._coordinates.z - groundSize;
    const toZ = this._coordinates.z + groundSize;

    for (let i = fromX; i < toX; i++) {
      for (let j = fromZ; j < toZ; j++) {
        new Box({
          scene: this._scene,
          color: groundColors[0],
          coordinates: {
            x: i,
            y: fromY,
            z: j,
          },
        });
      }
    }
  };
}
