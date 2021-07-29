import { DefaultLoadingScreen, Engine } from "babylonjs";
import { createLoadingScreen } from "./createLoadingScreen";
import { createScene } from "./createScene";

export const createWorld = async (canvasElement: HTMLCanvasElement): Promise<void> => {
    const engine = new Engine(canvasElement, true);

    engine.loadingScreen = createLoadingScreen(canvasElement);
    engine.displayLoadingUI();

    const scene = await createScene(canvasElement, engine);

    engine.runRenderLoop(() => scene.render());

    window.addEventListener("resize", () => engine.resize());
}