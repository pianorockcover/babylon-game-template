import { Scene } from "babylonjs/scene";
import { Tree } from "../elements/Tree";

export const createMap = (scene: Scene) => {
    const tree = new Tree({ x: 0, y: -20, z: 0 }, 3279);
    tree.draw(scene);

    tree.cloneTo({ x: -5, y: -20, z: 0 });
}