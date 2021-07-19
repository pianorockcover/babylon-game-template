import {
  Color3,
  Color4,
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
} from "babylonjs";
import Color from "color";
import { boxScale, Coordinates, RGBA, Rotation } from ".";

export type BoxSize = "full" | "half" | "quarter" | "eight";

const boxSizes = {
  full: 1,
  half: 2,
  quarter: 4,
  eight: 8,
};

export interface BoxParams {
  scene: Scene;
  size?: BoxSize;
  coordinates: Coordinates;
  rotation?: Rotation;
  color: RGBA;
  noEdges?: boolean;
  texture?: string;
}

export type PureBoxParams = Omit<BoxParams, "scene">;

export class Box {
  private _name!: string;
  private _box!: Mesh;
  private _material!: StandardMaterial;
  private _materialName!: string;

  static initialBox: Mesh | undefined;

  scene!: Scene;
  size!: BoxSize;
  coordinates!: Coordinates;
  color!: RGBA;

  constructor({
    scene,
    size,
    coordinates,
    color,
    rotation,
    noEdges,
    texture,
  }: BoxParams) {
    size = size || "full";

    this.scene = scene;
    this._name = `box-${+new Date()}`;

    if (!Box.initialBox) {
      Box.initialBox = MeshBuilder.CreateBox(
        "initial-box",
        {
          width: boxScale,
          height: boxScale,
          size: boxScale,
          updatable: false,
        },
        this.scene
      );
      console.log("intiial-box");
    }

    this._box = Box.initialBox.clone(this._name);
    this._box.scaling.x = 1 / boxSizes[size];
    this._box.scaling.y = 1 / boxSizes[size];
    this._box.scaling.z = 1 / boxSizes[size];

    const boxStep =
      boxScale /
      (coordinates.stepSize ? boxSizes[coordinates.stepSize] : boxSizes.full);

    this._box.position.x = coordinates.x * boxStep;
    this._box.position.y = coordinates.y * boxStep;
    this._box.position.z = coordinates.z * boxStep;

    if (rotation) {
      this._box.rotation.x = rotation.x * boxStep;
      this._box.rotation.y = rotation.y * boxStep;
      this._box.rotation.z = rotation.z * boxStep;
    }

    this._materialName = `material-${+new Date()}`;

    this._material = new StandardMaterial(this._materialName, this.scene);

    if (texture) {
      this._material.diffuseTexture = new Texture(texture, this.scene);
    } else {
      this._material.alpha = color.a;
      this._material.diffuseColor = new Color3(
        color.r / 100,
        color.g / 100,
        color.b / 100
      );
    }

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
