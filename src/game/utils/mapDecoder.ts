import { MapElement } from "../elements/MapElement";
import { mapElements } from "../generateWorld";

export const mapDecoder = (encodedMap: string): MapElement[] => {
  const elements = encodedMap.split(";").map((encodedElement) => {
    const elementData = encodedElement.split(",").map((i) => Number(i));
    const elementClass = mapElements[elementData[0]];
    const element = new elementClass(
      {
        x: elementData[1],
        y: elementData[2],
        z: elementData[3],
      },
      elementData[4]
    );

    return element;
  });

  return elements;
};
