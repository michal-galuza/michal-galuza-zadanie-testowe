import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";

import loadingStatus from "../../consts/loadingStatus";
import { useEffect, useState } from "react";
import {
  authorsState,
  deleteAuthor,
  loadAuthors
} from "../../state/authors/authors";
export default function Authors() {
  const [state, setState] = useState(null);
  const dispatch = useDispatch();
  const { info, status, authors } = useSelector(authorsState);
  let history = useHistory();
  useEffect(() => {
    if (status === loadingStatus.INITIAL) {
      dispatch(loadAuthors());
    }
  }, [status, dispatch]);

  return (
    <Wrapper>
      <Title>Autorzy</Title>
      <OptionsWrapper>
        <button onClick={() => dispatch(loadAuthors())}>Odśwież</button>
        <button onClick={() => history.push("/authors/add")}>Dodaj</button>
      </OptionsWrapper>

      {authors.length === 0 ? (
        <h1>Brak autorów</h1>
      ) : status === loadingStatus.LOADING ? (
        <h1>Ładowanie</h1>
      ) : (
        authors.map((item, index) => (
          <Item key={"AuthorNr" + index}>
            <p>
              {item.firstName} {item.lastName}
            </p>
            <div>
              <Edit
                onClick={() => {
                  history.push("/authors/edit/" + item.id);
                }}
              >
                Edytuj
              </Edit>{" "}
              <Remove>Usuń</Remove>
            </div>
          </Item>
        ))
      )}
    </Wrapper>
  );
}

const NoAuthorsInfo = styled.h1`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 400;
`;
const Item = styled.div`
  width: 300px;
  background-color: white;
  margin: 5px;
  box-shadow: 0 2px 5px 1px #e2e2e2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 3px;
  font-size: 1.4rem;
`;
const Wrapper = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`;
const Title = styled.h1`
  width: 100%;
  height: 50px;
  text-align: center;
`;
const OptionsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  button {
    width: 120px;
    height: 40px;
    margin: 5px;
    font-size: 1.3rem;
    background-color: #0084ff;
    border: 0px;
    border-bottom: 1px solid green;
    color: white;
    border-radius: 7px;
  }
`;
const Edit = styled.button`
  width: 100px;
  height: 30px;
  margin: 5px;
  border: none;
  background-color: #eb9525;
  font-size: 1.2rem;
  color: white;
`;
const Remove = styled(Edit)`
  background-color: #9e2828;
`;
