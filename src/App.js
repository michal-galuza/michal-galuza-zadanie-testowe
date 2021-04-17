import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import notFound from "./views/404/404";
import AuthorsEdit from "./views/Authors/AuthorsEdit";
import Authors from "./views/Authors/Authors";
import Books from "./views/Books/Books";
import EditBook from "./views/Books/BooksEdit";
import Publishers from "./views/PublishingHouse/Publishers";
import PublishersEdit from "./views/PublishingHouse/PublishersEdit";
import Home from "./views/Home/Home";
import AuthorsAdd from "./views/Authors/AuthorsAdd";

function App() {
  return (
    <Router>
      <NavBar />
      <Main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/books" component={Books} />
          <Route path="/books/:id" component={EditBook} />
          <Route exact path="/authors" component={Authors} />
          <Route exact path="/authors/edit/:id" component={AuthorsEdit} />
          <Route path="/authors/add" component={AuthorsAdd} />
          <Route exact path="/publishers" component={Publishers} />
          <Route path="/publishers/:id" component={PublishersEdit} />
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
