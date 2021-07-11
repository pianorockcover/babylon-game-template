import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  Scene,
  Vector3,
} from "babylonjs";
import { generateWorld } from "./generateWorld";

export const createScene = (canvasElement: HTMLCanvasElement): void => {
  const engine3D = new Engine(canvasElement, true);

  const scene = new Scene(engine3D);

  generateWorld(scene);

  const camera = new ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    3,
    new Vector3(0, 0, 0),
    scene
  );

  camera.attachControl(canvasElement, true);

  new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  engine3D.runRenderLoop(() => scene.render());

  window.addEventListener("resize", () => engine3D.resize());
};
