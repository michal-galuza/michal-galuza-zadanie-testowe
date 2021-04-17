import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./components/NavBar/NavBar";
import notFound from "./views/404/404";
import AuthorsEdit from "./views/Authors/AuthorsEdit";
import Authors from "./views/Authors/Authors";
import AuthorsAdd from "./views/Authors/AuthorsAdd";
import { useDispatch, useSelector } from "react-redux";
import { authorsState, loadAuthors } from "./state/authors/authors";
import { useEffect } from "react";
import { loadingStatus } from "./consts";
import authorsAPI from "./apiHelper/authorsAPI";
import { setMessage } from "./state/message/message";
import TopBar from "./components/TopBar/TopBar";
function App() {
  const dispatch = useDispatch();
  const authors = useSelector(authorsState);

  useEffect(() => {
    if (
      authors.status === loadingStatus.INITIAL ||
      authors.status === loadingStatus.REFRESH
    ) {
      dispatch(setMessage("Pobieram liste autorów"));
      console.log(typeof authorsAPI.loadAuthors);
      authorsAPI
        .loadAuthors()
        .then(response => {
          if (!response) {
            dispatch(setMessage("Nie udało się pobrać listy autorów "));
          }
          if (response.message) {
            dispatch(setMessage(response.message));
          }

          dispatch(setMessage(""));
          return dispatch(loadAuthors(response));
        })
        .catch(() =>
          dispatch(setMessage("Nie udało się pobrać listy autorów "))
        );
    }
  }, [authors, dispatch]);
  return (
    <Router>
      <NavBar />
      <Main>
        <Switch>
          <Route exact path="/">
            <Authors>
              <TopBar title="Autorzy" pathToAdd="/add" />
            </Authors>
          </Route>
          <Route exact path="/edit/:id" component={AuthorsEdit} />
          <Route path="/add" component={AuthorsAdd} />

          <Route path="*" component={notFound} />
        </Switch>
      </Main>
    </Router>
  );
}
const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  padding-top: 50px;
`;
export default App;
