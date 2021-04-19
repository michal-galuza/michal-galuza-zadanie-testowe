import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import styled from "styled-components";
import apiHelperAuthors from "../../apiHelper/authorsAPI";
import apiHelperBooks from "../../apiHelper/booksAPI";
import apiHelperPublishers from "../../apiHelper/publishersAPI";
import { loadingStatus } from "../../consts";
import {
  authorsState,
  loadAuthors,
  setStatusAuthors
} from "../../state/authors/authors";
import { booksState, loadBooks, setStatusBooks } from "../../state/books/books";
import {
  loadPublishers,
  publishersState,
  setStatusPublishers
} from "../../state/publishers/publishers";
import ButtonsBar from "./ButtonsBar";

export default function Layout({
  children,
  title,
  message,
  pathToBack,
  pathToAdd,
  setMessage
}) {
  const location = useLocation();
  const dispatch = useDispatch();
  const authors = useSelector(authorsState);
  const publishers = useSelector(publishersState);
  const books = useSelector(booksState);

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
  }, [dispatch, setMessage]);
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
  }, [dispatch, setMessage]);
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
  }, [dispatch, setMessage]);
  const refreshFn = location.pathname.match(/books/)
    ? booksDownload
    : location.pathname.match(/publishers/)
    ? publishersDownload
    : authorsDownload;

  useEffect(() => {
    if (location.pathname.match(/books/)) {
      if (publishers.status === loadingStatus.INITIAL) {
        publishersDownload();
      }
      if (authors.status === loadingStatus.INITIAL) {
        authorsDownload();
      }
      if (books.status === loadingStatus.INITIAL) {
        booksDownload();
      }
    }
    if (location.pathname.match(/publishers/)) {
      if (publishers.status === loadingStatus.INITIAL) {
        refreshFn();
      }
      if (books.status === loadingStatus.INITIAL) {
        booksDownload();
      }
    }
    if (location.pathname === "/" || location.pathname.match(/edit/)) {
      if (authors.status === loadingStatus.INITIAL) {
        authorsDownload();
      }
    }
  }, [
    books,
    publishers,
    authors,
    dispatch,
    publishersDownload,
    authorsDownload,
    booksDownload,
    refreshFn,
    location
  ]);
  return (
    <Wrapper>
      <MainHeader>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <ButtonsBar paths={{ pathToBack, pathToAdd }} refreshFn={refreshFn} />
      </MainHeader>
      {children}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 115px);
  padding: 50px 0px 10px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
const MainHeader = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 30px auto 35px;
  background-color: white;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  padding-bottom: 10px;
  box-shadow: 0 3px 3px 1px grey;
  align-self: flex-start;
`;

const Title = styled.h1`
  font-size: 1.7rem;
  width: 100%;
  text-align: center;
  line-height: 100%;
  grid-column: 1/4;
`;
const Message = styled.p`
  width: 100%;
  padding: 2px 0;

  font-size: 1.1rem;
  grid-column: 1/4;
  grid-row: 2/3;
  text-align: center;
  color: black;
  height: 100%;
`;
