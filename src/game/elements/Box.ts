import {
  Color3,
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
} from "babylonjs";
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
  color?: RGBA;
  texture?: string;
}

export type PureBoxParams = Omit<BoxParams, "scene">;

export class Box {
  private _name!: string;
  private _box!: Mesh;
  private _material?: StandardMaterial;
  private _materialName?: string;

  private static initialBox: Mesh | undefined;
  private static materials: { [key: string]: StandardMaterial } = {};

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
      Box.initialBox.position.y = -100;

      Box.initialBox.freezeWorldMatrix();
      // Box.initialBox.doNotSyncBoundingInfo = true;
      Box.initialBox.convertToUnIndexedMesh();

      console.log("Draw initial-box");
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

    this.setUpMaterial(color, texture);

    // Optimization
    this._box.material?.freeze();
    this._box.freezeWorldMatrix();
    this._box.doNotSyncBoundingInfo = true;
    // this._box.convertToUnIndexedMesh();
  }

  setUpMaterial = (color?: RGBA, texture?: string): void => {
    this._materialName = color ? color.join("") : texture ? texture : undefined;

    if (this._materialName && !Box.materials[this._materialName]) {
      const newMaterial = new StandardMaterial(this._materialName, this.scene);

      if (texture) {
        newMaterial.diffuseTexture = new Texture(texture, this.scene);
      } else if (color) {
        newMaterial.alpha = color[3] !== undefined ? color[3] : 1;
        newMaterial.diffuseColor = new Color3(
          (color[0] !== undefined ? color[0] : 100) / 100,
          (color[1] !== undefined ? color[1] : 100) / 100,
          (color[2] !== undefined ? color[2] : 100) / 100
        );
      }

      Box.materials[this._materialName] = newMaterial;

      console.log(`Created material ${this._materialName}`);
    }

    if (this._materialName) {
      this._material = Box.materials[this._materialName];
      this._box.material = this._material;
    }
  };

  setUpEdges = (): void => {
    // if (!noEdges) {
    //   this._box.enableEdgesRendering();
    //   this._box.edgesWidth = 0.5;
    //   const edgesColor = Color(
    //     `rgb(${color.r},${color.g},${color.b})`,
    //     "rgb"
    //   ).darken(0.7);
    //   const edgesColorRgb: RGBA = (edgesColor
    //     .rgb()
    //     .round()
    //     .object() as unknown) as RGBA;
    //   this._box.edgesColor = new Color4(
    //     edgesColorRgb.r / 100,
    //     edgesColorRgb.g / 100,
    //     edgesColorRgb.b / 100,
    //     1
    //   );
    // }
  };
}
