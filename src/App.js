import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./components/NavBar/NavBar";
import notFound from "./views/404/404";
import AuthorsEdit from "./views/Authors/AuthorsEdit";
import Authors from "./views/Authors/Authors";
import AuthorsAdd from "./views/Authors/AuthorsAdd";
import Publishers from "./views/PublishingHouse/Publishers";
import PublishersEdit from "./views/PublishingHouse/PublishersEdit";
import PublishersAdd from "./views/PublishingHouse/PublishersAdd";
import Books from "./views/Books/Books";
import BooksAdd from "./views/Books/BooksAdd";
import BooksEdit from "./views/Books/BooksEdit";
function App() {
  return (
    <Router>
      <NavBar />
      <Main>
        <Switch>
          <Route exact path="/" component={Authors} />
          <Route path="/edit/:id" component={AuthorsEdit} />
          <Route path="/add" component={AuthorsAdd} />
          <Route exact path="/publishers" component={Publishers} />
          <Route path="/publishers/edit/:id" component={PublishersEdit} />
          <Route path="/publishers/add" component={PublishersAdd} />
          <Route exact path="/books" component={Books} />
          <Route path="/books/add" component={BooksAdd} />
          <Route path="/books/edit/:id" component={BooksEdit} />
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
