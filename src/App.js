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
