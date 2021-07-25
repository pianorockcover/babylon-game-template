import {
  ArcRotateCamera,
  Engine,
  FreeCamera,
  HardwareScalingOptimization,
  HemisphericLight,
  MeshBuilder,
  Scene,
  SceneOptimizer,
  SceneOptimizerOptions,
  Vector3,
} from "babylonjs";
import { generateWorld } from "./generateWorld";

export const createMainScene = (canvasElement: HTMLCanvasElement): void => {
  const createDefaultEngine = () =>
    new Engine(canvasElement, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      disableWebGL2Support: false,
    });

  const asyncEngineCreation = async () => {
    try {
      return createDefaultEngine();
    } catch (e) {
      console.error(
        "the available createEngine function failed. Creating the default engine instead"
      );
      return createDefaultEngine();
    }
  };

  const initFunction = new Promise<{ scene: Scene; engine: Engine }>(
    async (resolve) => {
      const engine = await asyncEngineCreation();
      if (!engine) throw "engine should not be null.";

      engine.displayLoadingUI();

      const scene = new Scene(engine);

      const camera = new FreeCamera("camera", new Vector3(0, 0.5, 0), scene);
      camera.attachControl(canvasElement, true);

      new HemisphericLight("light", new Vector3(1, 1, 0), scene);

      setTimeout(() => {
        generateWorld(scene).then(() => {
          const options = new SceneOptimizerOptions();
          options.addOptimization(new HardwareScalingOptimization(0, 1));
          const optimizer = new SceneOptimizer(scene, options);
          optimizer.start();

          engine.hideLoadingUI();
          resolve({ scene, engine });
        });
      }, 100);
    }
  );

  initFunction.then(({ scene, engine }) => {
    engine.runRenderLoop(() => scene.render());
  });
};
