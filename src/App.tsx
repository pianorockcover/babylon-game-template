import React, { useCallback, useEffect, useState } from "react";
import { GlobalStyles } from "./components/GlobalStyles";
import { PlayButton } from "./components/PlayButton";
import { generateWorld } from "./game/generateWorld";

export const App: React.FC = () => {
  const [started, setStarted] = useState<boolean>(true);

  const onStart = useCallback(() => {
    setStarted(true);
    generateWorld();
  }, []);

  useEffect(() => {
    if (started) {
      generateWorld();
    }
  }, [started]);

  return (
    <>
      <GlobalStyles />
      {!started && <PlayButton onClick={onStart} />}
    </>
  );
};
