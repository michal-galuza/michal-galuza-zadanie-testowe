import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import loadingStatus from "../../consts/loadingStatus";
import { authorsState, loadAuthors } from "../../state/authors/authors";

export default function AuthorsEdit() {
  const [authorToEdit, setAuthorToEdit] = useState(false);
  const [formState, setFormState] = useState({ firstName: "", lastName: "" });
  const { authors, status } = useSelector(authorsState);
  const { id } = useParams();
  const parsedId = parseInt(id, 10);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === loadingStatus.INITIAL) {
      dispatch(loadAuthors());
    }
    if (!authorToEdit) {
      for (let i = 0; i < authors.length; i++) {
        if (authors[i].id === parsedId) {
          console.log("Znaleziono takiego autora ");
          setAuthorToEdit(authors[i]);
        }
      }
    }
  }, [authorToEdit, authors, parsedId, dispatch, status]);
  useEffect(() => {
    console.log(authorToEdit);
  }, [authorToEdit]);
  if (authors.length === 0 && status === loadingStatus.OK) {
    return (
      <div>
        Nie masz dodanych żandych autorów
        <Link to="/authors">Powrót do listy</Link>
      </div>
    );
  }
  if (isNaN(parsedId)) {
    return (
      <div>
        Nie znaleziono takiego autora <Link to="/authors">Powrót do listy</Link>
      </div>
    );
  }
  if (authorToEdit.message) {
    return (
      <div>
        {authorToEdit.message} <Link to="/authors">Powrót do listy</Link>
      </div>
    );
  }
  if (!authorToEdit) {
    <div>
      Szuakm autora...
      <Link to="/authors">Powrót do listy</Link>
    </div>;
  }
  return (
    <div>
      <Link to="/authors">Powrót do listy</Link>
      <h1>
        Edytujesz autora
        <br />
        {authorToEdit.firstName} {authorToEdit.lastName}
      </h1>
      <form>
        <input
          placeholder={authorToEdit.firstName}
          type="text"
          required
          value={formState.firstName}
          onChange={e =>
            setFormState({ ...formState, firstName: e.target.value })
          }
        />
        <input
          placeholder={authorToEdit.lastName}
          type="text"
          required
          value={formState.lastName}
          onChange={e =>
            setFormState({ ...formState, lastName: e.target.value })
          }
        />
        <button>Zapisz</button>
      </form>
    </div>
  );
}
