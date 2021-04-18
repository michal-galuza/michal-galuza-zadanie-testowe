import { useMemo } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import authorsAPI from "../../apiHelper/authorsAPI";
import Form from "../../components/Form/Form";
import Title from "../../components/Title/Title";
import { authorsState, updateAuthor } from "../../state/authors/authors";

export default function AuthorsEdit() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const parsedId = useMemo(() => parseInt(id, 10), [id]);
  const [message, setMessage] = useState("");
  const { authors } = useSelector(authorsState);

  const findIndexToEdit = useCallback(
    () => authors.findIndex(item => item.id === parsedId),
    [authors, parsedId]
  );
  const indexToEdit = findIndexToEdit(parsedId);
  const [author, setAuthor] = useState({
    firstName: authors[indexToEdit].firstName,
    lastName: authors[indexToEdit].lastName
  });

  function submitFn({ firstName, lastName }, clearForm) {
    if (
      (firstName === author.firstName && lastName === author.lastName) ||
      (!firstName && !lastName)
    ) {
      setMessage("Nic nie zmieniono");
      return clearForm();
    }

    authorsAPI
      .editAuthor(
        {
          firstName: firstName || author.firstName,
          lastName: lastName || author.lastName
        },
        authors[indexToEdit].id
      )
      .then(res => {
        if (res.message) {
          return setMessage(res.message);
        }
        console.log(authors[findIndexToEdit(parsedId)].firstName);
        setMessage("Poprawnie zakutalizowano.");
        clearForm();
        dispatch(updateAuthor(res));
        return setAuthor({
          ...author,
          firstName: res.firstName,
          lastName: res.lastName
        });
      })
      .catch(err => {
        return setMessage("Nie udało się zaktualizować autora");
      });
  }

  return (
    <Wrapper>
      {" "}
      <Info>
        {indexToEdit === -1
          ? "Nie znaleziono takiego autora (odśwież aplikacje)"
          : ` ${author.lastName + " " + author.firstName}`}
      </Info>
      <Title text="Edytuj" message={message} />
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
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Info = styled.h2`
  width: 100%;
  font-size: 2rem;
  padding: 10px 0;
  text-align: center;
  background-color: ${({ theme }) => theme.buttonColor};
  color: ${({ theme }) => theme.defaultBackground};
  justify-self: flex-start;
`;
