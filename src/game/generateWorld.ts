import { MeshBuilder, Scene } from "babylonjs";
import { Box } from "./elements/Box";

export const generateWorld = (scene: Scene): void => {
  new Box({
    scene, size: "eighth", coordinates: {
      x: 0,
      y: 0,
      z: 0
    },
    color: {
      r: 27,
      g: 202,
      b: 65,
      a: 1
    },
  });

  new Box({
    scene,
    size: "eighth",
    coordinates: {
      x: 0,
      y: 1,
      z: 0
    },
    color: {
      r: 27,
      g: 202,
      b: 65,
      a: 1
    }
  });

  new Box({
    scene,
    size: "eighth",
    coordinates: {
      x: 0,
      y: 2,
      z: 0
    },
    color: {
      r: 27,
      g: 202,
      b: 65,
      a: 1
    }
  });

  // 

  new Box({
    scene,
    size: "eighth",
    coordinates: {
      x: 0,
      y: 3,
      z: 0
    },
    color: {
      r: 202,
      g: 27,
      b: 27,
      a: 1
    }
  });

  new Box({
    scene,
    size: "eighth",
    coordinates: {
      x: -1,
      y: 3,
      z: 0
    },
    color: {
      r: 202,
      g: 27,
      b: 27,
      a: 1
    }
  });

  new Box({
    scene,
    size: "eighth",
    coordinates: {
      x: 1,
      y: 3,
      z: 0
    },
    color: {
      r: 202,
      g: 27,
      b: 27,
      a: 1
    }
  });

  // 
  new Box({
    scene,
    size: "eighth",
    coordinates: {
      x: 0,
      y: 4,
      z: 0
    },
    color: {
      r: 199,
      g: 202,
      b: 27,
      a: 1
    }
  });

  new Box({
    scene,
    size: "eighth",
    coordinates: {
      x: -1,
      y: 4,
      z: 0
    },
    color: {
      r: 202,
      g: 27,
      b: 27,
      a: 1
    }
  });

  new Box({
    scene,
    size: "eighth",
    coordinates: {
      x: 1,
      y: 4,
      z: 0
    },
    color: {
      r: 202,
      g: 27,
      b: 27,
      a: 1
    }
  });

  // 

  new Box({
    scene,
    size: "eighth",
    coordinates: {
      x: 0,
      y: 5,
      z: 0
    },
    color: {
      r: 202,
      g: 27,
      b: 27,
      a: 1
    }
  });

  new Box({
    scene,
    size: "eighth",
    coordinates: {
      x: -1,
      y: 5,
      z: 0
    },
    color: {
      r: 202,
      g: 27,
      b: 27,
      a: 1
    }
  });

  new Box({
    scene,
    size: "eighth",
    coordinates: {
      x: 1,
      y: 5,
      z: 0
    },
    color: {
      r: 202,
      g: 27,
      b: 27,
      a: 1
    }
  });
};
