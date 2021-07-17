import { Scene } from "babylonjs/scene";
import { RGBA } from "../elements";
import { Box } from "../elements/Box";

export class BoxGrid {
  protected _scene!: Scene;
  protected _color!: RGBA;

  constructor(scene: Scene, color: RGBA) {
    this._scene = scene;
    this._color = color;
  }

  draw = (boxes: number[][]): void =>
    boxes.forEach(
      ([x, y, z]) =>
        new Box({
          scene: this._scene,
          coordinates: {
            x: x,
            y: y,
            z: z,
          },
          color: this._color,
        })
    );
}
