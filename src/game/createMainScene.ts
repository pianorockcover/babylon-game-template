import {
  ArcRotateCamera,
  Color4,
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from "babylonjs";

export const createMainScene = (canvasElement: HTMLCanvasElement): Scene => {
  const engine3D = new Engine(canvasElement, true);

  const scene = new Scene(engine3D);

  const camera = new FreeCamera("camera", new Vector3(0, 1, 0), scene);

  camera.attachControl(canvasElement, true);

  const ground = MeshBuilder.CreateGround(
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

  scene.gravity = new Vector3(0, -0.9, 0);

  scene.collisionsEnabled = true;

  // Enable Collisions
  scene.collisionsEnabled = true;

  //Then apply collisions and gravity to the active camera
  camera.checkCollisions = true;
  camera.applyGravity = true;

  //Set the ellipsoid around the camera (e.g. your player's size)
  camera.ellipsoid = new Vector3(1, 1, 1);

  //finally, say which mesh will be collisionable
  ground.checkCollisions = true;

  // Optimization
  // scene.freezeActiveMeshes();
  scene.autoClear = false; // Color buffer
  scene.autoClearDepthAndStencil = false; // Depth and stencil, obviously
  scene.blockMaterialDirtyMechanism = true;
  // scene.blockfreeActiveMeshesAndRenderingGroups = true;
  // scene.blockfreeActiveMeshesAndRenderingGroups = false;

  return scene;
};
