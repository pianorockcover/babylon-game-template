import { Engine } from "babylonjs";
import { createLoadingScreen } from "./loadingScreen";
import { createScene } from "./scene";

export const createWorld = async (
  canvasElement: HTMLCanvasElement
): Promise<void> => {
  const engine = new Engine(canvasElement, true);

  engine.loadingScreen = createLoadingScreen(canvasElement);
  engine.displayLoadingUI();

  const scene = await createScene(canvasElement, engine);

  engine.runRenderLoop(() => scene.render());

  window.addEventListener("resize", () => engine.resize());
};
