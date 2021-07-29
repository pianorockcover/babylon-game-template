import { Mesh, Nullable, Scene, VertexBuffer, VertexData } from "babylonjs";
import { Coordinates } from ".";
import { Box, PureBoxParams } from "./Box";

export class MapElement {
  protected scene!: Scene;
  protected seed!: number;

  protected draft: PureBoxParams[] = [];
  protected boxes: Box[] = [];

  protected mesh!: Nullable<Mesh>;

  static vertexMesh?: Mesh;

  coordinates!: Coordinates;
  size: Coordinates = { x: 10, z: 10, y: 10 };

  constructor(coordinates: Coordinates, seed: number) {
    this.coordinates = coordinates;
    this.seed = seed;
  }

  draw = (scene: Scene): void => {
    if (MapElement.vertexMesh) {
      const newMesh = MapElement.vertexMesh.clone(`${+new Date()}`);
      newMesh.position.x = this.coordinates.x;
      newMesh.position.z = this.coordinates.z;
      return;
    }
    this.scene = scene;
    this.boxes = this.draft.map(
      (boxParams) => new Box({ scene, ...boxParams })
    );

    this.mesh = Mesh.MergeMeshes(
      this.boxes.filter((box) => !box.isLamp()).map((box) => box.getMesh()),
      true,
      true,
      undefined,
      false,
      true
    );

    if (this.mesh) {
      this.mesh.freezeWorldMatrix();
      // this.mesh.convertToUnIndexedMesh();
      this.mesh.material?.freeze();
      this.mesh.freezeWorldMatrix();
      // this.mesh.doNotSyncBoundingInfo = true;

      this.mesh.checkCollisions = true;
    }
  };

  remove = (): void => {
    if (this.mesh) {
      this.mesh.dispose();
    }
  };

  cloneTo = (coordinates: Coordinates): void => {
    if (this.mesh) {
      const newMesh = this.mesh.clone(`${+new Date()}`);
      newMesh.position.x = coordinates.x;
      newMesh.position.y = coordinates.y;
      newMesh.position.z = coordinates.z;
    }
  };
}
