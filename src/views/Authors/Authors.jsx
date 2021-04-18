import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import apiHelperAuthors from "../../apiHelper/authorsAPI";
import Layout from "../../components/LayoutWrapper/Layout";

import { loadingStatus } from "../../consts";
import {
  authorsState,
  deleteAuthor,
  loadAuthors,
  setStatusAuthors
} from "../../state/authors/authors";

export default function Authors({ children }) {
  const [open, setOpen] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState(null);
  const { authors, status } = useSelector(authorsState);
  const history = useHistory();

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

  const refreshAuthors = useCallback(() => {
    setMessage("Pobieram autorów");
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

  useEffect(() => {
    if (status === loadingStatus.REFRESH || status === loadingStatus.INITIAL) {
      refreshAuthors();
    }
  }, [message, refreshAuthors, authors, status]);

  return (
    <Layout
      pathToAdd="/add"
      title={`Autorzy (${authors.length})`}
      message={message}
      refreshFn={refreshAuthors}
    >
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

      {authors.length === 0
        ? "Nie masz jeszcze żadnych autorów"
        : authors.map(({ firstName, lastName, id }, index) => (
            <Item key={"AuthorNr" + index}>
              <p>
                {lastName} {firstName}
              </p>

              <div>
                <button
                  onClick={() => {
                    setMessage("");

                    return history.push("/edit/" + id);
                  }}
                >
                  Edytuj
                </button>
                <button
                  onClick={() => {
                    setMessage("");
                    setAuthorToDelete({ firstName, lastName, id });
                    return setOpen(true);
                  }}
                >
                  Usuń
                </button>
              </div>
            </Item>
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

const Item = styled.div`
  width: 300px;
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
    font-size: 1.7rem;
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
const AuthorSelected = styled.p`
  width: 100%;
  margin: 10px 0;
  padding: 10px 0;
  background-color: ${({ theme }) => theme.defaultBackground};
  color: black;
  font-size: 1.6rem;
`;
