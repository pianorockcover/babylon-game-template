import { Scene } from "babylonjs";
import { Coordinates } from ".";
import { Box, PureBoxParams } from "./Box";

export abstract class MapElement {
  protected scene!: Scene;
  protected seed!: number;

  protected draft: PureBoxParams[] = [];
  protected boxes: Box[] = [];

  coordinates!: Coordinates;
  size: Coordinates = { x: 10, z: 10, y: 10 };

  constructor(coordinates: Coordinates, seed: number) {
    this.coordinates = coordinates;
    this.seed = seed;
  }

  draw = (scene: Scene): void => {
    this.scene = scene;
    this.boxes = this.draft.map(
      (boxParams) => new Box({ scene, ...boxParams })
    );
  };
}
