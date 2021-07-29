import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { PlayButton } from "./components/PlayButton";
import { createWorld } from "./game/world/world";

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
      createWorld(canvasElement.current);
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
