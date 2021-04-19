import { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import apiHelperPublisher from "../../apiHelper/publishersAPI";
import Form from "../../components/Form/Form";
import Layout from "../../components/LayoutWrapper/Layout";
import {
  publishersState,
  updatePublisher
} from "../../state/publishers/publishers";

export default function PublisherEdit() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const parsedId = parseInt(id, 10);
  const [message, setMessage] = useState("");
  const { publishers } = useSelector(publishersState);
  const findIndexToEdit = useCallback(
    () => publishers.findIndex(item => item.id === parsedId),
    [publishers, parsedId]
  );
  const indexToEdit = findIndexToEdit(parsedId);
  const [publisher, setPublisher] = useState({
    ...publishers[indexToEdit],
    year: publishers[indexToEdit]?.establishmentYear
  });
  function submitFn({ name, year }, clearForm) {
    setMessage("Sprawdzam dane");
    const parsedYear = parseInt(year, 10);
    if (
      (name === publisher.name && parsedYear === publisher.year) ||
      (!name && !year)
    ) {
      setMessage("Nic nie zmieniono!");
      return clearForm();
    }
    const actualYear = new Date().getFullYear();
    if (parsedYear > actualYear) {
      return setMessage(
        `Nie można wstawiać wydawnictw z przyszłości, mamy ${actualYear} r.`
      );
    }
    if (parsedYear <= 0) {
      return setMessage(`Minimalny rok założenia wydawnictwa to 1 r.`);
    }
    setMessage("Edytuje wydawnictwo");
    apiHelperPublisher(
      "editPublisher",
      {
        name: name || publisher.name,
        year: parsedYear || publisher.year,
        id: publishers[indexToEdit].id
      },
      "Nie udało się zedytować wydawnictwa"
    ).then(res => {
      if (res.message) {
        return setMessage(res.message);
      }
      setMessage("Poprawnie zakutalizowano.");
      clearForm();
      dispatch(updatePublisher(res));
      return setPublisher({
        ...publisher,
        ...res
      });
    });
  }

  return (
    <Layout
      title="Edytuj wydawnictwo"
      message={message}
      pathToBack="/publishers"
      setMessage={setMessage}
    >
      <Info>
        {indexToEdit === -1 ||
        !publisher.year ||
        !publisher.name ||
        !publisher.year ? (
          "Nie znaleziono takiego wydawnictwa"
        ) : (
          <>
            {publisher.name} <br /> Rok założenia: {publisher.year} r.
          </>
        )}
      </Info>
      {indexToEdit === -1 ||
      !publisher.year ||
      !publisher.name ||
      !publisher.year ? (
        ""
      ) : (
        <Form
          submitFn={submitFn}
          inputs={[
            {
              title: "Nazwa",
              name: "name",
              type: "text",
              isRequired: false,
              d: publisher.name
            },
            {
              title: "Rok założenia",
              name: "year",
              type: "number",
              isRequired: false,
              d: publisher.year
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
