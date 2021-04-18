import { useEffect } from "react";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import apiHelperPublishers from "../../apiHelper/publishersAPI";
import Layout from "../../components/LayoutWrapper/Layout";
import { loadingStatus } from "../../consts";
import {
  publishersState,
  setStatus,
  loadPublishers,
  deletePublisher
} from "../../state/publishers/publishers";
export default function Publishers() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { publishers, status } = useSelector(publishersState);
  const [message, setMessage] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(null);
  const refreshPublishers = useCallback(() => {
    setMessage("Pobieram wydawnictwa");
    apiHelperPublishers(
      "loadPublishers",
      null,
      "Nie udało się pobrać wydawnictw"
    ).then(res => {
      if (res.message) {
        dispatch(setStatus(loadingStatus.OK));
        return setMessage(res.message);
      }
      dispatch(loadPublishers(res));
      return setMessage("Wydawnictwa zaktualizowane");
    });
  }, [dispatch]);
  function deletePublisherById() {
    setMessage("Usuwam wydawnictwo");
    setDeleteStatus("LOADING");
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
  useEffect(() => {
    if (status === loadingStatus.REFRESH || status === loadingStatus.INITIAL) {
      refreshPublishers();
    }
  }, [message, refreshPublishers, publishers, status]);
  return (
    <Layout
      title={`Wydawnictwa (${publishers.length})`}
      message={message}
      pathToAdd="/publishers/add"
      refreshFn={refreshPublishers}
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
            <Item key={"PublisherNr" + index}>
              <p>{name}</p>
              <p>Założono w: {establishmentYear} r.</p>
              <div>
                <button
                  onClick={() => {
                    setMessage("");
                    return history.push("/publishers/edit/" + id);
                  }}
                >
                  Edytuj
                </button>
                <button
                  onClick={() => {
                    setMessage("");
                    setSelectedPublisher({
                      id,
                      name,
                      establishmentYear
                    });
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
  font-size: 1.6rem;
`;
