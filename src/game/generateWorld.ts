import { Scene } from "babylonjs";
import { Ground } from "./elements/Ground";
import { MapElement } from "./elements/MapElement";
import { StreetLamp } from "./elements/StreetLamp";
import { Tree } from "./elements/Tree";
import { randomInt } from "./utils/randomInt";

export const mapElements: { [key: string]: typeof MapElement } = {
  Tree,
  StreetLamp,
};

export const generateWorld = (scene: Scene): void => {
  const groud = new Ground(
    {
      x: 0,
      y: -6,
      z: 0,
    },
    1
  );

  groud.draw();

  const trees: MapElement[] = [];

  trees[0] = new Tree({ x: 0, y: 0, z: 0 }, randomInt(1000, 9000));

  for (let i = 1; i < 10; i++) {
    let x = randomInt(-40, 40);
    let z = randomInt(-40, 40);
    let j = 0;

    const prevElement = trees[i - 1];

    while (
      (Math.abs(x - prevElement.coordinates.x) < prevElement.size.x &&
        Math.abs(z - prevElement.coordinates.z) < prevElement.size.z) ||
      j > 10
    ) {
      x = randomInt(-60, 60);
      z = randomInt(-60, 60);
      j++;
    }

    if (j < 10) {
      trees.push(new Tree({ x, y: 0, z }, randomInt(1000, 9000)));
    }
  }

  console.log("HERE");

  trees.forEach((tree) => tree.draw(scene));

  // Optimization
  // scene.freezeActiveMeshes();
  // scene.autoClear = false; // Color buffer
  // scene.autoClearDepthAndStencil = false; // Depth and stencil, obviously
  // scene.blockMaterialDirtyMechanism = true;
  // scene.blockfreeActiveMeshesAndRenderingGroups = true;
  // scene.blockfreeActiveMeshesAndRenderingGroups = false;
};
