import { useMemo, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import apiHelperBooks from "../../apiHelper/booksAPI";
import Layout from "../../components/LayoutWrapper/Layout";
import { authorsState } from "../../state/authors/authors";
import { booksState, updateBook } from "../../state/books/books";
import { publishersState } from "../../state/publishers/publishers";

export default function BooksEdit() {
  const dispatch = useDispatch();

  const { publishers } = useSelector(publishersState);
  const { authors } = useSelector(authorsState);
  const { books } = useSelector(booksState);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const booksIndexToEdit = useMemo(
    () => books.findIndex(item => item.id === parseInt(id, 10)),
    [id, books]
  );
  const authorIndex = useMemo(
    () =>
      authors.findIndex(item => item.id === books[booksIndexToEdit].authorId),
    [authors, books, booksIndexToEdit]
  );
  const publisherIndex = useMemo(
    () =>
      publishers.findIndex(
        item => item.id === books[booksIndexToEdit].publisherId
      ),
    [publishers, books, booksIndexToEdit]
  );

  const initalFormState = {
    title: books[booksIndexToEdit].title,
    isbn: books[booksIndexToEdit].isbn,
    author: authors[authorIndex].id,
    publisher: publishers[publisherIndex]?.id || "Wydawnictwo usunięte",
    publishmentYear: books[booksIndexToEdit].publishmentYear,
    id: books[booksIndexToEdit].id
  };
  function formReducer(state, { name, value }) {
    return { ...state, [name]: value };
  }
  const [formState, formDispatch] = useReducer(formReducer, initalFormState);

  function submitFn(e) {
    e.preventDefault();

    const { title, isbn, author, publisher, publishmentYear, id } = formState;
    if (!title || !isbn || !publishmentYear || !author || !publisher) {
      return setMessage("Uzupełnij wszystkie pola");
    }

    const actualYear = new Date().getFullYear();
    const parsedYear = parseInt(publishmentYear, 10);

    if (parsedYear > actualYear) {
      return setMessage(
        `Nie można wstawiać wydawnictw z przyszłości, mamy ${actualYear} r.`
      );
    }
    if (parsedYear <= 0) {
      return setMessage("Minimalny rok publikacji książki to 1");
    }
    const convertedISBN = isbn.replace(/[-]+/g, "");
    if (convertedISBN.match(/[A-za-z_]/gi)) {
      return setMessage("W ISBN nie mogą znajdować się litery");
    }
    if (convertedISBN.length > 13) {
      return setMessage("Za dużo cyfr ISBN");
    }
    if (convertedISBN.length < 13) {
      return setMessage("Za mało cyfr ISBN");
    }

    if (
      books.findIndex(item => item.isbn === convertedISBN && item.id !== id) !==
      -1
    ) {
      return setMessage("Istnieje już książka o podanym ISBN");
    }
    apiHelperBooks(
      "editBook",
      {
        title,
        isbn: convertedISBN,
        publishmentYear: parsedYear,
        authorId: parseInt(author, 10),
        publisherId: parseInt(publisher, 10),
        id
      },
      "Nie udało się zedytować książki"
    ).then(res => {
      if (res.message) {
        return setMessage(res.message);
      }
      setMessage("Poprawnie zedytowano książkę " + res.title);
      return dispatch(updateBook(res));
    });
  }

  return (
    <Layout
      title="Edytuj książkę"
      pathToBack="/books"
      setMessage={setMessage}
      message={message}
    >
      <Form onSubmit={e => submitFn(e)}>
        <label>
          Tytuł
          <input
            type="text"
            required
            name="title"
            value={formState.title}
            onChange={e => formDispatch(e.target)}
          />
        </label>
        <label>
          ISBN <span>(max 13 cyfr możesz używać " - ")</span>
          <input
            type="text"
            required
            name="isbn"
            value={formState.isbn}
            onChange={e => formDispatch(e.target)}
          />
        </label>
        <label>
          Autor
          <select
            required
            name="author"
            value={formState.author}
            onChange={e => formDispatch(e.target)}
          >
            {authors.map((item, index) => (
              <option value={item.id} key={"AuthorOptionNR" + index}>
                {item.firstName + " " + item.lastName}
              </option>
            ))}
          </select>
        </label>
        <label>
          Wydawnictwo
          <select
            required
            name="publisher"
            value={formState.publisher}
            onChange={e => formDispatch(e.target)}
          >
            {publishers.map((item, index) => (
              <option value={item.id} key={"PublisherOptionNR" + index}>
                {`${item.name} (${item.establishmentYear} r.)`}
              </option>
            ))}
          </select>
        </label>
        <label>
          Rok wydania
          <input
            type="number"
            required
            name="publishmentYear"
            value={formState.publishmentYear}
            onChange={e => formDispatch(e.target)}
          />
        </label>
        <button>Zapisz</button>
      </Form>
    </Layout>
  );
}
const Form = styled.form`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  min-height: 200px;
  padding: 0 20px;
  label {
    width: 300px;

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    font-size: 1.3rem;
    input,
    select {
      width: 100%;
      height: 45px;
      padding-left: 7px;
      font-size: 1.3rem;
    }
  }
  span {
    font-size: 1rem;
  }
  button {
    width: 150px;
    background-color: ${({ theme }) => theme.buttonColor};
    height: 40px;
    color: white;
    border: 0px;
    font-size: 1.4rem;
    margin-top: 10px;
  }
`;
