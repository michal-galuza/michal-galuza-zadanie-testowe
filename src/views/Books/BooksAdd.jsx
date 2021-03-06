import { useReducer } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import apiHelperBooks from "../../apiHelper/booksAPI";

import Layout from "../../components/LayoutWrapper/Layout";

import { authorsState } from "../../state/authors/authors";
import { addNewBook, booksState } from "../../state/books/books";
import { publishersState } from "../../state/publishers/publishers";

export default function BooksAdd() {
  const dispatch = useDispatch();
  const { publishers } = useSelector(publishersState);
  const { authors } = useSelector(authorsState);
  const { books } = useSelector(booksState);
  const [message, setMessage] = useState("");
  const initalFormState = {
    title: "",
    isbn: "",
    author: "Wybierz autora",
    publisher: "Wybierz wydawnictwo",
    publishmentYear: ""
  };
  function formReducer(state, { name, value }) {
    return { ...state, [name]: value };
  }
  const [formState, formDispatch] = useReducer(formReducer, initalFormState);

  function submitFn(e) {
    e.preventDefault();
    const { title, isbn, author, publisher, publishmentYear } = formState;
    if (!title || !isbn || !publishmentYear) {
      return setMessage("Uzupełnij wszystkie pola");
    }
    if (author === initalFormState.author) {
      return setMessage("Muszisz wybrać autora");
    }
    if (publisher === initalFormState.publisher) {
      return setMessage("Muszisz wybrać wydawnictwo");
    }
    const actualYear = new Date().getFullYear();
    const parsedYear = parseInt(publishmentYear, 10);

    if (parsedYear > actualYear) {
      return setMessage(
        `Nie można wstawiać książęk z przyszłości, mamy ${actualYear} r.`
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
      books.length > 0 &&
      books.findIndex(item => item.isbn === convertedISBN) !== -1
    ) {
      return setMessage("Istnieje już książka o podanym ISBN");
    }
    apiHelperBooks(
      "addBook",
      {
        title,
        isbn: convertedISBN,
        publishmentYear: parsedYear,
        authorId: parseInt(author, 10),
        publisherId: parseInt(publisher, 10)
      },
      "Nie udało się dodać nowej książki"
    ).then(res => {
      if (res.message) {
        return setMessage(res.message);
      }
      setMessage("Dodano nową książkę: " + res.title);
      return dispatch(addNewBook(res));
    });
  }

  if (authors.length === 0) {
    return (
      <Layout title="Dodawanie książek" pathToBack="/books" message={message}>
        <Info>
          Nie masz dodanych żadnych autorów, dodaj ich aby móc dodawać książki
        </Info>
      </Layout>
    );
  }
  if (publishers.length === 0) {
    return (
      <Layout title="Dodawanie książek" pathToBack="/books" message={message}>
        <Info>
          Nie masz dodanych żadnych wydawnictw, dodaj ich aby móc dodawać
          książki
        </Info>
      </Layout>
    );
  }
  return (
    <Layout
      title="Dodaj książkę"
      pathToBack="/books"
      message={message}
      setMessage={setMessage}
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
            {" "}
            <option value="Wybierz autora" disabled>
              Wybierz autora
            </option>
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
            <option value="Wybierz wydawnictwo" disabled>
              Wybierz wydawnictwo
            </option>
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
const Info = styled.p`
  text-align: center;
  font-size: 1.3rem;
  padding: 10px 5px;
  background-color: ${({ theme }) => theme.buttonColor};
  color: white;
`;
const Form = styled.form`
  margin-top: 5px;
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
