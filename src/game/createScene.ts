import {
  ArcRotateCamera,
  Color4,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
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
    new Vector3(0, 0.5, 5),
    scene
  );

  camera.attachControl(canvasElement, true);

  const light = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
  light.intensity = 0.4;

  const skybox = MeshBuilder.CreateBox(
    "skyBox",
    {
      size: 1000.0,
      faceColors: [
        new Color4(0, 0, 0, 0),
        new Color4(0, 0, 0, 0),
        new Color4(0, 0, 0, 0),
        new Color4(0, 0, 0, 0),
      ],
    },
    scene
  );
  const skyboxMaterial = new StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skybox.material = skyboxMaterial;

  engine3D.runRenderLoop(() => scene.render());

  window.addEventListener("resize", () => engine3D.resize());
};
