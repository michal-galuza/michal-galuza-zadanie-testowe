import { useHistory } from "react-router";
import styled from "styled-components";

export default function ButtonsBar({
  paths: { pathToAdd, pathToBack },
  refreshFn
}) {
  const history = useHistory();
  return (
    <ButtonsWrapper isOne={pathToBack === ""}>
      {pathToBack ? (
        <button onClick={() => history.push(pathToBack)}>Wróć</button>
      ) : (
        <>
          <button onClick={() => refreshFn()}>Odśwież</button>
          <button onClick={() => history.push(pathToAdd)}>Dodaj</button>
        </>
      )}
    </ButtonsWrapper>
  );
}
const ButtonsWrapper = styled.div`
  width: 300px;
  height: 27px;
  display: flex;
  justify-content: ${({ isOne }) => (!isOne ? "center" : "space-between")};
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  grid-column: 1/4;
  button {
    width: 90px;
    height: 27px;
    margin: 0 10px;
    background-color: ${({ theme }) => theme.buttonColor};
    color: white;
    border: 0px;
    outline: none;
    font-size: 1.2rem;
    text-align: center;
  }
`;
