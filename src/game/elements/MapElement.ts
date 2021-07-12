import { Scene } from "babylonjs";
import { Coordinates } from ".";

export abstract class MapElement {
  protected _coordinates!: Coordinates;
  protected _scene!: Scene;
  protected _seed!: number;

  constructor(coordinates: Coordinates, seed: number) {
    this._coordinates = coordinates;
    this._seed = seed;
  }

  draw = (scene: Scene): void => {
    this._scene = scene;
    console.log("Draw map element");
  };
}
