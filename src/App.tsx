import {
  SceneOptimizerOptions,
  HardwareScalingOptimization,
  SceneOptimizer,
} from "babylonjs";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { PlayButton } from "./components/PlayButton";
import { createMainScene } from "./game/createMainScene";
import { generateWorld } from "./game/generateWorld";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #444444;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

export const App: React.FC = () => {
  const [started, setStarted] = useState<boolean>(true);

  const canvasElement = useRef<HTMLCanvasElement>(null);

  const onStart = useCallback(() => setStarted(true), []);

  useEffect(() => {
    if (started && canvasElement && canvasElement.current) {
      const scene = createMainScene(canvasElement.current);
      generateWorld(scene);

      // Optimizer
      const options = new SceneOptimizerOptions();
      options.addOptimization(new HardwareScalingOptimization(0, 1));
      const optimizer = new SceneOptimizer(scene, options);
      optimizer.start();
    }
  }, [started]);

  return (
    <>
      <GlobalStyles />
      <Wrapper>
        {!started && <PlayButton onClick={onStart} />}
        <Canvas hidden={!started} ref={canvasElement} />
      </Wrapper>
    </>
  );
};
