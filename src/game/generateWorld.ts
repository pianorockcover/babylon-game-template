import { Scene } from "babylonjs";
import { MapElement } from "./elements/MapElement";
import { StreetLamp } from "./elements/StreetLamp";
import { Tree } from "./elements/Tree";
import { randomInt } from "./utils/randomInt";

export const mapElements: { [key: string]: typeof MapElement } = {
  Tree,
  StreetLamp,
};

export const generateWorld = (scene: Scene): void => {
  const elements: MapElement[] = [];
  for (let i = 0; i < 100; i += 20) {
    elements.push(
      ...[
        new Tree({ z: 20, y: 0, x: -20 - i }, randomInt(1000, 9999)),
        new StreetLamp({ z: 10, y: 0, x: -10 - i }, 0),
        new Tree({ z: -20, y: 0, x: 20 - i }, randomInt(1000, 9999)),
      ]
    );
  }

  elements.forEach((element) => element.draw(scene));
};
