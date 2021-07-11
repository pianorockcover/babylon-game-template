import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 300px;
  font-weight: bold;
  text-transform: uppercase;
  height: 150px;
  cursor: pointer;
  font-size: 20px;
`;

interface PlayButtonProps {
  onClick: () => void;
}

export const PlayButton: React.FC<PlayButtonProps> = (props) => {
  return <Button {...props}>Start!</Button>;
};
