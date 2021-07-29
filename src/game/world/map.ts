import { Scene } from "babylonjs/scene";
import { MapElement } from "../elements/MapElement";
import { StreetLamp } from "../elements/StreetLamp";
import { Tree } from "../elements/Tree";

export const mapElements: { [key: string]: typeof MapElement } = {
  Tree,
  StreetLamp,
};

export const createMap = (scene: Scene): void => {
  const tree = new Tree({ x: 0, y: 0, z: 0 }, 3279);
  tree.draw(scene);

  tree.cloneTo({ x: -5, y: 0, z: 3 });
  tree.cloneTo({ x: -15, y: 0, z: 8 });
  tree.cloneTo({ x: 5, y: 0, z: -2 });

  const tree2 = new Tree({ x: 0, y: 0, z: 6 }, 8432);
  tree2.draw(scene);
  tree2.cloneTo({ x: 0, y: 0, z: -10 });

  tree2.cloneTo({ x: 0, y: 0, z: -10 });

  tree2.cloneTo({ x: -7, y: 0, z: 10 });
  tree2.cloneTo({ x: -19, y: 0, z: 18 });
  tree2.cloneTo({ x: 9, y: 0, z: -12 });

  const lamp = new StreetLamp({ x: -10, z: 0, y: 0 }, 1);
  lamp.draw(scene);
};
