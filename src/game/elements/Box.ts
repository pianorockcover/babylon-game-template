import { Color3, Mesh, MeshBuilder, Scene, StandardMaterial } from "babylonjs";
import { boxScale, Coordinates, RGBA } from ".";

export type BoxSize = "full" | "half" | "quarter" | "eighth";

const boxSizes = {
    full: 1,
    half: 2,
    quarter: 4,
    eighth: 8,
};

const boxStep = boxScale / boxSizes.eighth;

interface BoxParams {
    scene: Scene;
    size: BoxSize;
    coordinates: Coordinates;
    color: RGBA;
}

export class Box {
    private _name!: string;
    private _box!: Mesh;
    private _material!: StandardMaterial;
    private _materialName!: string;

    scene!: Scene;
    size!: BoxSize;
    coordinates!: Coordinates;
    color!: RGBA;

    constructor({ scene, size, coordinates, color }: BoxParams) {
        this.scene = scene;
        this._name = `box-${+ new Date()}`;

        this._box = MeshBuilder.CreateBox(this._name, {
            width: boxScale / boxSizes[size],
            height: boxScale / boxSizes[size],
            size: boxScale / boxSizes[size],
        }, this.scene);

        this._box.position.x = coordinates.x * boxStep;
        this._box.position.y = coordinates.y * boxStep;
        this._box.position.z = coordinates.z * boxStep;

        this._materialName = `material-${+ new Date()}`;

        this._material = new StandardMaterial(this._materialName, this.scene);
        this._material.alpha = color.a;
        this._material.diffuseColor = new Color3(color.r / 100, color.g / 100, color.b / 100);

        this._box.material = this._material;
    }
}