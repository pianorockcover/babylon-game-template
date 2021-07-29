import { Axis, Mesh, MeshBuilder, PhysicsImpostor, Scene, Space } from "babylonjs";

export const createGround = (scene: Scene): Mesh => {
    const ground = MeshBuilder.CreatePlane("ground", {
        height: 20,
        width: 20
    }, scene)

    ground.rotate(Axis.X, Math.PI / 2, Space.WORLD);
    ground.position.y = -2;

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
}