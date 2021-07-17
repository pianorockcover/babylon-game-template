import {
  Color3,
  Color4,
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
} from "babylonjs";
import Color from "color";
import { boxScale, Coordinates, RGBA } from ".";

export type BoxSize = "full" | "half" | "quarter";

const boxSizes = {
  full: 1,
  half: 2,
  quarter: 4,
};

interface BoxParams {
  scene: Scene;
  size?: BoxSize;
  coordinates: Coordinates;
  color: RGBA;
  noEdges?: boolean;
}

export class Box {
  private _name!: string;
  private _box!: Mesh;
  private _material!: StandardMaterial;
  private _materialName!: string;

  scene!: Scene;
  size!: BoxSize;
  coordinates!: Coordinates;
  color!: RGBA;

  constructor({ scene, size, coordinates, color, noEdges }: BoxParams) {
    size = size || "full";

    this.scene = scene;
    this._name = `box-${+new Date()}`;

    this._box = MeshBuilder.CreateBox(
      this._name,
      {
        width: boxScale / boxSizes[size],
        height: boxScale / boxSizes[size],
        size: boxScale / boxSizes[size],
      },
      this.scene
    );

    const boxStep =
      boxScale /
      (coordinates.stepSize ? boxSizes[coordinates.stepSize] : boxSizes.full);

    this._box.position.x = coordinates.x * boxStep;
    this._box.position.y = coordinates.y * boxStep;
    this._box.position.z = coordinates.z * boxStep;

    this._materialName = `material-${+new Date()}`;

    this._material = new StandardMaterial(this._materialName, this.scene);
    this._material.alpha = color.a;
    this._material.diffuseColor = new Color3(
      color.r / 100,
      color.g / 100,
      color.b / 100
    );

    this._box.material = this._material;

    if (!noEdges) {
      this._box.enableEdgesRendering();
      this._box.edgesWidth = 0.5;

      const edgesColor = Color(
        `rgb(${color.r},${color.g},${color.b})`,
        "rgb"
      ).darken(0.7);

      const edgesColorRgb: RGBA = (edgesColor
        .rgb()
        .round()
        .object() as unknown) as RGBA;

      this._box.edgesColor = new Color4(
        edgesColorRgb.r / 100,
        edgesColorRgb.g / 100,
        edgesColorRgb.b / 100,
        1
      );
    }
  }
}
