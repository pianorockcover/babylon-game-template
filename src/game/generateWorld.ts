import { Scene } from "babylonjs";
import { MapElement } from "./elements/MapElement";
import { Flower } from "./elements/Flower";
import { randomInt } from "./utils/randomInt";

export const generateWorld = (scene: Scene): void => {
  const flowers: MapElement[] = new Array(10).fill(null).map(
    () =>
      new Flower(
        {
          x: randomInt(-5, 15),
          y: -2,
          z: randomInt(-15, 20),
        },
        scene
      )
  );

  console.log(flowers);
};
