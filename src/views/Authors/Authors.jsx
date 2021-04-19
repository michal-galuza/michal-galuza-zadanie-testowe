import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import apiHelperAuthors from "../../apiHelper/authorsAPI";
import Layout from "../../components/LayoutWrapper/Layout";
import ListItem from "../../components/ListItem/ListItem";

import { authorsState, deleteAuthor } from "../../state/authors/authors";

export default function Authors() {
  const [open, setOpen] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState(null);
  const { authors } = useSelector(authorsState);

  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  function deleteAuthorById() {
    setMessage("Usuwam autora:");
    apiHelperAuthors(
      "deleteAuthor",
      authorToDelete.id,
      "Nie udało się usunąć"
    ).then(res => {
      setDeleteStatus("LOADING");
      if (res.message) {
        setDeleteStatus("DONE");
        return setMessage(res.message);
      }

      setMessage("Usunięto poprawnie autora");
      setDeleteStatus("DONE");
      return dispatch(deleteAuthor(res.id));
    });
  }

  return (
    <Layout
      pathToAdd="/add"
      title={`Autorzy (${authors.length})`}
      message={message}
      setMessage={setMessage}
    >
      {open ? (
        <Modal isOpen={open}>
          <h2>{message || "Czy jesteś pewien że chcesz usunąć autora:"}</h2>
          {authorToDelete ? (
            <AuthorSelected>
              {authorToDelete.lastName || "Błąd"}{" "}
              {authorToDelete.firstName || "Błąd"}
            </AuthorSelected>
          ) : (
            ""
          )}

          <div>
            {deleteStatus === "DONE" || deleteStatus === "LOADING" ? (
              <button
                onClick={() => {
                  setDeleteStatus(null);
                  setAuthorToDelete(null);
                  return setOpen(false);
                }}
              >
                Ok
              </button>
            ) : (
              <>
                <button onClick={() => deleteAuthorById()}>Tak</button>
                <button
                  onClick={() => {
                    setAuthorToDelete(null);
                    return setOpen(false);
                  }}
                >
                  Nie
                </button>
              </>
            )}
          </div>
        </Modal>
      ) : (
        ""
      )}

      {authors.length === 0
        ? "Nie masz jeszcze żadnych autorów"
        : authors.map(({ firstName, lastName, id }, index) => (
            <ListItem
              key={"AuthorNr" + index}
              deleteFunction={() => {
                setMessage("");
                setAuthorToDelete({ firstName, lastName, id });
                return setOpen(true);
              }}
              pathToEdit={"/edit/" + id}
            >
              <p>Nazwisko: {lastName}</p>
              <p>Imię: {firstName}</p>
            </ListItem>
          ))}
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
  height: 300px;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0 0 5px 1px grey;

  div {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 10px;
  }
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

const AuthorSelected = styled.p`
  width: 100%;
  margin: 10px 0;
  padding: 10px 0;
  background-color: ${({ theme }) => theme.defaultBackground};
  color: black;
  font-size: 1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  p {
    padding: 0 5px;
    width: 100%;
    text-align: left;
  }
`;
