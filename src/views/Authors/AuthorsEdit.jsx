import { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import apiHelperAuthors from "../../apiHelper/authorsAPI";
import Form from "../../components/Form/Form";
import Layout from "../../components/LayoutWrapper/Layout";
import { authorsState, updateAuthor } from "../../state/authors/authors";

export default function AuthorsEdit() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const parsedId = parseInt(id, 10);
  const [message, setMessage] = useState("");
  const { authors } = useSelector(authorsState);
  const findIndexToEdit = useCallback(
    () => authors.findIndex(item => item.id === parsedId),
    [authors, parsedId]
  );
  const indexToEdit = findIndexToEdit(parsedId);

  const [author, setAuthor] = useState({
    firstName: authors[indexToEdit]?.firstName,
    lastName: authors[indexToEdit]?.lastName,
    id: authors[indexToEdit]?.id
  });

  function submitFn({ firstName, lastName }, clearForm) {
    setMessage("Sprawdzam dane");
    if (
      (firstName === author.firstName && lastName === author.lastName) ||
      (!firstName && !lastName)
    ) {
      setMessage("Nic nie zmieniono");
      return clearForm();
    }
    setMessage("Edytuję autora");
    apiHelperAuthors(
      "editAuthor",
      {
        firstName: firstName || author.firstName,
        lastName: lastName || author.lastName,
        id: author.id
      },
      "Nie udało się zedytować autora"
    ).then(res => {
      if (res.message) {
        return setMessage(res.message);
      }
      setMessage("Poprawnie zakutalizowano.");
      clearForm();
      dispatch(updateAuthor(res));
      return setAuthor({
        ...author,
        ...res
      });
    });
  }

  return (
    <Layout title="Edytuj" message={message} pathToBack="/">
      <Info>
        {indexToEdit === -1 ||
        !author.firstName ||
        !author.lastName ||
        !author.id
          ? "Nie znaleziono takiego autora"
          : ` ${author.lastName + " " + author.firstName}`}
      </Info>
      {indexToEdit === -1 ||
      !author.firstName ||
      !author.lastName ||
      !author.id ? (
        ""
      ) : (
        <Form
          submitFn={submitFn}
          inputs={[
            {
              title: "Imię",
              name: "firstName",
              type: "text",
              isRequired: false,
              d: author.firstName
            },
            {
              title: "Nazwisko",
              name: "lastName",
              type: "text",
              isRequired: false,
              d: author.lastName
            }
          ]}
        />
      )}
    </Layout>
  );
}

const Info = styled.h2`
  width: 100%;
  font-size: 2rem;
  padding: 10px 0;
  text-align: center;
  background-color: ${({ theme }) => theme.buttonColor};
  color: ${({ theme }) => theme.defaultBackground};
  justify-self: flex-start;
`;
