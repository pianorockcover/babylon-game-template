import { DefaultLoadingScreen } from "babylonjs";

export const createLoadingScreen = (canvasElement: HTMLCanvasElement) => {
    return new DefaultLoadingScreen(canvasElement, "Please Wait", "black");
}