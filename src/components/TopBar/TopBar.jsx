import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setMessage } from "../../state/message/message";
import styled from "styled-components";
import authorsAPI from "../../apiHelper/authorsAPI";
import { loadAuthors } from "../../state/authors/authors";
import { useMemo } from "react";
export default function TopBar({ title, pathToAdd, refresh }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useMemo(() => {
    return { title, pathToAdd };
  }, [title, pathToAdd]);
  function refreshAuthors() {
    dispatch(setMessage("Pobieram autorów"));
    authorsAPI.loadAuthors().then(res => {
      if (res.message) {
        return dispatch(setMessage(res.message));
      }
      dispatch(loadAuthors(res));

      return dispatch(
        setMessage(
          res.length === 0 ? "Nie masz dodanych żadnych autorów" : "Gotowe"
        )
      );
    });
  }

  return (
    <Wrapper>
      <button
        onClick={() => {
          if (title === "Autorzy") {
            return refreshAuthors();
          }
        }}
      >
        Odśwież
      </button>{" "}
      <Title>{data.title}</Title>
      <button
        onClick={() => {
          dispatch(setMessage());
          return history.push(data.pathToAdd);
        }}
      >
        Dodaj
      </button>
    </Wrapper>
  );
}
const Wrapper = styled.header`
  position: fixed;
  top: 50px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white;
  height: 70px;

  box-shadow: 0 3px 3px 1px grey;

  button {
    width: 80px;
    height: 30px;
    font-size: 1.1rem;
    background-color: ${({ theme }) => theme.buttonColor};
    border: 0px;
    margin: 0 10px;
    color: white;
  }
`;
const Title = styled.h1`
  font-size: 2rem;

  line-height: 100%;
`;
