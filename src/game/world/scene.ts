import { Engine, Scene, Vector3 } from "babylonjs";
import { createCamera } from "./camera";
import { createGround } from "./ground";
import { createLight } from "./light";
import { createMap } from "./map";
import { createPointerLook } from "./pointerLook";

export const createScene = async (
  canvasElement: HTMLCanvasElement,
  engine: Engine
): Promise<Scene> => {
  const scene = new Scene(engine);

  scene.afterRender = () => engine.hideLoadingUI();

  scene.gravity = new Vector3(0, -0.1, 0);
  scene.enablePhysics(scene.gravity);

  createCamera(canvasElement, scene);

  createLight(scene);

  createGround(scene);

  createMap(scene);

  createPointerLook(scene);

  return scene;
};
