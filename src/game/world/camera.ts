import { Scene, UniversalCamera, Vector3 } from "babylonjs";

const keyboardCodes = {
  w: 87,
  s: 83,
  a: 65,
  d: 68,
};

export const createCamera = (
  canvasElement: HTMLCanvasElement,
  scene: Scene
): UniversalCamera => {
  const camera = new UniversalCamera("Camera", new Vector3(0, 1, 5), scene);
  camera.attachControl(canvasElement, true);
  camera.setTarget(Vector3.Zero());

  camera.keysUp.push(keyboardCodes.w);
  camera.keysDown.push(keyboardCodes.s);
  camera.keysLeft.push(keyboardCodes.a);
  camera.keysRight.push(keyboardCodes.d);

  camera.speed = 1.9;
  camera.fov = 0.8;
  camera.inertia = 0;

  camera.ellipsoid = new Vector3(1.5, 0.5, 1.5);
  camera.checkCollisions = true;
  camera.applyGravity = true;

  return camera;
};
