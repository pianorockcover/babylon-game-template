import { Scene } from "babylonjs";
import { Ground } from "./elements/Ground";
import { mapDecoder } from "./gemerator/mapDecoder";

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

  const worldData =
    "0,0,-4,0,200;0,3,-4,0,99;0,-5,-4,-4,89;1,3,-4,3,200;1,10,-4,-3,77;1,-10,-4,-3,422";
  const elements = mapDecoder(worldData);

  elements.forEach((e) => e.draw(scene));
};
