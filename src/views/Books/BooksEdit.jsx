import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import loadingStatus from "../../consts/loadingStatus";
import { booksState, loadBooks } from "../../state/books/books";

export default function EditBook() {
  const { books, status } = useSelector(booksState);
  const [state, setState] = useState(null);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  useEffect(() => {
    if (status === loadingStatus.INITIAL) {
      dispatch(loadBooks());
    }
    if (status === loadingStatus.OK && !state) {
      const id = pathname.split("/")[2];
      books.map(item => {
        if (item.id === id) {
          return setState(item);
        }
        return false;
      });
    }
  }, [books, dispatch, pathname, status, state]);
  console.log(state);
  return (
    <form>
      <input type="text" placeholder="Tytuł" name="title" />
      <input type="text" placeholder="ISBN" name="isbn" />
      <input type="text" placeholder="Autor" name="author" />
      <input type="text" placeholder="Rok wydania" name="publishmentYear" />
      <button>Zatwierdź</button>
    </form>
  );
}
