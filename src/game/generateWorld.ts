import { Scene } from "babylonjs";
import { MapElement } from "./elements/MapElement";
import { StreetLamp } from "./elements/StreetLamp";
import { Tree } from "./elements/Tree";
import { randomInt } from "./utils/randomInt";

export const mapElements: { [key: string]: typeof MapElement } = {
  Tree,
  StreetLamp,
};

export const generateWorld = async (scene: Scene): Promise<void> => {
  // const elements: MapElement[] = [];
  const tree = new Tree({ z: 20, y: 0, x: -20 }, randomInt(1000, 9999));
  tree.draw(scene);

  for (let i = 0; i < 55; i += 5) {
    tree.cloneTo({ x: -i, y: 0, z: 20 });
    tree.cloneTo({ x: -i, y: 0, z: 0 });
    tree.cloneTo({ x: -i, y: 0, z: -20 });
  }
  // elements.forEach((element) => element.draw(scene));

  return;
};
