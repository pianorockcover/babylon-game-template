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

export const createSandboxScene = (canvasElement: HTMLCanvasElement): Scene => {
  const engine3D = new Engine(canvasElement, true);

  const scene = new Scene(engine3D);

  const camera = new ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    3,
    new Vector3(0, 1, -3),
    scene
  );

  camera.attachControl(canvasElement, true);

  MeshBuilder.CreateGround(
    "ground",
    {
      width: 200,
      height: 200,
    },
    scene
  );

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

  return scene;
};
