import { DefaultLoadingScreen } from "babylonjs";

export const createLoadingScreen = (
  canvasElement: HTMLCanvasElement
): DefaultLoadingScreen => {
  return new DefaultLoadingScreen(canvasElement, "Please Wait", "black");
};
