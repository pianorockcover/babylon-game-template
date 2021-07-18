import { Scene } from "babylonjs";
import { Tree } from "./elements/Tree";
import { Ground } from "./elements/Ground";
import { MapElement } from "./elements/MapElement";
import { randomInt } from "./utils/randomInt";

export const generateWorld = (scene: Scene): void => {
  const groud = new Ground(
    {
      x: 0,
      y: -6,
      z: 0,
    },
    1
  );

  groud.draw(scene);

  const trees: MapElement[] = [];
  for (let i = 0; i < 1; i++) {
    trees.push(new Tree({ x: 0, y: -4, z: 0 }, randomInt(1000, 9999)));
  }

  trees.forEach((tree) => tree.draw(scene));
  // tree.draw(scene);

  // const tree2 = new Tree({ x: 5, y: -4, z: 0 }, 8748);
  // tree2.draw(scene);

  // const tree3 = new Tree({ x: -9, y: -4, z: 10 }, 9246);
  // tree3.draw(scene);

  // const tree4 = new Tree({ x: -9, y: -4, z: 10 }, 9246);
  // tree3.draw(scene);

  // const worldData =
  //   "0,0,-4,0,200;0,3,-4,0,99;0,-5,-4,-4,89;1,3,-4,3,200;1,10,-4,-3,77;1,-10,-4,-3,422";
  // const elements = mapDecoder(worldData);

  // elements.forEach((e) => e.draw(scene));
};
