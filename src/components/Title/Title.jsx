import { useMemo } from "react";
import styled from "styled-components";

export default function Title({ text, message }) {
  const titleText = useMemo(() => text, [text]);
  const messageText = useMemo(() => message, [message]);
  return (
    <Header>
      <H1>{titleText}</H1>
      <Message>{messageText}</Message>
    </Header>
  );
}
const Header = styled.header`
  width: 100%;
`;
const Message = styled.p`
  width: 100%;
  font-size: 1.5rem;
  text-align: center;
`;
const H1 = styled.h1`
  width: 100%;
  text-align: center;
  font-size: 2rem;
  font-weight: 400;
`;
