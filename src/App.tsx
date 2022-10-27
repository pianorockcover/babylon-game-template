import React, { useCallback, useState } from "react";
import { GlobalStyles } from "./components/GlobalStyles";
import { PlayButton } from "./components/PlayButton";
import { generateWorld } from "./game/generateWorld";

export const App: React.FC = () => {
  const [started, setStarted] = useState<boolean>();

  const onStart = useCallback(() => {
    setStarted(true);
    generateWorld();
  }, []);

  return (
    <>
      <GlobalStyles />
      {!started && <PlayButton onClick={onStart} />}
    </>
  );
};
