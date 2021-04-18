import { useState } from "react";
import { useDispatch } from "react-redux";

import apiHelperPublishers from "../../apiHelper/publishersAPI";
import Form from "../../components/Form/Form";
import Layout from "../../components/LayoutWrapper/Layout";
import { addNewPublisher } from "../../state/publishers/publishers";

export default function PublishersAdd() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  function submit({ name, year }, clearForm) {
    if (!name || !year) {
      return setMessage("Wypełnij brakujące dane.");
    }
    setMessage("Sprawdzam dane");
    const parsedYear = parseInt(year, 10);
    const actualYear = new Date().getFullYear();
    if (parsedYear > actualYear) {
      return setMessage(
        `Nie można wstawiać wydawnictw z przyszłości, mamy ${actualYear} r.`
      );
    }
    if (parsedYear <= 0) {
      return setMessage(`Minimalny rok założenia wydawnictwa to 1 r.`);
    }

    apiHelperPublishers(
      "addPublisher",
      { name, establishmentYear: year },
      "Nie udało się dodać wydawnictwa"
    ).then(res => {
      if (res.message) {
        return setMessage(res.message);
      }
      setMessage("Poprawnie dodano nowe wydawnictwo: " + res.name);
      clearForm();
      return dispatch(addNewPublisher(res));
    });
  }
  return (
    <Layout
      title="Dodawanie wydawnictwa"
      pathToBack="/publishers"
      message={message}
    >
      <Form
        submitFn={submit}
        inputs={[
          {
            title: "Nazwa",
            name: "name",
            type: "text",
            isRequired: true,
            d: ""
          },
          {
            title: "Rok założenia",
            name: "year",
            type: "number",
            isRequired: true,
            d: ""
          }
        ]}
      />
    </Layout>
  );
}
