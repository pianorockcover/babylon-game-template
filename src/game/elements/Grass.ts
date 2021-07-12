import { Scene } from "babylonjs/scene";
import { MapElement } from "./MapElement";
import { Box } from "./Box";

const multiplySeedConstant = 19;

export class Grass extends MapElement {
  draw = (scene: Scene): void => {
    this._scene = scene;

    let height = multiplySeedConstant * this._seed;
    height = Number(String(height < 10 ? height * 10 : height).charAt(0));

    for (let i = 0; i < height; i++) {
      new Box({
        scene: this._scene,
        size: "eighth",
        color: {
          r: 72,
          g: 168,
          b: 104,
          a: 1,
        },
        coordinates: {
          x: this._coordinates.x,
          z: this._coordinates.z,
          y: this._coordinates.y + i,
        },
      });
    }
  };
}
