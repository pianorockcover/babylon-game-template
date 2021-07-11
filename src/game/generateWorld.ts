import { MeshBuilder, Scene } from "babylonjs";

export const generateWorld = (scene: Scene): void => {
  MeshBuilder.CreateBox("box", {}, scene);
};
