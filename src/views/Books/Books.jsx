import { useDispatch, useSelector } from "react-redux";
import {
  authorsState,
  loadAuthors,
  setStatusAuthors
} from "../../state/authors/authors";
import {
  loadPublishers,
  publishersState,
  setStatusPublishers
} from "../../state/publishers/publishers";
import Layout from "../../components/LayoutWrapper/Layout";
import { useEffect } from "react";
import { loadingStatus } from "../../consts";
import apiHelperPublishers from "../../apiHelper/publishersAPI";
import { useCallback } from "react";
import apiHelperAuthors from "../../apiHelper/authorsAPI";
import { booksState, loadBooks, setStatusBooks } from "../../state/books/books";
import apiHelperBooks from "../../apiHelper/booksAPI";
import { useState } from "react";
import styled from "styled-components";
export default function Books() {
  const [message, setMessage] = useState("");
  const authors = useSelector(authorsState);
  const publishers = useSelector(publishersState);
  const books = useSelector(booksState);
  const dispatch = useDispatch();

  const booksDownload = useCallback(() => {
    setMessage("Pobieram listę książek");
    apiHelperBooks(
      "loadBooks",
      null,
      "Nie udało się pobrać listy książek"
    ).then(res => {
      if (res.message) {
        dispatch(setStatusBooks(loadingStatus.OK));
        return setMessage("Nie udało się pobrać listy książek");
      }
      dispatch(loadBooks(res));
      return setMessage("Lista książek pobrana");
    });
  }, [dispatch]);
  const authorsDownload = useCallback(() => {
    setMessage("Pobieram listę autorów");
    apiHelperAuthors(
      "loadAuthors",
      null,
      "Nie udało się pobrać listy autorów"
    ).then(res => {
      if (res.message) {
        dispatch(setStatusAuthors(loadingStatus.OK));
        return setMessage(res.message);
      }
      dispatch(loadAuthors(res));
      return setMessage("Autorzy zaktualizowani");
    });
  }, [dispatch]);
  const publishersDownload = useCallback(() => {
    setMessage("Pobieram listę wydawnictw");
    apiHelperPublishers(
      "loadPublishers",
      null,
      "Nie udało się pobrać listy wydawnictw"
    ).then(res => {
      if (res.message) {
        dispatch(setStatusPublishers(loadingStatus.OK));
        return setMessage(res.message);
      }
      dispatch(loadPublishers(res));
      return setMessage("Lista wydawnictw zaktualizowana");
    });
  }, [dispatch]);
  useEffect(() => {
    if (publishers.status === loadingStatus.INITIAL) {
      publishersDownload();
    }
    if (authors.status === loadingStatus.INITIAL) {
      authorsDownload();
    }
    if (books.status === loadingStatus.INITIAL) {
      booksDownload();
    }
  }, [
    books,
    publishers,
    authors,
    dispatch,
    publishersDownload,
    authorsDownload,
    booksDownload
  ]);
  return (
    <Layout title="Książki" pathToAdd="/books/add">
      {books.books.lenght === 0 ? (
        <p>Nie masz dodanych żadnych książek</p>
      ) : (
        books.books.map((item, index) => {
          const getAuthor =
            authors.authors[
              authors.authors.findIndex(({ id }) => id === item.authorId)
            ];
          const getPublisher =
            publishers.publishers[
              publishers.publishers.findIndex(
                ({ id }) => id === item.publisherId
              )
            ];
          return (
            <Item key={"book" + index}>
              <p>ISBN: {item.isbn}</p>
              <p>Tytuł: {item.title}</p>
              <p>Rok wydania: {item.publishmentYear}</p>
              <p>
                {!getAuthor
                  ? "Nie znaleziono autora w bazie"
                  : "Autor: " + getAuthor.lastName + " " + getAuthor.firstName}
              </p>{" "}
              <p>
                {!getPublisher
                  ? "Nie znaleziono wydawnictwa w bazie"
                  : `Wydawnictwo: ${getPublisher.name} (${getPublisher.establishmentYear} r.)`}
              </p>
              <div>
                <button
                  onClick={() => {
                    setMessage("");
                  }}
                >
                  Edytuj
                </button>
                <button
                  onClick={() => {
                    setMessage("");
                  }}
                >
                  Usuń
                </button>
              </div>
            </Item>
          );
        })
      )}
    </Layout>
  );
}

const Item = styled.div`
  width: 300px;
  width: 100%;
  max-width: 500px;

  text-align: center;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px 0;
  box-shadow: 0px 2px 8px 1px grey;
  margin: 10px;
  p {
    font-size: 1.1rem;
  }
  div {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    button {
      width: 100px;
      height: 25px;
      margin: 0 10px;
      border: 0px;
      color: white;
      background-color: ${({ theme }) => theme.buttonColor};
    }
  }
`;
