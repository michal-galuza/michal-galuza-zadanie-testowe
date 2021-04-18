import styled from "styled-components";
import ButtonsBar from "./ButtonsBar";

export default function TopBar({
  children,
  title,
  message,
  pathToBack,
  pathToAdd,
  refreshFn = () => {}
}) {
  return (
    <Wrapper>
      <MainHeader>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <ButtonsBar paths={{ pathToBack, pathToAdd }} refreshFn={refreshFn} />
      </MainHeader>
      {children}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 115px);
  padding: 115px 0px 10px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
const MainHeader = styled.div`
  position: fixed;
  top: 50px;
  left: 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 30px auto 35px;
  background-color: white;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  padding-bottom: 10px;
  box-shadow: 0 3px 3px 1px grey;
`;

const Title = styled.h1`
  font-size: 1.7rem;
  width: 100%;
  text-align: center;
  line-height: 100%;
  grid-column: 1/4;
`;
const Message = styled.p`
  width: 100%;
  padding: 2px 0;

  font-size: 1.1rem;
  grid-column: 1/4;
  grid-row: 2/3;
  text-align: center;
  color: black;
  height: 100%;
`;
