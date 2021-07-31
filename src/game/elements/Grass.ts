import { Coordinates, RGBA } from ".";
import { modSeed } from "../utils/modSeed";
import { randomElement } from "../utils/randomElement";
import { randomInt } from "../utils/randomInt";
import { PureBoxParams } from "./Box";
import { MapElement } from "./MapElement";

export class Grass extends MapElement {
    colors: RGBA[] = [[150, 191, 61], [100, 150, 37]];
    berryColors: RGBA[] = [[252, 251, 248], [251, 108, 6]];
    isSolid = false;

    maxX = 5;
    maxY = 8;
    maxZ = 5;

    size: Coordinates = { x: this.maxX, z: this.maxZ, y: this.maxY };

    constructor(coordinates: Coordinates, seed: number) {
        super(coordinates, seed);

        this.draft = [...this.drawGrass()];
    }

    drawGrass = (): PureBoxParams[] => {
        const { x, y, z } = this.coordinates;

        const result: PureBoxParams[] = [];

        const maxY = modSeed(this.seed, [0, 1], [4, this.maxY]);
        let maxX = modSeed(this.seed, [2, 1], [1, this.maxX]);
        let maxZ = modSeed(this.seed, [1, 0], [1, this.maxZ]);

        const hasBerries = (modSeed(this.seed, [1, 0]) % 2) === 0;
        const berryColor = randomElement(this.berryColors);

        for (let j = 0; j < maxY; j++) {
            maxX++;
            maxZ++;
            let roots = 0;
            for (let i = 0; i < maxX; i++) {
                for (let k = 0; k < maxZ; k++) {
                    if (randomInt(100, 999) % 4 === 0) {
                        roots++;
                        result.push({
                            coordinates: {
                                x: i,
                                y: j,
                                z: k,
                                stepSize: "half",
                            },
                            size: "half",
                            color: randomElement(this.colors)
                        });

                        if (j === (maxY - 1) && hasBerries &&
                            randomInt(100, 999) % 5 === 0) {
                            result.push({
                                coordinates: {
                                    x: i,
                                    y: j + 0.5,
                                    z: k,
                                    stepSize: "half",
                                },
                                size: "quarter",
                                color: berryColor,
                            });
                        }
                    }
                }
            }
            if (!roots) {
                result.push({
                    coordinates: {
                        x: Math.trunc(maxX / 2),
                        y: j,
                        z: Math.trunc(maxZ / 2),
                        stepSize: "half",
                    },
                    size: "half",
                    color: randomElement(this.colors)
                });
            }
        }

        return result;
    }
}
