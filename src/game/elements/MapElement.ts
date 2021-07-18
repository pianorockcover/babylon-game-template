import { Scene } from "babylonjs";
import { Coordinates } from ".";
import { Box, PureBoxParams } from "./Box";

export abstract class MapElement {
  protected coordinates!: Coordinates;
  protected scene!: Scene;
  protected seed!: number;

  protected draft: PureBoxParams[] = [];
  protected boxes: Box[] = [];

  constructor(coordinates: Coordinates, seed: number) {
    this.coordinates = coordinates;
    this.seed = seed;
  }

  draw = (scene: Scene): void => {
    this.scene = scene;
    this.boxes = this.draft.map(
      (boxParams) => new Box({ scene, ...boxParams, noEdges: true })
    );
  };
}
