import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addAuthor,
  authorsState,
  setAddAuthorInfo
} from "../../state/authors/authors";
export default function AuthorsAdd() {
  const [formState, setFormState] = useState({ firstName: "", lastName: "" });
  const { infoForAddAuthor } = useSelector(authorsState);
  const dispatch = useDispatch();
  function submit(e) {
    e.preventDefault();
    dispatch(addAuthor(formState));
    if (infoForAddAuthor === "Dodano nowego autora") {
      setFormState({ firstName: "", lastName: "" });
    }
  }
  return (
    <div>
      <Link to="/authors" onClick={() => dispatch(setAddAuthorInfo(""))}>
        Powrót do listy
      </Link>
      <h1> Dodaj autora</h1>
      <form onSubmit={e => submit(e)}>
        <p>{infoForAddAuthor}</p>
        <input
          type="text"
          placeholder="Imię"
          required
          onChange={e => {
            setFormState({ ...formState, firstName: e.target.value });
          }}
          value={formState.firstName}
        />
        <input
          type="text"
          placeholder="Nazwisko"
          required
          onChange={e => {
            setFormState({ ...formState, lastName: e.target.value });
          }}
          value={formState.lastName}
        />
        <button>Zapisz</button>
      </form>
    </div>
  );
}
