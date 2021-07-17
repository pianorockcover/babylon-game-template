import { MapElement } from "./MapElement";
import { Coordinates, RGBA } from ".";
import { Scene } from "babylonjs/scene";
import { modSeed } from "../utils/modSeed";
import { BoxGrid } from "../utils/BoxGrid";
import { Box } from "./Box";

export class Tree extends MapElement {
  trunkColor: RGBA = { r: 186, g: 133, b: 78, a: 1 };
  trunkStickColor: RGBA = {
    r: 160,
    g: 103,
    b: 41,
    a: 1,
  };

  trunkHeight!: number;

  leathsColor: RGBA = { r: 59, g: 131, b: 13, a: 1 };

  constructor(coordinates: Coordinates, seed: number) {
    super(coordinates, seed);

    this.trunkHeight = 4 + modSeed(seed);
  }

  draw = (scene: Scene): void => {
    this._scene = scene;
    this._trunk();
    this._leaths();
  };

  _trunk = (): void => {
    const { x, y, z } = this._coordinates;

    const thunkGrid = new BoxGrid(this._scene, this.trunkColor);

    //#region Корни

    thunkGrid.draw([
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
    ]);

    //#endregion

    //#region Ствол

    for (let i = 1; i < this.trunkHeight; i++) {
      thunkGrid.draw([
        [x, y + i, z],
        [x + 1, y + i, z],
        [x - 1, y + i, z + 1],
        [x - 1, y + i, z + 2],
        [x + 2, y + i, z + 1],
        [x + 2, y + i, z + 2],
        [x, y + i, z + 3],
        [x + 1, y + i, z + 3],
      ]);
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
        this._seed,
        [i, 1],
        [y + 1, this.trunkHeight - 2]
      );

      new Box({
        scene: this._scene,
        size: "half",
        coordinates: {
          x: x,
          y: y + sticksSeed,
          z: z,
        },
        color: this.trunkStickColor,
      });
    });

    //#endregion
  };

  _leaths = (): void => {
    const { x, y: treeY, z } = this._coordinates;
    const y = treeY + this.trunkHeight;

    const leathsGrid = new BoxGrid(this._scene, this.leathsColor);

    for (let i = 0; i < 4; i++) {
      leathsGrid.draw([
        [x - 2, y + i, z + 1],
        [x - 2, y + i, z + 2],
        [x - 1, y + i, z],
        [x - 1, y + i, z + 3],
        [x + 3, y + i, z + 1],
        [x + 3, y + i, z + 2],
        [x + 2, y + i, z],
        [x + 2, y + i, z + 3],
        [x, y + i, z - 1],
        [x + 1, y + i, z - 1],
        [x, y + i, z + 4],
        [x + 1, y + i, z + 4],
      ]);
    }
  };
}
