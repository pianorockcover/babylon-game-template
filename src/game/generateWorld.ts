import { Scene } from "babylonjs";
import { Ground } from "./elements/Ground";
import { Tree } from "./elements/Tree";
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

  const tree = new Tree({ x: -5, y: -4, z: -4 }, randomInt(1000, 9999));
  tree.draw(scene);

  const tree2 = new Tree({ x: 2, y: -4, z: -8 }, randomInt(1000, 9999));
  tree2.draw(scene);

  const tree3 = new Tree({ x: 7, y: -4, z: 2 }, randomInt(1000, 9999));
  tree3.draw(scene);

  // const worldData =
  //   "0,0,-4,0,200;0,3,-4,0,99;0,-5,-4,-4,89;1,3,-4,3,200;1,10,-4,-3,77;1,-10,-4,-3,422";
  // const elements = mapDecoder(worldData);

  // elements.forEach((e) => e.draw(scene));
};
