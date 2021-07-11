import { Scene } from "babylonjs";
import { Coordinates } from ".";

export class MapElement {
    protected _coordinates!: Coordinates;
    protected _scene!: Scene;

    constructor(coordinates: Coordinates, scene: Scene) {
        this._coordinates = coordinates;
        this._scene = scene;
    }
}