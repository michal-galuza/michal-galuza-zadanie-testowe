import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import authorsAPI from "../../apiHelper/authorsAPI";

import { loadingStatus } from "../../consts";
import {
  authorsState,
  deleteAuthor,
  loadAuthors
} from "../../state/authors/authors";
import { messageState, setMessage } from "../../state/message/message";

export default function Authors({ children }) {
  const [open, setOpen] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState(0);
  const [deleteStatus, setDeleteStatus] = useState(null);
  const { authors, status } = useSelector(authorsState);
  const history = useHistory();
  const message = useSelector(messageState);
  const dispatch = useDispatch();
  console.log(authors.length);
  function deleteAuthorById() {
    dispatch(setMessage("Usuwam autora:"));
    authorsAPI.deleteAuthor(authors[authorToDelete].id).then(res => {
      setDeleteStatus("LOADING");
      if (res.message) {
        return dispatch(setMessage(res.message));
      }
      setAuthorToDelete(null);
      dispatch(setMessage("Usunięto poprawnie autora"));
      setDeleteStatus("DONE");
      return dispatch(deleteAuthor(res.id));
    });
  }
  useEffect(() => {
    if (status === loadingStatus.REFRESH) {
      dispatch(setMessage("Pobieram autorów"));
      authorsAPI.loadAuthors().then(res => {
        res.message
          ? dispatch(setMessage(res.message))
          : dispatch(loadAuthors(res));
      });
    }
  }, [message, dispatch, authors, status]);
  return (
    <Wrapper>
      <Modal isOpen={open}>
        <h2>{message || "Czy jesteś pewien że chcesz usunąć autora:"}</h2>
        {authors[authorToDelete] ? (
          <AuthorSelected>
            {authors[authorToDelete].lastName || "Błąd"}
            {authors[authorToDelete].firstName || "Błąd"}
          </AuthorSelected>
        ) : (
          ""
        )}

        <div>
          {deleteStatus === "DONE" || deleteStatus === "LOADING" ? (
            <button
              onClick={() => {
                setDeleteStatus(null);
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
      {children}

      <Message>
        {authors.length === 0 && status !== loadingStatus.LOADING
          ? "Nie masz dodanych żadnych autorów."
          : message}
      </Message>
      <p>Łącznie autorów: {authors.length}</p>
      {authors.length === 0
        ? ""
        : authors.map((item, index) => (
            <Item key={"AuthorNr" + index}>
              <p>
                {item.lastName} {item.firstName}
              </p>

              <div>
                <button
                  onClick={() => {
                    dispatch(setMessage(""));

                    return history.push("/edit/" + item.id);
                  }}
                >
                  Edytuj
                </button>
                <button
                  onClick={() => {
                    dispatch(setMessage(""));
                    setAuthorToDelete(index);
                    return setOpen(true);
                  }}
                >
                  Usuń
                </button>
              </div>
            </Item>
          ))}
    </Wrapper>
  );
}
const Message = styled.p`
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
`;
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
const Wrapper = styled.div`
  width: 100%;

  padding: 100px 10px 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
const Item = styled.div`
  width: 300px;
  text-align: center;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
