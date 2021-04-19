import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import apiHelperPublishers from "../../apiHelper/publishersAPI";
import Layout from "../../components/LayoutWrapper/Layout";
import ListItem from "../../components/ListItem/ListItem";
import { booksState } from "../../state/books/books";

import {
  publishersState,
  deletePublisher
} from "../../state/publishers/publishers";
export default function Publishers() {
  const dispatch = useDispatch();
  const { publishers } = useSelector(publishersState);
  const { books } = useSelector(booksState);
  const [message, setMessage] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(null);

  function deletePublisherById() {
    setMessage("Usuwam wydawnictwo");
    setDeleteStatus("LOADING");
    if (
      books.findIndex(item => item.publisherId === selectedPublisher.id) !== -1
    ) {
      return setMessage(
        "Do tego wydawnictwa są przypisane książki usuń je najpierw"
      );
    }
    apiHelperPublishers(
      "deletePublisher",
      selectedPublisher.id,
      "Nie udało się usunąć wydawnictwa"
    ).then(res => {
      if (res.message) {
        setDeleteStatus("DONE");
        return setMessage(res.message);
      }
      setDeleteStatus("DONE");
      dispatch(deletePublisher(res.id));
      return setMessage("Usunięto");
    });
  }

  return (
    <Layout
      title={`Wydawnictwa (${publishers.length})`}
      message={message}
      pathToAdd="/publishers/add"
      setMessage={setMessage}
    >
      <Modal isOpen={open}>
        <h2>{message || "Czy jesteś pewien że chcesz usunąć:"}</h2>
        {selectedPublisher ? (
          <SelectedPublisher>
            {selectedPublisher.name || "Brak"}
            <br />
            {selectedPublisher.establishmentYear + " r." || "Brak"}
          </SelectedPublisher>
        ) : (
          ""
        )}

        <div>
          {deleteStatus === "DONE" || deleteStatus === "LOADING" ? (
            <button
              onClick={() => {
                setDeleteStatus(null);
                setSelectedPublisher(null);
                return setOpen(false);
              }}
            >
              Ok
            </button>
          ) : (
            <>
              <button onClick={() => deletePublisherById()}>Tak</button>
              <button
                onClick={() => {
                  setSelectedPublisher(null);
                  return setOpen(false);
                }}
              >
                Nie
              </button>
            </>
          )}
        </div>
      </Modal>
      {publishers.length === 0
        ? "Nie masz jeszcze żadnych wydawnictw"
        : publishers.map(({ name, establishmentYear, id }, index) => (
            <ListItem
              key={"PublisherNr" + index}
              pathToEdit={"/publishers/edit/" + id}
              deleteFunction={() => {
                setMessage("");
                setSelectedPublisher({
                  id,
                  name,
                  establishmentYear
                });
                return setOpen(true);
              }}
            >
              <p>{name}</p>
              <p>Założono w: {establishmentYear} r.</p>
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
const SelectedPublisher = styled.p`
  width: 100%;
  margin: 10px 0;
  padding: 10px 0;
  background-color: ${({ theme }) => theme.defaultBackground};
  color: black;
  font-size: 1.1rem;
`;
