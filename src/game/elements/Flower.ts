import { Scene } from "babylonjs/scene";
import { Coordinates, RGBA } from ".";
import { Box } from "./Box";
import { MapElement } from "./MapElement";

const scapeColor: RGBA = {
  r: 27,
  g: 202,
  b: 65,
  a: 1,
};

const leafColors: RGBA[] = [
  {
    r: 202,
    g: 27,
    b: 27,
    a: 1,
  },
  {
    r: 142,
    g: 68,
    b: 173,
    a: 1,
  },
  {
    r: 211,
    g: 84,
    b: 0,
    a: 1,
  },
];

const cicrleColor: RGBA = {
  r: 199,
  g: 202,
  b: 27,
  a: 1,
};

const multiplySeedHeightConstant = 26;

export class Flower extends MapElement {
  scapeHeight!: number;
  leafColor!: RGBA;

  constructor(coordinates: Coordinates, seed: number) {
    super(coordinates, seed);

    let height = multiplySeedHeightConstant * this._seed;
    height = Number(String(height < 10 ? height * 10 : height).charAt(0));

    this.scapeHeight = height;
    this.leafColor = leafColors[this._seed % 2 === 0 ? 0 : 1];
  }

  draw = (scene: Scene): void => {
    this._scene = scene;

    this._scape();
    this._circle();
    this._leaf();
  };

  private _scape = () => {
    for (let i = 0; i < this.scapeHeight; i++) {
      new Box({
        scene: this._scene,
        coordinates: {
          x: this._coordinates.x,
          y: this._coordinates.y + i,
          z: this._coordinates.z,
        },
        color: scapeColor,
      });
    }
  };

  private _circle = () => {
    for (let i = -1; i < 2; i++) {
      new Box({
        scene: this._scene,
        coordinates: {
          x: this._coordinates.x + i,
          y: this._coordinates.y + this.scapeHeight,
          z: this._coordinates.z,
        },
        color: this.leafColor,
      });
    }

    for (let i = -1; i < 2; i++) {
      if (!i) {
        continue;
      }

      new Box({
        scene: this._scene,
        coordinates: {
          x: this._coordinates.x + i,
          y: this._coordinates.y + this.scapeHeight + 1,
          z: this._coordinates.z,
        },
        color: this.leafColor,
      });
    }

    for (let i = -1; i < 2; i++) {
      new Box({
        scene: this._scene,
        coordinates: {
          x: this._coordinates.x + i,
          y: this._coordinates.y + this.scapeHeight + 2,
          z: this._coordinates.z,
        },
        color: this.leafColor,
      });
    }
  };

  private _leaf = () => {
    new Box({
      scene: this._scene,
      coordinates: {
        x: this._coordinates.x,
        y: this._coordinates.y + this.scapeHeight + 1,
        z: this._coordinates.z,
      },
      color: cicrleColor,
    });
  };
}
