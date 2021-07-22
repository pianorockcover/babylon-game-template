import React, { useCallback, useEffect, useRef, useState } from "react";
import { createSandboxScene } from "./createSandboxScene";
import styled from "styled-components";
import { GlobalStyles } from "../../components/GlobalStyles";
import { Scene } from "babylonjs";
import { MapElement } from "../elements/MapElement";
import { mapElements } from "../generateWorld";
import { randomInt } from "../utils/randomInt";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #444444;
`;

const Elements = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  z-index: 2;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

export const Sandbox: React.FC = () => {
  const canvasElement = useRef<HTMLCanvasElement>(null);

  const [element, setElement] = useState<MapElement>();
  const [scene, setScene] = useState<Scene>();

  useEffect(() => {
    if (canvasElement && canvasElement.current) {
      setScene(createSandboxScene(canvasElement.current));
    }
  }, []);

  const drawElement = useCallback(
    (elementName: string) => () => {
      if (!scene) {
        return;
      }

      const ElementType = mapElements[elementName];
      const newElement = new ElementType(
        {
          x: 0,
          y: 0,
          z: 0,
        },
        randomInt(1000, 9999)
      );

      element?.remove();
      newElement.draw(scene);

      const newElement2 = new ElementType(
        {
          x: 10,
          y: 0,
          z: 5,
        },
        randomInt(1000, 9999)
      );

      newElement2.draw(scene);

      setElement(newElement);
    },
    [scene, element]
  );

  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Canvas ref={canvasElement} />
        <Elements>
          {Object.keys(mapElements).map((elementName, i) => (
            <button onClick={drawElement(elementName)} key={i}>
              {elementName}
            </button>
          ))}
        </Elements>
      </Wrapper>
    </>
  );
};
