import { useHistory } from "react-router";
import styled from "styled-components";

export default function ListItem({
  children,
  deleteFunction,
  pathToEdit,
  key
}) {
  const history = useHistory();
  return (
    <Item key={key}>
      <ContentWrapper>{children}</ContentWrapper>
      <ButtonsWrapper>
        <button onClick={() => history.push(pathToEdit)}>Edytuj</button>{" "}
        <button onClick={() => deleteFunction()}>Usuń</button>
      </ButtonsWrapper>
    </Item>
  );
}
const Item = styled.div`
  width: 250px;
  background-color: ${({ theme }) => theme.defaultBackground};
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 50px;
  padding: 10px 7px;
  margin: 10px;
  box-shadow: 0px 2px 8px 1px grey;
`;
const ButtonsWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    width: 100px;
    height: 25px;
    margin: 0px;
    border: 0px;
    color: white;
    background-color: ${({ theme }) => theme.buttonColor};
  }
`;
const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
`;
