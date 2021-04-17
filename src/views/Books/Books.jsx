import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { booksState, deleteBook, loadBooks } from "../../state/books/books";
import loadingStatus from "../../consts/loadingStatus";
import { useEffect } from "react";
import { authorsState, loadAuthors } from "../../state/authors/authors";
export default function Books() {
  const dispatch = useDispatch();
  const { info, status, books } = useSelector(booksState);
  const authors = useSelector(authorsState);
  let history = useHistory();
  useEffect(() => {
    if (status === loadingStatus.INITIAL) {
      dispatch(loadBooks());
    }
    if (authors === loadingStatus.INITIAL) {
      dispatch(loadAuthors());
    }
  }, [status, dispatch, authors]);

  return (
    <Wrapper>
      <Title>Książki</Title>
      <OptionsWrapper>
        <button onClick={() => dispatch(loadBooks())}>Odśwież</button>
        <button>Dodaj +</button>
      </OptionsWrapper>
      {status === loadingStatus.LOADING ? (
        <NoBooksInfo>{info}</NoBooksInfo>
      ) : (
        books.map(({ publishmentYear, title, id }, index) => (
          <Item key={"bookNr" + index}>
            <p>Tytuł: {title}</p>
            <p>Rok wydania: {publishmentYear}</p>

            <div>
              <Edit onClick={() => history.push("/edit/" + id)}>Edytuj</Edit>
              <Remove
                onClick={() => {
                  dispatch(deleteBook(id));
                  dispatch(loadBooks());
                }}
              >
                Usuń
              </Remove>
            </div>
          </Item>
        ))
      )}{" "}
      {status === loadingStatus.OK && books.length === 0 ? (
        <NoBooksInfo>Nie masz jeszcze żadnych książek</NoBooksInfo>
      ) : (
        ""
      )}
    </Wrapper>
  );
}
const NoBooksInfo = styled.h1`
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
