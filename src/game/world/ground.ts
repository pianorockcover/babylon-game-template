import { Axis, Mesh, MeshBuilder, Scene, Space } from "babylonjs";

export const createGround = (scene: Scene): Mesh => {
  const ground = MeshBuilder.CreatePlane(
    "ground",
    {
      height: 50,
      width: 50,
    },
    scene
  );

  ground.rotate(Axis.X, Math.PI / 2, Space.WORLD);
  ground.position.y = 0;

  // new PhysicsImpostor(
  //     ground,
  //     PhysicsImpostor.BoxImpostor,
  //     {
  //         mass: 0,
  //         friction: 0.1,
  //         restitution: .7
  //     },
  //     scene
  // );
  ground.checkCollisions = true;

  return ground;
};
