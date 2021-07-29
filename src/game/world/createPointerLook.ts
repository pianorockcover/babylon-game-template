import { Scene } from "babylonjs";

export const createPointerLook = async (scene: Scene) => {
    const canvasElement = scene.getEngine().getRenderingCanvas();

    if (canvasElement) {
        canvasElement.addEventListener("click", () => {
            canvasElement.requestPointerLock = canvasElement.requestPointerLock || canvasElement.msRequestPointerLock || canvasElement.mozRequestPointerLock || canvasElement.webkitRequestPointerLock;
            if (canvasElement.requestPointerLock) {
                canvasElement.requestPointerLock();
            }
        }, false);
    }
}