import { HemisphericLight, Scene, Vector3 } from "babylonjs";

export const createLight = (scene: Scene): HemisphericLight => {
    const light = new HemisphericLight("myLight", new Vector3(1, 1, 0), scene);
    light.intensity = 0.4;

    return light;
}