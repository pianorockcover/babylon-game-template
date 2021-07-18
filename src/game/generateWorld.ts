import { Scene } from "babylonjs";
import { Tree } from "./elements/Tree";
import { Ground } from "./elements/Ground";

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

  const tree = new Tree({ x: -10, y: -4, z: -4 }, 2341);
  tree.draw(scene);

  const tree2 = new Tree({ x: 5, y: -4, z: 0 }, 8748);
  tree2.draw(scene);

  const tree3 = new Tree({ x: -9, y: -4, z: 10 }, 9246);
  tree3.draw(scene);

  // const worldData =
  //   "0,0,-4,0,200;0,3,-4,0,99;0,-5,-4,-4,89;1,3,-4,3,200;1,10,-4,-3,77;1,-10,-4,-3,422";
  // const elements = mapDecoder(worldData);

  // elements.forEach((e) => e.draw(scene));
};
