import { useLayoutEffect, useState } from "react";
import styled from "styled-components";

export default function FastMessage({ text = null, duration = 3500 }) {
  const [visible, setVisible] = useState(false);
  useLayoutEffect(() => {
    if (text) {
      setTimeout();
    }
  }, [text, duration]);

  return <MessageWrapper isActive={visible}>{text}</MessageWrapper>;
}
const MessageWrapper = styled.div`
  display: ${({ isActive }) => (isActive ? "flex" : "none")};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 100px;
  background-color: wheat;
`;
