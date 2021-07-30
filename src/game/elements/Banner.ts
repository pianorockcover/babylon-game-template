import { Coordinates, RGBA } from ".";
import { getColoredGrid } from "../utils/getGrid";
import { PureBoxParams } from "./Box";
import { MapElement } from "./MapElement";

export class Banner extends MapElement {
  basementColor = [55, 55, 55];
  metalColor = [71, 71, 71];
  stickColor: RGBA = [123, 100, 82];
  lightStickColor: RGBA = [70, 59, 54];
  stickHeight = 12;
  bannerWidth = 15;
  bannerHeight = 8;
  bannerDepth = 0.5;

  constructor(coordinates: Coordinates, seed: number) {
    super(coordinates, seed);

    this.draft = [...this.drawStick()];
  }

  drawStick = (): PureBoxParams[] => {
    const result: PureBoxParams[] = [];

    const { x, y, z } = this.coordinates;

    const drawBasementGrid = getColoredGrid(
      this.basementColor,
      undefined,
      "half"
    );

    const hX = x * 2;
    const hY = y * 2;
    const hZ = z * 2;

    result.push(
      ...drawBasementGrid([
        [hX - 1, hY, hZ - 1],
        [hX - 1, hY, hZ],
        [hX - 1, hY, hZ + 1],
        [hX, hY, hZ - 1],
        [hX, hY, hZ + 1],
        [hX + 1, hY, hZ - 1],
        [hX + 1, hY, hZ],
        [hX + 1, hY, hZ + 1],
      ])
    );

    const drawGrid = getColoredGrid(this.metalColor);

    for (let i = 0; i < this.stickHeight; i++) {
      result.push(...drawGrid([[x, y + i, z]]));
    }

    result.push({
      coordinates: {
        x,
        z,
        y: this.stickHeight + 4,
      },
      customDimensions: {
        width: this.bannerWidth,
        height: this.bannerHeight,
        depth: this.bannerDepth,
      },
      texture: "img/red21.jpg",
    });

    const drawBorderGrid = getColoredGrid(this.stickColor, undefined);

    const bannerWidthHalf = this.bannerWidth / 2;

    const bottomBorderY = y + this.stickHeight;
    const topBorderY = y + this.stickHeight + this.bannerHeight + 0.5;

    for (let i = -bannerWidthHalf; i <= bannerWidthHalf; i++) {
      result.push(...drawBorderGrid([[x + i, y + bottomBorderY, z]]));
      result.push(...drawBorderGrid([[x + i, y + topBorderY, z]]));
    }

    for (let i = bottomBorderY; i < topBorderY; i++) {
      result.push(...drawBorderGrid([[x - bannerWidthHalf, y + i, z]]));
      result.push(...drawBorderGrid([[x + bannerWidthHalf, y + i, z]]));
    }

    result.push(
      ...this.drawLights({ x: x * 2, y: (topBorderY + 0.5) * 2, z: z * 2 })
    );

    return result;
  };

  drawLights = ({ x, y, z }: Coordinates): PureBoxParams[] => {
    const result: PureBoxParams[] = [];

    const drawGrid = getColoredGrid(this.lightStickColor, undefined, "half");

    const lightWidth = 8;
    const lightsBetweenWidth = 5;

    for (let i = 0; i < lightWidth; i++) {
      result.push(
        ...drawGrid([
          [x - lightsBetweenWidth, y, z - i],
          [x + lightsBetweenWidth, y, z - i],
          [x - lightsBetweenWidth, y, z + i],
          [x + lightsBetweenWidth, y, z + i],
        ])
      );
    }

    const light: PureBoxParams = {
      coordinates: {
        x: x + lightsBetweenWidth,
        z: z - lightWidth + 1,
        y: y - 0.5,
        stepSize: "half",
      },
      size: "quarter",
      color: [255, 248, 191],
      light: {
        color: [255, 248, 191, 0.03],
      },
    };

    result.push(light);

    result.push({
      ...light,
      coordinates: { ...light.coordinates, x: x - lightsBetweenWidth },
    });

    result.push({
      ...light,
      coordinates: { ...light.coordinates, z: z + lightWidth - 1 },
    });

    result.push({
      ...light,
      coordinates: {
        ...light.coordinates,
        x: x - lightsBetweenWidth,
        z: z + lightWidth - 1,
      },
    });

    return result;
  };
}
