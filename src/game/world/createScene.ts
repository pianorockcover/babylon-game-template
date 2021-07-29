import {
  Engine,
  Scene,
  Vector3,
} from "babylonjs";
import { createCamera } from "./createCamera";
import { createGround } from "./createGround";
import { createLight } from "./createLight";
import { createMap } from "./createMap";
import { createPointerLook } from "./createPointerLook";

export const createScene = async (canvasElement: HTMLCanvasElement, engine: Engine) => {
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
