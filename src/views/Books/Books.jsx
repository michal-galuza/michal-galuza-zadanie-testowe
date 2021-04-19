import { useDispatch, useSelector } from "react-redux";
import { authorsState } from "../../state/authors/authors";
import { publishersState } from "../../state/publishers/publishers";
import Layout from "../../components/LayoutWrapper/Layout";
import { useCallback } from "react";
import { booksState, deleteBook } from "../../state/books/books";
import apiHelperBooks from "../../apiHelper/booksAPI";
import { useState } from "react";
import styled from "styled-components";

import ListItem from "../../components/ListItem/ListItem";
export default function Books() {
  const [message, setMessage] = useState("");
  const { authors } = useSelector(authorsState);
  const { publishers } = useSelector(publishersState);
  const { books } = useSelector(booksState);
  const dispatch = useDispatch();

  const [bookToDelete, setBookToDelete] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(null);
  const findIndexAuthors = useCallback(
    (value, key) => authors.findIndex(item => item[key] === value),
    [authors]
  );
  const findIndexPublishers = useCallback(
    (value, key) => publishers.findIndex(item => item[key] === value),
    [publishers]
  );
  const deleteBookById = useCallback(
    id => {
      setMessage("Usuwam książkę");
      setDeleteStatus("LOADING");
      apiHelperBooks("deleteBook", id, "Nie udało się usunąć książki").then(
        res => {
          if (res.message) {
            setDeleteStatus("DONE");
            return setMessage(res.message);
          }
          setDeleteStatus("DONE");
          setMessage("Usunięto książkę");
          return dispatch(deleteBook(res.id));
        }
      );
    },
    [dispatch]
  );

  return (
    <Layout
      title={`Książki (${books.length})`}
      pathToAdd="/books/add"
      message={message}
      setMessage={setMessage}
    >
      <Modal isOpen={bookToDelete}>
        {message || "Czy jesteś pewny że chcesz usunąć"}
        {bookToDelete ? (
          <Book>
            <p>Tytuł: {bookToDelete.title}</p>
            <p>Autor: {bookToDelete.author}</p>
            <p>ISBN: {bookToDelete.isbn}</p>
            <p>Wydawnictwo: {bookToDelete.publisher}</p>
          </Book>
        ) : (
          ""
        )}{" "}
        <div>
          {deleteStatus === "DONE" || deleteStatus === "LOADING" ? (
            <button
              onClick={() => {
                setDeleteStatus(null);
                return setBookToDelete(null);
              }}
            >
              Ok
            </button>
          ) : (
            <>
              <button onClick={() => deleteBookById(bookToDelete.id)}>
                Tak
              </button>
              <button onClick={() => setBookToDelete(null)}>Nie</button>
            </>
          )}
        </div>
      </Modal>
      {books.lenght === 0 ? (
        <p>Nie masz dodanych żadnych książek</p>
      ) : (
        books.map((item, index) => {
          const getAuthor = findIndexAuthors(item.id, "authorId");
          const getPublisher = findIndexPublishers(item.publisherId, "id");
          return (
            <ListItem
              key={"book" + index}
              pathToEdit={"/books/edit/" + item.id}
              deleteFunction={() => {
                setMessage("");
                setBookToDelete({
                  ...item,
                  author: getAuthor?.firstName + " " + getAuthor?.lastName,
                  publisher: getPublisher?.name
                });
              }}
            >
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
            </ListItem>
          );
        })
      )}
    </Layout>
  );
}

const Modal = styled.div`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffa600;
  color: white;
  width: 300px;
  min-height: 300px;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0 0 5px 1px grey;
  font-size: 1.3rem;
  button {
    width: 100px;
    height: 30px;
    font-size: 1.3rem;
    background-color: ${({ theme }) => theme.defaultBackground};
    color: black;
    border: 0px;
    margin: 0 6px;
    border-radius: 8px;
  }
`;
const Book = styled.div`
  width: 100%;
  margin: 10px 0;
  padding: 10px 0;
  background-color: ${({ theme }) => theme.defaultBackground};
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  p {
    font-size: 1.1rem;
  }
`;
